import { Tag, TagGroup, TagList } from 'react-aria-components';

import './TagListInput.css';

type TagListInputProps = {
  selectedTags: Set<string>;
  onRemoveTag: (tag: string) => void;
};

export const TagListInput = ({ selectedTags }: TagListInputProps) => {
  const allItemsArray = Array.from(selectedTags).map((tag) => ({ name: tag }));

  return (
    <div className='ecms-tag-list-input'>
      <TagGroup>
        <TagList className='ecms-tag-list' items={allItemsArray}>
          {(item) => (
            <Tag className='ecms-tag' id={item.name}>
              {item.name}
            </Tag>
          )}
        </TagList>
      </TagGroup>
    </div>
  );
};
