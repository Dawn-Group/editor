import React, { Component, Fragment, createRef } from "react";
import { 
    Editor, 
    EditorState, 
    SelectionState,
    DefaultDraftBlockRenderMap,
    getDefaultKeyBinding
} from "draft-js";
import 'es6-shim';

import { Map } from "immutable";
import defaultKeyCommands from "./utils/defaultKeyCommands";
import resolveDecorators from "./utils/resolveDecorators";
import proxies from "./utils/proxies";

interface BaseEditorProps {
    props?: object,
    editorState: EditorState,
    onChange?: (editorState: EditorState, pluginMethods: object) => void,
    readOnly?: boolean,
    plugins?:any[],
    defaultKeyBindings?: boolean,
    defaultKeyCommands?: boolean,
    defaultBlockRenderMap?: boolean,
    customStyleMap?: object,
 //   blockRenderMap?: object,
    decorators?:[]
}

interface BaseEditorState {
    editorState: EditorState, 
    readOnly?: boolean,
}

interface PluginHooks {
    [propName: string]: any
}

function resolePlugins(target:any){
    console.log(target, "base2")
}
@resolePlugins
export default class BaseEditor extends Component<BaseEditorProps, BaseEditorState> {
    constructor(props: BaseEditorProps) {
        super(props);
        this.editorRef = createRef();
        this.state = {
            editorState: EditorState.createEmpty()
        };

     //   console.log(props, "props")
     /*    const plugins = [this.props, ...this.resolvePlugins()];
        plugins.forEach((plugin) => {
            if (typeof plugin.initialize !== 'function') return;
            plugin.initialize(this.getPluginMethods());
        });

        // attach proxy methods like `focus` or `blur`
        proxies.forEach((method: string) => {
            this[method] = (...args:any) => (
                this.editorRef[method](...args)
            );
        });
        this.createEventHooks = this.createEventHooks.bind(this);
        this.createHandleHooks = this.createHandleHooks.bind(this);
        this.createFnHooks = this.createFnHooks.bind(this);
        this.onChange = this.onChange.bind(this);
        this.resolvePlugins = this.resolvePlugins.bind(this);
        this.resolveblockRenderMap = this.resolveblockRenderMap.bind(this) */
    }

    editorRef: any;
    [propName: string]: any;

    onChange(editorState: EditorState) {
        let newEditorState = editorState;
      /*   this.resolvePlugins().forEach((plugin) => {
            if (plugin && plugin.onChange){
                newEditorState = plugin.onChange(newEditorState, this.getPluginMethods())
            }
        });
        if(this.props.onChange){
            this.props.onChange(newEditorState, this.getPluginMethods())
        } */
        this.setState({ editorState })
    }

    getPlugins(){
        return this.props.plugins.slice(0);
    }

    getProps(){
        return { ...this.props };
    }

    getReadOnly(){
        return this.props.readOnly;
    } 
    setReadOnly(readOnly: boolean){
        if (readOnly !== this.state.readOnly) this.setState({ readOnly });
    };

    getEditorRef(){
        return this.editorRef;  // 
    } 

    getEditorState() {
        return this.props.editorState;
    }

    getPluginMethods(){
        return {
            getPlugins: this.getPlugins,
            getProps: this.getProps,
            setEditorState: this.onChange,
            getEditorState: this.getEditorState,
            getReadOnly: this.getReadOnly,
            setReadOnly: this.setReadOnly,
            getEditorRef: this.getEditorRef,
        };
    }

    createFnHooks(methodName: string, plugins: any[]){
        return (...args: any[]) => {
        const newArgs = [].slice.apply(args);

        newArgs.push(this.getPluginMethods());

        if (methodName === 'blockRendererFn') {
            let block = { props: {}, component: false };
            plugins.forEach((plugin) => {
                if (typeof plugin[methodName] !== 'function') return;
                const result = plugin[methodName](...newArgs);
                if (result !== undefined && result !== null) {
                    const { props: pluginProps, ...pluginRest } = result; 
                    const { props, ...rest } = block; 
                    block = { ...rest, ...pluginRest, props: { ...props, ...pluginProps } };
                }
            });

            return block.component ? block : false;
        } else if (methodName === 'blockStyleFn') {
            let styles: string;
            plugins.forEach((plugin) => {
                if (typeof plugin[methodName] !== 'function') return;
                const result = plugin[methodName](...newArgs);
                if (result !== undefined && result !== null) {
                    styles = (styles ? (`${styles} `) : '') + result;
                }
            });

            return styles || '';
        }

        let result;
        const wasHandled = plugins.some((plugin) => {
            if (typeof plugin[methodName] !== 'function') return false;
            result = plugin[methodName](...newArgs);
            return result !== undefined;
        });
        return wasHandled ? result : false;
    };
}


    createPluginHooks() {
        const pluginHooks: PluginHooks = {};
        const eventHookKeys: string[] = [];
        const handleHookKeys: string[] = [];
        const fnHookKeys: string[] = [];
        const plugins = [this.props, ...this.resolvePlugins()];

        plugins.forEach((plugin) => {
            Object.keys(plugin).forEach((attrName) => {
                if (attrName === 'onChange') return;

                // if `attrName` has been added as a hook key already, ignore this one
                if (eventHookKeys.indexOf(attrName) !== -1 || fnHookKeys.indexOf(attrName) !== -1) return;

                const isEventHookKey = attrName.indexOf('on') === 0;
                if (isEventHookKey) {
                    eventHookKeys.push(attrName);
                    return;
                }

                const isHandleHookKey = attrName.indexOf('handle') === 0;
                if (isHandleHookKey) {
                    handleHookKeys.push(attrName);
                    return;
                }
                // checks if `attrName` ends with 'Fn'
                const isFnHookKey = (attrName.length - 2 === attrName.indexOf('Fn'));
                if (isFnHookKey) {
                    fnHookKeys.push(attrName);
                }
            });
        });

        eventHookKeys.forEach((attrName) => {
            pluginHooks[attrName] = this.createEventHooks(attrName, plugins);
        });

        handleHookKeys.forEach((attrName) => {
            pluginHooks[attrName] = this.createHandleHooks(attrName, plugins);
        });

        fnHookKeys.forEach((attrName) => {
            pluginHooks[attrName] = this.createFnHooks(attrName, plugins);
        });

        return pluginHooks;
    }

    createEventHooks(methodName: string, plugins: any[]){
        return (...args: any[]) => {
            const newArgs = [].slice.apply(args);
            newArgs.push(this.getPluginMethods());

            return plugins.some((plugin) =>
                typeof plugin[methodName] === 'function'
                && plugin[methodName](...newArgs) === true
            );
        }
    } 

    createHandleHooks(methodName: string, plugins: any[]){ 
        return (...args: any[]) => {
            const newArgs = [].slice.apply(args);
            newArgs.push(this.getPluginMethods());

            return plugins.some((plugin) =>
                typeof plugin[methodName] === 'function'
                && plugin[methodName](...newArgs) === 'handled'
            ) ? 'handled' : 'not-handled';
        };
    } 

    resolveblockRenderMap(){
      //  debugger
        let blockRenderMap = this.props.plugins
            .filter((plugin) => (plugin && plugin.blockRenderMap) !== undefined)
            .reduce((maps, plugin) => maps.merge(plugin.blockRenderMap), Map({}));
        if(this.props.defaultBlockRenderMap){
            blockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap)
        }
        if(this.props.blockRenderMap){
            blockRenderMap = blockRenderMap.merge(this.props.blockRenderMap)
        }
        return blockRenderMap;
    }

    resolveCustomStyleMap(){
        let customStyleMap = this.props.plugins
            .filter((plug) => plug.customStyleMap !== undefined)
            .map((plug) => plug.customStyleMap)
            .concat([this.props.customStyleMap])
            .reduce((styles, style) => (
                {
                    ...styles,
                    ...style,
                }
            ), {});
        return customStyleMap;
    }

    resolveAccessibilityProps(){
        let accessibilityProps = { ariaHasPopup: false, ariaExpanded: false };
        const plugins = [this.props, ...this.resolvePlugins()];
        plugins.forEach((plugin) => {
            if (typeof plugin.getAccessibilityProps !== 'function') return;
            const props = plugin.getAccessibilityProps();
            const popupProps = { ariaHasPopup: false, ariaExpanded: false};

            if (accessibilityProps.ariaHasPopup === undefined) {
                popupProps.ariaHasPopup = props.ariaHasPopup;
            } else if (props.ariaHasPopup === true) {
                popupProps.ariaHasPopup = true;
            }

            if (accessibilityProps.ariaExpanded === undefined) {
                popupProps.ariaExpanded = props.ariaExpanded;
            } else if (props.ariaExpanded === true) {
                popupProps.ariaExpanded = true;
            }

            accessibilityProps = {
                ...accessibilityProps,
                ...props,
                ...popupProps,
            };
        });
        return accessibilityProps;
    }

    resolvePlugins(){
        const plugins = this.props.plugins && this.props.plugins.slice(0);
        if(this.props.defaultKeyBindings === true){
            plugins.push({ keyBindingFn: (event: any) => getDefaultKeyBinding(event)})
        }
        if(this.props.defaultKeyCommands === true) {
            plugins.push(defaultKeyCommands) // handleKeyCommand
        }   
        return plugins;
    }

    getDecoratorLength(obj: Decorator){
        let decorators;
        if(obj.decorators != null){
            decorators = obj.decorators; 
        } else if(obj._decorators != null){
            decorators = obj._decorators;
        }
        return decorators.size != null ? decorators.size : decorators.length;
    }

    moveSelectionToEnd(editorState: EditorState) {
        const content = editorState.getCurrentContent();
        const blockMap = content.getBlockMap();

        const key = blockMap.last().getKey();
        const length = blockMap.last().getLength();

        const selection = new SelectionState({
            anchorKey: key,
            anchorOffset: length,
            focusKey: key,
            focusOffset: length,
        });
        return EditorState.acceptSelection(editorState, selection);
}

   /*  componentWillMount(){
        const decorator = resolveDecorators(this.props, this.getEditorState, this.onChange);

        const editorState = EditorState.set(this.props.editorState, { decorator });
        this.onChange(this.moveSelectionToEnd(editorState));
    }

    componentWillReceiveProps(next: BaseEditorProps){
        const current = this.props;
        const currentDec = current.editorState.getDecorator();
        const nextDec = next.editorState.getDecorator();
        if(!nextDec || currentDec === nextDec) return;
        if (currentDec && nextDec && this.getDecoratorLength(currentDec) === this.getDecoratorLength(nextDec)) return;
        const editorState = EditorState.set(next.editorState, { decorator: currentDec });
        this.onChange(this.moveSelectionToEnd(editorState));
    }

    componentWillUnmount(){
        this.resolvePlugins().forEach((plugin) => {
            if(plugin.willUnmount) {
                plugin.willUnMount({
                    getEditorState: this.getEditorState,
                    setEditorState: this.onChange
                })
            }
        })
    } */

    render() {
        // console.log(this.props.plugins, "plguins")
       // const { editorState } = this.state;
       /*  const pluginHooks = this.createPluginHooks()
        const customStyleMap = this.resolveCustomStyleMap();
        const accessibilityProps = this.resolveAccessibilityProps();
        const blockRenderMap = this.resolveblockRenderMap(); */
        return (
            <Fragment>
                <div>{this.props.plugins.map((P, index) => <P key={index} editorState = {this.props.editorState} onChange={this.props.onChange}>Blod</P>)}</div>
                <Editor
                    {...this.props}
                    // {...pluginHooks}
                    // {...accessibilityProps}
                    editorState={this.props.editorState}
                    onChange={this.props.onChange}
                    readOnly={this.props.readOnly || this.state.readOnly}
                    // customStyleMap={customStyleMap}
                    // blockRenderMap={blockRenderMap}
                    ref = {this.editorRef}
                />
            </Fragment>
        )
    }
}
