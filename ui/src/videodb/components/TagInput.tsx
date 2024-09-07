import React, { FC, ReactElement, useContext } from 'react';

import { useGetTags } from '../hooks/useVideoDbQueries';
import { VideoDbContext } from '../hooks/useVideoDbState';

import { MultiTagInput } from '../../common/components/forms';

type TagInputParams = {
    tags: string[];
    onSelectionChange?: (selectedKeys: string[]) => void;
    label: string;
    inline?: boolean;
    className?: string;
};

export const TagInput: FC<TagInputParams> = ({ tags, onSelectionChange, label, inline, className }): ReactElement => {
    const { state: { apiPath } } = useContext(VideoDbContext);
    const tagLookup = useGetTags(apiPath);

    return (
        <MultiTagInput
            selectableTags={tagLookup}
            tags={tags}
            onSelectionChange={onSelectionChange}
            label={label}
            inline={inline}
            className={className}
        />
    );
};
