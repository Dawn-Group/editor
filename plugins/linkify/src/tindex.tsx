import React, { Component, Fragment } from "react";
import { EditorState, CompositeDecorator, RichUtils } from "draft-js";

interface LinkButtonProps {
    editorState: EditorState,
    onChange?: (editorState: EditorState) => void
}

class LinkButton extends Component<LinkButtonProps> {
    constructor(props: LinkButtonProps) {
        super(props);
        const decorator = new CompositeDecorator([{
            strategy: findLinkEntities,
            component: Link
        }]);
    }

    onClick(editorState: EditorState) {
        const selection = editorState.getSelection();
        if(!selection.isCollapsed()){
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBegining = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBegining.getEntityAt(startOffset);
            let url = '';
            if(linkKey){
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }
            const contentStateWithEntity = contentState.createEntity(
                'LINK',
                'MUTABLE',
                { url: url}
            );
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity});
            const fillyEditorState = RichUtils.toggleLink(
                newEditorState,
                newEditorState.getSelection(),
                entityKey
            )
            fillyEditorState && this.props.onChange && this.props.onChange(fillyEditorState);
        }
       // editorState && this.props.onChange && this.props.onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
        console.log(editorState, "LinkClick")
    }

    render() {
        const { children, editorState } = this.props;
        return (
            <button onClick= { this.onClick.bind(this, editorState) } > { children } </button>
        )
    }
}

const styles = {
    root: {
        fontFamily: '\'Georgia\', serif',
        padding: 20,
        width: 600,
    },
    buttons: {
        marginBottom: 10,
    },
    urlInputContainer: {
        marginBottom: 10,
    },
    urlInput: {
        fontFamily: '\'Georgia\', serif',
        marginRight: 10,
        padding: 3,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    link: {
        color: '#3b5998',
        textDecoration: 'underline',
    },
};

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}
const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url} style={styles.link}>
            {props.children}
        </a>
    );
};


export default LinkButton