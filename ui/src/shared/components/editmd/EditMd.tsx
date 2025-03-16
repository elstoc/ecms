import CodeMirror from '@uiw/react-codemirror';
import { markdown as codeMirrorMarkdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';

import './EditMd.scss';

type EditMdProps = {
    markdown: string;
    setMarkdown: (value: string) => void;
}

export const EditMd = ({ markdown, setMarkdown }: EditMdProps) => {
    return (
        <div className='edit-markdown'>
            <CodeMirror
                height='100%'
                autoFocus={true}
                value={markdown}
                onChange={(value: string) => setMarkdown(value)}
                basicSetup={{ lineNumbers: true, highlightActiveLine: true, foldGutter: false}}
                extensions={[codeMirrorMarkdown({ base: markdownLanguage, codeLanguages: languages }), EditorView.lineWrapping]}
            />
        </div>
    );
};
