import { Tag, TagGroup, TagList } from 'react-aria-components';

import './TagListInput.css';

type TagListInputProps = {
  allTags: Set<string>;
};

export const TagListInput = ({ allTags }: TagListInputProps) => {
  const allItemsArray = Array.from(allTags).map((tag) => ({ name: tag }));

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
