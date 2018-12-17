# `eigen-editor-bold-plugin`

> 加粗编辑器中选中的文本

## Usage

```js
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import BoldButton from "eigen-editor-bold-plugin";

const root = document.getElementById("root");

class Demo extends Component {
    state = {
        editorState: EditorState.createEmpty()
    }

    onChange(editorState: EditorState) {
        this.setState({
            editorState
        })
    }

    render() {
        const { editorState } = this.state;
        return (
            <Fragment>
                <BoldBtton editorState={editorState}  
                    onChange={this.onChange.bind(this)}>Blod</BoldBtton>
                <Editor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                />
            </Fragment>
        )
    }
}

ReactDOM.render(<Demo />, root);

```
