import { MultiTagInput } from '@/shared/components/forms';

import { useVideoDb } from '../hooks/useVideoDb';
import { useGetTags } from '../hooks/useVideoDbQueries';

type TagInputProps = {
  tags?: string[];
  onSelectionChange?: (selectedTags?: string[]) => void;
  label: string;
  inline?: boolean;
  className?: string;
  allowCreation?: boolean;
};

export const TagInput = ({
  tags,
  onSelectionChange,
  label,
  inline,
  className,
  allowCreation = true,
}: TagInputProps) => {
  const {
    state: { apiPath },
  } = useVideoDb();
  const tagLookup = useGetTags(apiPath);

  return (
    <MultiTagInput
      selectableTags={tagLookup}
      tags={tags}
      onSelectionChange={(selectedTags) => onSelectionChange?.(selectedTags)}
      label={label}
      inline={inline}
      className={className}
      allowCreation={allowCreation}
    />
  );
};
