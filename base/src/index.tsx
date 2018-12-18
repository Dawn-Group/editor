import React, { Component, Fragment, createRef } from "react";
import { 
    Editor, 
    EditorState
} from "draft-js";
import 'es6-shim';

import ToolBar from "./toobar";

interface BaseEditorProps {
    props?: object,
    editorState: EditorState,
    onChange?: (editorState: EditorState) => void,
    readOnly?: boolean,
    plugins?:[{tool?: any, label?: string}],
    defaultKeyBindings?: boolean,
    defaultKeyCommands?: boolean,
    defaultBlockRenderMap?: boolean,
    customStyleMap?: object,
    decorators?:[]
}

interface BaseEditorState { 
    readOnly?: boolean,
}

export default class BaseEditor extends Component<BaseEditorProps, BaseEditorState> {
    constructor(props: BaseEditorProps) {
        super(props);
        this.editorRef = createRef();
    }

    editorRef: any;
    [propName: string]: any;


    render() {
        return (
            <Fragment>
                <ToolBar 
                    plugins={this.props.plugins}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange} />
                <Editor
                    {...this.props}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                    ref = {this.editorRef}
                />
            </Fragment>
        )
    }
}
