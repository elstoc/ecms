import { useContext } from 'react';

import { useGetTags } from '../hooks/useVideoDbQueries';
import { VideoDbStateContext } from '../hooks/useVideoDbStateContext';

import { MultiTagInput } from '@/shared/components/forms';

type TagInputProps = {
  tags: string | null;
  onSelectionChange?: (selectedTags: string) => void;
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
    videoDbState: { apiPath },
  } = useContext(VideoDbStateContext);
  const tagsArray = tags ? tags.split('|') : [];
  const tagLookup = useGetTags(apiPath);

  return (
    <MultiTagInput
      selectableTags={tagLookup}
      tags={tagsArray}
      onSelectionChange={(selectedTags) => onSelectionChange?.(selectedTags.join('|'))}
      label={label}
      inline={inline}
      className={className}
      allowCreation={allowCreation}
    />
  );
};
