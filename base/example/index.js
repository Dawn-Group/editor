import React, { Component, Fragment  } from "react";
import ReactDOM from "react-dom";
import BaseEditor from "@src";
import { EditorState, RichUtils } from "draft-js";
import  linkify  from "engin-editor-linkify-plguin";
linkify();

const root = document.getElementById("root");

class Demo extends Component {
    state = {
        editorState: EditorState.createEmpty()
    }

    onChange(editorState){
        console.log(editorState, "onChange")
        this.setState({
            editorState
        })
    }

    handleKeyCommand(command, editorState){
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if(newState){
            this.onChange(newState);
            return 'handled';
        }else {
            return 'not-handled';
        }
    }

    blodClick(editorState){
        this.onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
        console.log(editorState, "bloadClick")
    }

    render(){
        const { editorState } = this.state;
        return (
            <Fragment>
                <button onClick={this.blodClick.bind(this, editorState)}>加粗</button>
                <BaseEditor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                    handleKeyCommand={this.handleKeyCommand.bind(this)}
                    defaultBlockRenderMap={true}
                    plugins={[]}
                />
            </Fragment>
        )    
    }
}

ReactDOM.render( <Demo/>, root);