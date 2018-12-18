import { EditorState } from "draft-js";
export default interface IPluginProps {
    editorState: EditorState,
    onChange?: (editorState: EditorState) => void
}