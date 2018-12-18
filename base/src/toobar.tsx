import React, { Component } from "react";
import { EditorState } from "draft-js";

interface ToobBarProps {
    plugins: [{
        tool?: any,
        label?: string
    }],
    editorState: EditorState,
    onChange: (editorState: EditorState) => void
}

export default class ToobBar extends Component<ToobBarProps> {
    render(){
        return (
            <div>
                {
                    this.props.plugins.map((t, index:number) => {
                        let Tool = t.tool
                        return (
                            <Tool key={index}
                                editorState={this.props.editorState}
                                onChange={this.props.onChange}>
                                {t.label}
                            </Tool>
                        )
                    })
                } 
            </div>
        )
    }
}