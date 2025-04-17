import { MultiTagInput } from '@/shared/components/forms';

import { useGetTags } from '../hooks/useVideoDbQueries';

type VideoTagInputProps = {
  selectedTags?: string[];
  onChange?: (selectedTags?: string[]) => void;
  label: string;
  className?: string;
  allowCreation?: boolean;
};

export const VideoTagInput = ({
  selectedTags,
  onChange,
  label,
  className,
  allowCreation = true,
}: VideoTagInputProps) => {
  const tagLookup = useGetTags();

  return (
    <MultiTagInput
      selectableTags={tagLookup}
      selectedTags={selectedTags}
      onChange={(selectedTags) => onChange?.(selectedTags)}
      label={label}
      className={className}
      allowCreation={allowCreation}
    />
  );
};
