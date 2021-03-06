import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import BoldBtton, { TextIndent} from "../src";

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
                <BoldBtton editorState={editorState}  onChange={this.onChange.bind(this)}>Blod</BoldBtton>
                <TextIndent editorState={editorState} onChange={this.onChange.bind(this)}>sdd</TextIndent>
                <Editor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                />
            </Fragment>
        )
    }
}

ReactDOM.render(<Demo />, root);