import { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { MarkdownTree } from '../../contracts/markdown';
import { useGetMarkdownTree } from '../hooks/useMarkdownQueries';
import { MarkdownStateContext } from '../hooks/useMarkdownStateContext';

import './MarkdownNav.scss';

export const MarkdownNav = () => {
    const { markdownState: { rootUiPath, rootApiPath } } = useContext(MarkdownStateContext);
    const markdownTree = useGetMarkdownTree(rootApiPath);

    const navContent = (
        <span className='markdown-nav'>
            {markdownTree?.children && <MarkdownNavRecurse rootUiPath={rootUiPath} treeChildren={markdownTree.children} />}
        </span>
    );

    return navContent;
};

type MarkdownNavRecurseProps = { treeChildren: MarkdownTree[], rootUiPath: string }
const MarkdownNavRecurse = ({ treeChildren, rootUiPath }: MarkdownNavRecurseProps) => {
    return (
        <ol>
            {treeChildren.map((child) => {
                const linkPrefix = rootUiPath ? `${rootUiPath}/` : '';
                const linkName = `/${linkPrefix}${child.uiPath}`.replace(/\/$/, '');
                return (
                    <Fragment key = {child.apiPath}>
                        <li><NavLink to={linkName} end>{child?.title}</NavLink></li>
                        {child.children && <MarkdownNavRecurse rootUiPath={rootUiPath} treeChildren={child.children} />}
                    </Fragment>
                );
            })}
        </ol>
    );
};
