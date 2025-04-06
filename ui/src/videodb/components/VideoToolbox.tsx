import { useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { Icon } from '@/shared/components/icon';
import { Toolbox } from '@/shared/components/layout';

import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';
import { downloadVideoCSV } from '../utils/downloadVideoCSV';

import './VideoToolbox.scss';

export const VideoToolbox = () => {
  const userIsAdmin = useGetUserIsAdmin();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    videoDbState: { apiPath, sortOrder },
    videoDbReducer,
  } = useContext(VideoDbStateContext);

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
            videoDbReducer({
              action: 'setSortOrder',
              value: 'asc',
            })
          }
        />
        <Icon
          name='shuffle'
          color={sortOrder === 'shuffle' ? 'black' : 'grey'}
          onClick={() =>
            videoDbReducer({
              action: 'setSortOrder',
              value: 'shuffle',
            })
          }
        />
      </Toolbox>
    </div>
  );
};
