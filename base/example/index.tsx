import React, { Component, Fragment  } from "react";
import ReactDOM from "react-dom";
import BaseEditor from "../src";
import { EditorState } from "draft-js";
import BoldButton from "eigen-editor-bold-plugin";
const root = document.getElementById("root");

class Demo extends Component {
    constructor(props){
        super(props)
        this.state = {
            editorState: EditorState.createEmpty()
        }

    }

    onChange(editorState: EditorState){
        console.log(editorState, "onChange")
        this.setState({
            editorState
        })
    }


    render(){
        const { editorState } = this.state;
        return (
            <Fragment>
                {/* <BoldButton editorState={editorState} onChange={this.onChange.bind(this)}>Blod</BoldButton> */}
                <BaseEditor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                    plugins={[{tool: BoldButton, label: '加粗'}]}
                />
            </Fragment>
        )    
    }
}

ReactDOM.render( <Demo/>, root);