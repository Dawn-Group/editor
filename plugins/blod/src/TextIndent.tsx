import React, { Component, Fragment} from 'react';
import { increaseSelectionIndent, decreaseSelectionIndent } from "./utils";

import  IPluginProps  from "./IPluginProps";
export default class TextIndent extends Component<IPluginProps> {

    state = {
        currentIndent: 0
    }

/*     componentWillReceiveProps(nextProps) {
        this.setState({
            currentIndent: ContentUtils.getSelectionBlockData(nextProps.editorState, 'textIndent') || 0
        })
    } */

    increaseIndent() {
        
        const newEditorState = increaseSelectionIndent(this.props.editorState);
        newEditorState && this.props.onChange && this.props.onChange(newEditorState);
        console.log("increase Indent", newEditorState)
       // this.props.editor.setValue(ContentUtils.increaseSelectionIndent(this.props.editorState))
      //  this.props.editor.requestFocus()
    }

    decreaseIndent (){
        console.log("decrease Indent")
        const newEditorState = decreaseSelectionIndent(this.props.editorState);
        newEditorState && this.props.onChange && this.props.onChange(newEditorState);
       // this.props.editor.setValue(ContentUtils.decreaseSelectionIndent(this.props.editorState))
      //  this.props.editor.requestFocus()
    }

    render() {

        const { currentIndent } = this.state

        return (
            <Fragment>
                <button
                    key={0}
                    type='button'
                  //  disabled={currentIndent >= 6}
                    className={`control-item button button-indent-increase${currentIndent > 0 && currentIndent < 6 ? ' active' : ''}`}
                    onClick={this.increaseIndent.bind(this)}
                >缩进1
                    <i className={'bfi-indent-increase'}></i>
                </button>
                <button
                    key={1}
                    type='button'
                 //   disabled={currentIndent <= 0}
                    className="control-item button button-indent-decrease"
                    onClick={this.decreaseIndent.bind(this)}
                >缩进2
                    <i className={'bfi-indent-decrease'}></i>
                </button>
            </Fragment>
        )

    }

}