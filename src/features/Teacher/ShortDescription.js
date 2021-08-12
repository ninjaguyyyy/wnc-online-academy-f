import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorShort = ({getContent}) => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handleEditorChange = (state) => {
        setEditorState(state);
        sendContent();
    };

    const sendContent = () => {
        getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };
    return (
        <div>
            <Editor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-description"
                toolbarClassName="toolbar-class"
            />
        </div>
    );
};

export default EditorShort;