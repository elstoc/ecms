import { ReactElement, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { defListHastHandlers, remarkDefinitionList } from 'remark-definition-list';
import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import smartypants from 'remark-smartypants';

import './RenderMd.scss';
import './RenderMdCode.scss';

export type RenderMdProps = {
  markdown: string;
  pageTitle: string;
  renderLink: (href: string, children: ReactNode & ReactNode[]) => ReactElement;
};

export const RenderMd = ({ pageTitle, markdown, renderLink }: RenderMdProps) => {
  return (
    <div className='rendered-md'>
      {pageTitle && <h1 className='title'>{pageTitle}</h1>}
      <ReactMarkdown
        components={{
          a(props) {
            // eslint-disable-next-line react/prop-types
            const { href = '', children } = props;
            return renderLink(href, children);
          },
        }}
        remarkPlugins={[
          [remarkGfm, { singleTilde: false }],
          remarkDefinitionList,
          [emoji, { emoticon: false }],
          [smartypants],
        ]}
        rehypePlugins={[rehypeHighlight]}
        remarkRehypeOptions={{ handlers: { ...defListHastHandlers } }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};
