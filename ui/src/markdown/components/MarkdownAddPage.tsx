import { Dialog, DialogBody } from '@blueprintjs/core';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from '@/shared/components/button';
import { Card } from '@/shared/components/card';
import { Input } from '@/shared/components/forms';

import { getMarkdownPage } from '../api';
import { useMarkdown } from '../hooks/useMarkdown';
import { useCreateMarkdownPage } from '../hooks/useMarkdownQueries';

import './MarkdownAddPage.scss';

export const MarkdownAddPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode');

  return (
    <Dialog
      title='Add new child page'
      isOpen={mode === 'add'}
      onClose={() => setSearchParams()}
      canEscapeKeyClose={false}
    >
      <DialogBody>{mode === 'add' && <MarkdownAddPageContent />}</DialogBody>
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
    <div className='markdown-add-page'>
      <Card className='add-page-form'>
        <Input
          label='Path'
          value={newPagePath}
          onChange={(path) =>
            setNewPagePath(path?.replace(/[^a-z0-9\-_]/gi, '').toLowerCase() ?? '')
          }
          onPressEnter={createPage}
          autoFocus={true}
          inline={true}
        />
        <Button onClick={createPage}>Create Page</Button>
      </Card>
      <div className='error'>{errorText}</div>
    </div>
  );
};
