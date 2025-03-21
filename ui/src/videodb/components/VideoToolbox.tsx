import { useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { downloadVideoCSV } from '../utils/downloadVideoCSV';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';
import { useGetUserIsAdmin } from '@/auth/hooks/useAuthQueries';
import { useIsDualPanel } from '@/shared/hooks';

import { Icon } from '@/shared/components/icon';

export const VideoToolbox = () => {
  const userIsAdmin = useGetUserIsAdmin();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    videoDbState: { apiPath },
  } = useContext(VideoDbStateContext);
  const isDualPanel = useIsDualPanel();

  const downloadCSV = useCallback(async () => {
    await downloadVideoCSV(apiPath);
  }, [apiPath]);

  if (!userIsAdmin && isDualPanel) {
    return <></>;
  }

  return (
    <>
      <Icon
        name='add'
        disabled={!userIsAdmin}
        onClick={() => navigate(`./add?${searchParams.toString()}`)}
      />
      <Icon name='download' disabled={!userIsAdmin} onClick={downloadCSV} />
    </>
  );
};
