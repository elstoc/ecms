import { TagSelect } from '@/shared/components/tag-select';

import { useGetTags } from '../hooks/useVideoDbQueries';

type VideoTagInputProps = {
  selectedTags?: string[];
  onChange?: (selectedTags?: string[]) => void;
  label: string;
  className?: string;
  allowCreation?: boolean;
  disabled?: boolean;
};

export const VideoTagInputBUI = (props: VideoTagInputProps) => {
  const tagLookup = useGetTags();

  return (
    <TagSelect
      label={props.label}
      selectableTags={tagLookup}
      selectedTags={props.selectedTags ?? []}
      onChange={(selectedTags) => props.onChange?.(selectedTags)}
      emptyMessage='No tags found'
      disabled={props.disabled}
    />
  );
};
