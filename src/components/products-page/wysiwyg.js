import { Fragment, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import cn from "classnames";
const WysiwygEditor = ({ html = "", onChange = () => {}, error = "" }) => {
  const [state, setState] = useState(
    html
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(convertFromHTML(html))
        )
      : EditorState.createEmpty()
  );

  const onEditorChanged = (store) => {
    onChange(stateToHTML(store.getCurrentContent()));
    setState(store);
  };

  return (
    <Fragment>
      <div
        className={cn("border", !!error ? "border-danger" : "border-gray")}
        dir="ltr"
      >
        <Editor editorState={state} onEditorStateChange={onEditorChanged} />
      </div>
      {error && <div className="text-sm text-danger mt-1">{error}</div>}
    </Fragment>
  );
};

export default WysiwygEditor;
