import React, { Component  } from "react";
import ReactDOM from "react-dom";
import BaseEditor from "@src";
import { EditorState } from "draft-js";

const root = document.getElementById("root");

class Demo extends Component {
    state = {
        editorState: EditorState.createEmpty()
    }

    onChange(editorState){
        this.setState({
            editorState
        })
    }

    render(){
        const { editorState } = this.state;
        return <BaseEditor
            editorState={editorState}
            onChange={this.onChange.bind(this)}
            defaultBlockRenderMap={true}
            plugins={[]}
             />
    }
}

ReactDOM.render( <Demo/>, root);