import React, { Component } from "react";
import { EditorState, RichUtils } from "draft-js";

interface BlodButtonProps {
    editorState: EditorState,
    onChange?: (editorState: EditorState) => void
}

class BoldButton extends Component<BlodButtonProps> {
    constructor(props: BlodButtonProps){
        super(props);
    }

    onClick(editorState: EditorState){
        editorState && this.props.onChange && this.props.onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
        console.log(editorState, "bloadClick")
    }

    render(){
        const { children, editorState } = this.props;
        return (
            <button onClick={this.onClick.bind(this, editorState)}>{children}</button>
        )
    }
}

export default BoldButton