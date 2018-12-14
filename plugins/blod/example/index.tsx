import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import BoldBtton from "../lib";

console.log(BoldBtton, "blod");

const root = document.getElementById("root");

class Demo extends Component {
    state = {
        editorState: EditorState.createEmpty()
    }

    onChange(editorState: EditorState) {
        console.log(editorState, "onChange")
        this.setState({
            editorState
        })
    }

    // handleKeyCommand(command, editorState) {
    //     const newState = RichUtils.handleKeyCommand(editorState, command);
    //     if (newState) {
    //         this.onChange(newState);
    //         return 'handled';
    //     } else {
    //         return 'not-handled';
    //     }
    // }

    // blodClick(editorState) {
    //     this.onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    //     console.log(editorState, "bloadClick")
    // }

    render() {
        const { editorState } = this.state;
        return (
            <Fragment>
                <BoldBtton editorState={editorState} onChange={this.onChange.bind(this)}>Blod</BoldBtton>
                {/* <button onClick={this.blodClick.bind(this, editorState)}>加粗</button> */}
                <Editor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                   // handleKeyCommand={this.handleKeyCommand.bind(this)}
                   // defaultBlockRenderMap={true}
                   // plugins={[]}
                />
            </Fragment>
        )
    }
}

ReactDOM.render(<Demo />, root);