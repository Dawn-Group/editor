import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import { EigenModal, EigenDropDown } from "../lib";

console.log(EigenDropDown, "e", EigenModal)

const root = document.getElementById("root");

console.log(EigenModal, "ksks")
class Demo extends Component {
    state = {
        editorState: EditorState.createEmpty()
    }

    onChange(editorState: EditorState) {
        console.log(editorState, "onChange")
        this.setState({
            editorState,
            visible: true
        })
    }

    render() {
        const { editorState, visible } = this.state;
        return (
            <Fragment>
                {/* <BoldBtton editorState={editorState}  onChange={this.onChange.bind(this)}>Blod</BoldBtton> */}
                <Editor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                />
            </Fragment>
        )
    }
}

ReactDOM.render(<Demo />, root);