import { EditorState, Editor } from "draft-js";
import { setBlockData } from 'draftjs-utils';

export const getSelectionBlock = (editorState: EditorState) => {
    return editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getAnchorKey())
}

export const increaseSelectionIndent = (editorState: EditorState, maxIndent = 6) => {
    const currentIndent = getSelectionBlockData(editorState, 'textIndent') || 0
    return toggleSelectionIndent(editorState, currentIndent + 1, maxIndent)
}

export const decreaseSelectionIndent = (editorState: EditorState) => {
    const currentIndent = getSelectionBlockData(editorState, 'textIndent') || 0
    return toggleSelectionIndent(editorState, currentIndent - 1)
}


export const getSelectionBlockData = (editorState: EditorState, name?: string) => {
    const blockData = getSelectionBlock(editorState).getData()
    return name ? blockData.get(name) : blockData
}

export const toggleSelectionIndent = (editorState: EditorState, textIndent: number, maxIndent = 6) => {
    return textIndent < 0 || textIndent > maxIndent || isNaN(textIndent) ? editorState : setSelectionBlockData(editorState, {
        textIndent: textIndent || undefined
    })
}

export const setSelectionBlockData = (editorState: EditorState, blockData: any, override?: boolean) => {

    let newBlockData = override ? blockData : Object.assign({}, getSelectionBlockData(editorState).toJS(), blockData)

    Object.keys(newBlockData).forEach(key => {
        if (newBlockData.hasOwnProperty(key) && newBlockData[key] === undefined) {
            delete newBlockData[key]
        }
    })

    return setBlockData(editorState, newBlockData)
}
