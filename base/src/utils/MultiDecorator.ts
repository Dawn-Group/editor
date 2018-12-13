import Immutable, { List } from 'immutable';
import { ContentBlock, EditorState } from 'draft-js';

const KEY_SEPARATOR = '-';
import { IDecorator } from "../../interfaces/IDecorator";


export default class MultiDecorator {
  constructor(decorators: IDecorator[] ) {
    this.decorators = Immutable.List(decorators);
  }
  
  decorators: List<IDecorator>


  /**
   * Return list of decoration IDs per character
   *
   * @param {ContentBlock} block
   * @return {List<String>}
   */
  getDecorations(block: ContentBlock, contentState: EditorState) {
    const decorations = new Array(block.getText().length).fill(null);

    this.decorators.forEach((decorator, i) => {
      const subDecorations = decorator.getDecorations(block, contentState);

      subDecorations.forEach((key, offset) => {
        if (!key) {
          return;
        }

        decorations[offset] = i + KEY_SEPARATOR + key;
      });
    });

    return Immutable.List(decorations);
  }

  /**
   * Return component to render a decoration
   *
   * @param {String} key
   * @return {Function}
   */
  getComponentForKey(key: string) {
    const decorator = this.getDecoratorForKey(key);
    return decorator.getComponentForKey(
      MultiDecorator.getInnerKey(key)
    );
  }

  /**
   * Return props to render a decoration
   *
   * @param {String} key
   * @return {Object}
   */
  getPropsForKey(key: string) {
    const decorator = this.getDecoratorForKey(key);
    return decorator.getPropsForKey(
      MultiDecorator.getInnerKey(key)
    );
  }

  /**
   * Return a decorator for a specific key
   *
   * @param {String} key
   * @return {Decorator}
   */
  getDecoratorForKey(key: string) {
    const parts = key.split(KEY_SEPARATOR);
    const index = Number(parts[0]);

    return this.decorators.get(index);
  }

  /**
   * Return inner key for a decorator
   *
   * @param {String} key
   * @return {String}
   */
  static getInnerKey(key: string) {
    const parts = key.split(KEY_SEPARATOR);
    return parts.slice(1).join(KEY_SEPARATOR);
  }
}
