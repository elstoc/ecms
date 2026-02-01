import { Tag, TagGroup, TagList } from 'react-aria-components';

import { IconButton } from '../icon-button';

import './TagListInput.css';

type TagListInputProps = {
  selectedTags: Set<string>;
  onRemoveTag?: (tag: string) => void;
};

export const TagListInput = ({ selectedTags, onRemoveTag }: TagListInputProps) => {
  const allItemsArray = Array.from(selectedTags).map((tag) => ({ name: tag }));

  return (
    <div className='ecms-tag-list-input'>
      <TagGroup
        onRemove={(keys) => Array.from(keys).forEach((key) => onRemoveTag?.(key.toString()))}
      >
        <TagList className='ecms-tag-list' items={allItemsArray}>
          {(item) => (
            <Tag className='ecms-tag' id={item.name}>
              {item.name}
              {onRemoveTag && (
                <IconButton icon='close' className='remove-tag' slot='remove' label='remove' />
              )}
            </Tag>
          )}
        </TagList>
      </TagGroup>
    </div>
  );
};
