import React, { Component, Fragment  } from "react";
import ReactDOM from "react-dom";
import BaseEditor from "../src";
import { EditorState } from "draft-js";
//import  linkify  from "eigin-editor-linkify-plguin";
//linkify();
import BoldButton from "eigen-editor-bold-plugin";

console.log(BoldButton, "blod");
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

    // handleKeyCommand(command, editorState){
    //     const newState = RichUtils.handleKeyCommand(editorState, command);
    //     if(newState){
    //         this.onChange(newState);
    //         return 'handled';
    //     }else {
    //         return 'not-handled';
    //     }
    // }

    // blodClick(editorState){
    //     this.onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
    //     console.log(editorState, "bloadClick")
    // }

    render(){
        const { editorState } = this.state;
        return (
            <Fragment>
                {/* <BoldButton editorState={editorState} onChange={this.onChange.bind(this)}>Blod</BoldButton> */}
                <BaseEditor
                    editorState={editorState}
                    onChange={this.onChange.bind(this)}
                    // handleKeyCommand={this.handleKeyCommand.bind(this)}
                    // defaultBlockRenderMap={true}
                    plugins={[BoldButton]}
                />
            </Fragment>
        )    
    }
}

ReactDOM.render( <Demo/>, root);