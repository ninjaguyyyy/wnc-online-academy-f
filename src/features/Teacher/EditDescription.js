import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const EditorDescription = ({ getContent, data }) => {
  const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(data))));

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

export default EditorDescription;
