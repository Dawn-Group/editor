import React, { Component, Fragment } from "react";
import { Editor, EditorState, RichUtils, removeEditorStyles } from "draft-js";
import 'es6-shim';
import { Map } from "immutable";

const blockRenderMap = Map({
    /* 'header-two': {
        element: 'h2'
    }, */
    'unstyled': {
        element: 'h2'
    },
    'section': {
        element: 'section'
    }
})

export default class BaseEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    editorChange(editorState) {
        console.log(editorState, "state")
        this.setState({ editorState })
    }

    handleKeyCommand(command, editorState) {
        console.log(command, editorState, "command")
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.editorChange(newState);
            return "handled";
        } else {
            return "not handled";
        }
    }
    // 加粗
    boldClick() {
        const newState = RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD');
        this.editorChange(newState);
    }
    // 粘贴
    handlePastedText(text, styles, editorState) {
        console.log(text, styles, editorState, "paste")
        this.setState({
            editorState: removeEditorStyles(text, editorState)
        })
    }

    render() {
        const { editorState } = this.state
        return (
            <Fragment>
                <button onClick={this.boldClick.bind(this)}>Blod</button>
                <Editor
                    editorState={editorState}
                    blockRenderMap={blockRenderMap}
                    stripPastedStyles={true}
                    spellCheck={false}
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
                    handlePastedText={this.handlePastedText.bind(this)}
                    onChange={this.editorChange.bind(this)} />
            </Fragment>

        )
    }

}
