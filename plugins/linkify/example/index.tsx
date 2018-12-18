import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import LinkPlugin from "../src/index";

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

    render() {
        const { editorState } = this.state;
        return (
            <Fragment>
                <LinkPlugin link="link title" unlink="unlink" inputPlaceHolder="placeholder" editorState={editorState} onChange={this.onChange.bind(this)}>链接</LinkPlugin>
                <Editor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                />
            </Fragment>
        )
    }
}

ReactDOM.render(<Demo />, root);