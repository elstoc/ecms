import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { Icon } from '@/shared/components/icon';
import { Toolbox } from '@/shared/components/layout';

import { useVideoDb } from '../hooks/useVideoDb';
import { downloadVideoCSV } from '../utils/downloadVideoCSV';

import './VideoToolbox.scss';

export const VideoToolbox = () => {
  const userIsAdmin = useUserIsAdmin();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    state: { apiPath, sortOrder },
    dispatch,
  } = useVideoDb();

  const downloadCSV = useCallback(async () => {
    await downloadVideoCSV(apiPath);
  }, [apiPath]);

  return (
    <div className='video-toolbox'>
      <Toolbox>
        {userIsAdmin && (
          <>
            <Icon
              name='add'
              disabled={!userIsAdmin}
              onClick={() => navigate(`./add?${searchParams.toString()}`)}
            />
            <Icon
              className='download-icon'
              name='download'
              disabled={!userIsAdmin}
              onClick={downloadCSV}
            />
          </>
        )}
        <Icon
          name='sortAscAlpha'
          color={sortOrder === 'asc' ? 'black' : 'grey'}
          onClick={() =>
            dispatch({
              type: 'setSortOrder',
              payload: 'asc',
            })
          }
        />
        <Icon
          name='shuffle'
          color={sortOrder === 'shuffle' ? 'black' : 'grey'}
          onClick={() =>
            dispatch({
              type: 'setSortOrder',
              payload: 'shuffle',
            })
          }
        />
      </Toolbox>
    </div>
  );
};
