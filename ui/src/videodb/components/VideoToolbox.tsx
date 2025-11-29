import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { IconButton } from '@/shared/components/icon-button';
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
          <IconButton label='add video' icon='add' onPress={() => navigate('./add')} />
          <IconButton
            label='download videos as CSV'
            className='download-icon'
            icon='download'
            onPress={downloadCSV}
          />
        </>
      )}
      <IconButton
        label='sort ascending'
        icon='sortAscAlpha'
        color={sortOrder === 'asc' ? 'black' : 'grey'}
        onPress={() =>
          dispatch({
            type: 'setSortOrder',
            payload: 'asc',
          })
        }
      />
      <IconButton
        icon='shuffle'
        label='shuffle'
        color={sortOrder === 'shuffle' ? 'black' : 'grey'}
        onPress={() =>
          dispatch({
            type: 'setSortOrder',
            payload: 'shuffle',
          })
        }
      />
    </Toolbox>
  );
};
