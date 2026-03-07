import { MarkdownTree } from '@/contracts/markdown';
import { useCustomQuery, useMutationWithToast } from '@/shared/hooks';

import {
  MarkdownPage,
  deleteMarkdownPage,
  getMarkdownPage,
  getMarkdownTree,
  putMarkdownPage,
} from '../api';

const emptyMarkdownPage: MarkdownPage = {
  content: '',
  pageExists: false,
  canWrite: false,
  canDelete: false,
  pathValid: true,
};

export const useGetMarkdownPage = (path: string) => {
  const page = useCustomQuery({
    queryKey: ['markdownPage', path],
    queryFn: () => getMarkdownPage(path),
  });

  return page ?? emptyMarkdownPage;
};

const emptyMarkdownTree: MarkdownTree = {
  apiPath: '',
  uiPath: '',
};

export const useGetMarkdownTree = (path: string) => {
  const tree = useCustomQuery({
    queryKey: ['markdownTree', path],
    queryFn: () => getMarkdownTree(path),
  });

  return tree ?? emptyMarkdownTree;
};

export const useCreateMarkdownPage = (successMessage: string) => {
  return useMutationWithToast<{ path: string; pageContent: string }>({
    mutationFn: ({ path, pageContent }) => putMarkdownPage(path, pageContent),
    invalidateKeys: [['markdownTree']],
    successMessage,
  });
};

export const useUpdateMarkdownPage = (path: string, successMessage: string) => {
  return useMutationWithToast<string>({
    mutationFn: (pageContent) => putMarkdownPage(path, pageContent),
    invalidateKeys: [['markdownTree'], ['markdownPage', path]],
    successMessage,
  });
};

export const useDeleteMarkdownPage = (path: string, successMessage: string) => {
  return useMutationWithToast<void>({
    mutationFn: () => deleteMarkdownPage(path),
    invalidateKeys: [['markdownTree'], ['markdownPage', path]],
    successMessage,
  });
};
