import './style.scss'
import React, { Component, Fragment } from 'react'
import { ContentUtils } from 'braft-utils'

export default class LinkPlugin extends Component {

  constructor (props) {
    super(props)
    this.state = {
      visible: false,
      href: '',
      target: props.defaultLinkTarget || ''
    }
  }

  dropDownInstance = null

  componentWillReceiveProps (nextProps) {
    const { href, target } = ContentUtils.getSelectionEntityData(nextProps.editorState, 'LINK')
    this.setState({
      href: href || '',
      target: typeof target === 'undefined' ? (nextProps.defaultLinkTarget || '') : (target || '')
    })

  }

  addLink(){
    this.setState({
      visible: !this.state.visible
    })
  }

  handleCancel(){
    this.setState({
      visible: false
    })
  }

  inputLink(e) {
    this.setState({
      href: e.currentTarget.value
    })
  }

  render () {
    const { href, target, visible } = this.state
    console.log(href, "href");
    const textSelected = !ContentUtils.isSelectionCollapsed(this.props.editorState) && ContentUtils.getSelectionBlockType(this.props.editorState) !== 'atomic'

    return (
      <Fragment>
        {
          visible && <div className="eigen-modal">
            <input type="text" 
              onKeyDown={this.handeKeyDown.bind(this)}
              onChange={this.inputLink.bind(this)}/>
              <div>
                <button onClick={this.handleConfirm.bind(this)}>确定</button>
                <button onClick={this.handleCancel.bind(this)}>取消</button>
              </div>
          </div>
        }
        <button onClick={this.addLink.bind(this)}>Link</button>
      </Fragment>
    )

  }

  handeKeyDown(e){
    if (e.keyCode === 13) {
      this.handleConfirm()
      e.preventDefault()
      return false
    }
  }


  handleUnlink(){
    const newEditorState = ContentUtils.toggleSelectionLink(this.props.editorState, false);
    newEditorState && this.props.onChange && this.props.onChange(newEditorState);
  }

  handleConfirm(){
    let { href, target } = this.state
    const newEditorState = ContentUtils.toggleSelectionLink(this.props.editorState, href, target)
    newEditorState && this.props.onChange && this.props.onChange(newEditorState);
    console.log(newEditorState, "new state")
  }
}