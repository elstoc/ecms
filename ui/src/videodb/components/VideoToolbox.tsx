import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { Icon } from '@/shared/components/icon';
import { Toolbox } from '@/shared/components/layout';

import { useVideoDb } from '../hooks/useVideoDb';
import { downloadVideoCSV } from '../utils/downloadVideoCSV';

import './VideoToolbox.css';

export const VideoToolbox = () => {
  const userIsAdmin = useUserIsAdmin();
  const navigate = useNavigate();
  const {
    state: { apiPath, sortOrder },
    dispatch,
  } = useVideoDb();

  const downloadCSV = useCallback(async () => {
    await downloadVideoCSV(apiPath);
  }, [apiPath]);

  return (
    <Toolbox>
      {userIsAdmin && (
        <>
          <Icon label='add video' name='add' onClick={() => navigate('./add')} />
          <Icon
            label='download videos as CSV'
            className='download-icon'
            name='download'
            onClick={downloadCSV}
          />
        </>
      )}
      <Icon
        label='sort ascending'
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
        label='shuffle'
        color={sortOrder === 'shuffle' ? 'black' : 'grey'}
        onClick={() =>
          dispatch({
            type: 'setSortOrder',
            payload: 'shuffle',
          })
        }
      />
    </Toolbox>
  );
};
