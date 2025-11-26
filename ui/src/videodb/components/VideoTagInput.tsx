import { MultiTagInput } from '@/shared/legacy-components/forms';

import { useGetTags } from '../hooks/useVideoDbQueries';

type VideoTagInputProps = {
  selectedTags?: string[];
  onChange?: (selectedTags?: string[]) => void;
  label: string;
  className?: string;
  allowCreation?: boolean;
  disabled?: boolean;
};

export const VideoTagInput = (props: VideoTagInputProps) => {
  const tagLookup = useGetTags();

  return <MultiTagInput selectableTags={tagLookup} {...props} />;
};
