import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { IconButton } from '@/shared/components/icon-button';
import { Separator } from '@/shared/components/toolbar';

import { useVideoDb } from '../hooks/useVideoDb';
import { downloadVideoCSV } from '../utils/downloadVideoCSV';

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
    <>
      {userIsAdmin && (
        <>
          <IconButton label='add video' icon='add' onClick={() => navigate('./add')} />
          <IconButton label='download videos as CSV' icon='download' onClick={downloadCSV} />
          <Separator />
        </>
      )}
      <IconButton
        label='sort ascending'
        icon='sortAscAlpha'
        color={sortOrder === 'asc' ? 'black' : 'grey'}
        onClick={() =>
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
        onClick={() =>
          dispatch({
            type: 'setSortOrder',
            payload: 'shuffle',
          })
        }
      />
    </>
  );
};
