import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@/shared/components/button';
import { Dialog } from '@/shared/components/dialog';
import { Input } from '@/shared/components/input';

import { getMarkdownPage } from '../api';
import { useMarkdown } from '../hooks/useMarkdown';
import { useCreateMarkdownPage } from '../hooks/useMarkdownQueries';

import * as styles from './MarkdownAddPage.module.css';

export const MarkdownAddPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <Dialog title='Add new child page' open={mode === 'add'} onOpenChange={() => setSearchParams()}>
      {mode === 'add' && <MarkdownAddPageContent />}
    </Dialog>
  );
};

const MarkdownAddPageContent = () => {
  const navigate = useNavigate();
  const {
    state: { pageApiPath },
  } = useMarkdown();
  const { mutate } = useCreateMarkdownPage('page created');

  const [errorText, setErrorText] = useState('');
  const [newPagePath, setNewPagePath] = useState('');

  const newPageFullPath = `${pageApiPath}/${newPagePath}`;

  const createPage = async () => {
    if (newPagePath === '') {
      setErrorText('Invalid path');
      return;
    }

    const possNewPage = await getMarkdownPage(newPageFullPath);
    if (possNewPage.pageExists) {
      setErrorText('Page already exists');
    } else if (!possNewPage.pathValid) {
      setErrorText('Invalid path');
    } else if (!possNewPage.canWrite) {
      setErrorText('You are not permitted to create a new page here');
    } else {
      mutate(
        { path: newPageFullPath, pageContent: possNewPage.content },
        { onSuccess: () => navigate(`./${newPagePath}?mode=edit`) },
      );
    }
  };

  return (
    <div>
      <div className={styles.Form}>
        <Input
          label='Path'
          value={newPagePath}
          onChange={(path) =>
            setNewPagePath(path?.replace(/[^a-z0-9\-_]/gi, '').toLowerCase() ?? '')
          }
          onPressEnter={createPage}
          autoFocus={true}
          width='full'
        />
        <Button onClick={createPage}>Create Page</Button>
      </div>
      {errorText && <div className={styles.Error}>{errorText}</div>}
    </div>
  );
};
