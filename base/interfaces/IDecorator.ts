import { ContentBlock, EditorState } from "draft-js";

export type IDecorator = {
    getDecorations(block: ContentBlock, contentState: EditorState): IDecorator[],
    getComponentForKey(key: string): object,
    getPropsForKey(key: string): object,
    component: Function,
    props?: object
}

export interface DraftDecorator {
    strategy: (block: ContentBlock, callback: (start: number, end: number) => void, contentState: ContentState) => void;
    component: Function;
    props?: Object;
}