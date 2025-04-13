import { useCallback, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import YAML from 'yaml';

import { Icon } from '@/shared/components/icon';
import { Toolbox } from '@/shared/components/layout';
import { splitFrontMatter } from '@/utils';

import { MarkdownStateContext } from '../hooks/useMarkdown';
import { useDeleteMarkdownPage, useUpdateMarkdownPage } from '../hooks/useMarkdownQueries';

import './MarkdownToolbox.scss';

type MarkdownToolboxProps = { apiPath: string };

export const MarkdownToolbox = ({ apiPath }: MarkdownToolboxProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    state: { editedMarkdown, singlePage, currentPage },
  } = useContext(MarkdownStateContext);
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
      <Icon
        name={mode === 'edit' ? 'cancel' : 'edit'}
        disabled={!pageExists || !pathValid}
        onClick={toggleEditMode}
      />
      <Icon
        name='save'
        className='save-markdown'
        onClick={savePage}
        disabled={mode !== 'edit' || !canWrite || content === editedMarkdown}
      />
      <Icon
        name='add'
        disabled={singlePage || !canWrite || mode === 'edit'}
        onClick={() => setSearchParams({ mode: 'add' })}
      />
      <Icon
        name='delete'
        disabled={singlePage || !canDelete || mode === 'edit'}
        onClick={deletePage}
      />
    </Toolbox>
  );
};
