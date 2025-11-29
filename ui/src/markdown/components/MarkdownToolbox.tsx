import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import YAML from 'yaml';

import { IconButton } from '@/shared/components/icon-button';
import { Toolbox } from '@/shared/components/layout';
import { splitFrontMatter } from '@/utils';

import { useMarkdown } from '../hooks/useMarkdown';
import { useDeleteMarkdownPage, useUpdateMarkdownPage } from '../hooks/useMarkdownQueries';

import './MarkdownToolbox.css';

type MarkdownToolboxProps = { apiPath: string };

export const MarkdownToolbox = ({ apiPath }: MarkdownToolboxProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    state: { editedMarkdown, singlePage, currentPage },
  } = useMarkdown();
  const mode = searchParams.get('mode');
  const { mutate: saveMutate } = useUpdateMarkdownPage(apiPath, 'page saved');
  const { mutate: deleteMutate } = useDeleteMarkdownPage(apiPath, 'page deleted');

  const { content, canWrite, canDelete, pathValid, pageExists } = currentPage ?? {};

  const toggleEditMode = useCallback(() => {
    if (mode === 'edit') {
      if (
        editedMarkdown === content ||
        confirm('You have unsaved changes. Are you sure you wish to leave?')
      ) {
        setSearchParams();
      }
    } else {
      setSearchParams({ mode: 'edit' });
    }
  }, [editedMarkdown, content, mode, setSearchParams]);

  const savePage = async () => {
    try {
      try {
        const [yaml] = splitFrontMatter(editedMarkdown);
        YAML.parse(yaml);
      } catch {
        throw new Error('Unable to parse YAML front matter');
      }
      saveMutate(editedMarkdown, { onSuccess: () => setSearchParams() });
    } catch (error: unknown) {
      alert('error ' + error);
    }
  };

  const deletePage = () => {
    if (confirm('Are you sure you want to delete this page')) {
      deleteMutate(undefined, {
        onSuccess: () => {
          setSearchParams();
          navigate('..', { relative: 'path' });
        },
      });
    }
  };

  return (
    <Toolbox>
      <IconButton
        label={mode === 'edit' ? 'cancel page edit' : 'edit page'}
        icon={mode === 'edit' ? 'cancel' : 'edit'}
        isDisabled={!pageExists || !pathValid}
        onPress={toggleEditMode}
      />
      <IconButton
        icon='save'
        label='save page'
        className='save-markdown'
        onPress={savePage}
        isDisabled={mode !== 'edit' || !canWrite || content === editedMarkdown}
      />
      <IconButton
        icon='add'
        label='add page'
        isDisabled={singlePage || !canWrite || mode === 'edit'}
        onPress={() => setSearchParams({ mode: 'add' })}
      />
      <IconButton
        icon='delete'
        label='delete page'
        isDisabled={singlePage || !canDelete || mode === 'edit'}
        onPress={deletePage}
      />
    </Toolbox>
  );
};
