import {
  css,
  CSSResult,
  customElement,
  html,
  LitElement,
  property,
  unsafeCSS,
  TemplateResult,
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import '../../svg/loader-icon.ts';
import '../../icon/icon.ts';

import styles from './styles.scss';
import { Colors, Sizes, Types } from './config';

const componentName = 'primary-button';

export interface PrimaryButtonI {
  children?: string;
  color?: Colors;
  size?: Sizes;
  type?: Types;
  loading?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  ref?: unknown;
  onClick?: (event: Event) => void;
}

/**
 * Primary Button
 * @slot default - Button Label
 */
@customElement(componentName)
export class PrimaryButton extends LitElement {
  @property({ type: String }) color: Colors = 'red';

  @property({ type: String }) size: Sizes = 'desktop';

  @property({ type: String }) type: Types = 'button';

  @property({ type: Boolean }) disabled = false;

  @property({ type: Boolean }) loading = false;

  @property({ type: Boolean }) rounded = false;

  /**
   * Icon name (for font icons)
   * @attr
   */
  @property({ type: String }) icon = '';

  /**
   * Icon src (for image icons)
   * @attr
   */
  @property({ type: String }) iconSrc = '';

  /**
   * Color for the font icons and label
   * [primary-color, primary-color-dark, secondary-color, secondary-color-light,
   * promo-color, valid-color, invalid-color, dark-color, grey-color, white-color, alpha-color]
   * @attr
   */
  @property({ type: String }) iconColor = 'white-color';

  /**
   * Icon size
   * [tiny, small, medium, large, inherit (just for font icons - will inherit ancestor font size)]
   * @attr
   */
  @property({ type: String }) iconSize = 'small';

  static get styles(): CSSResult {
    return css`
      ${unsafeCSS(styles)}
    `;
  }

  constructor() {
    super();
  }

  getClasses(): { [key: string]: boolean } {
    const classes: { [key: string]: boolean } = {};
    classes[`${componentName}`] = true;
    classes[`${componentName}--size-${this.size}`] = true;
    classes[`${componentName}--color-${this.color}`] = true;
    classes[`${componentName}--rounded`] = this.rounded;
    classes[`${componentName}--loading`] = this.loading;
    classes[`${componentName}--disabled`] = this.disabled;
    return classes;
  }

  render(): TemplateResult {
    return html`
      <button
        id="${componentName}"
        class="${classMap(this.getClasses())}"
        ?disabled=${this.disabled}
        type="${this.type}"
        @click=${(event: Event): Event | void => this._emit(event)}
      >
        ${this.loading
          ? html` <div class="${componentName}__loader">
              <srui-loader-icon></srui-loader-icon>
            </div>`
          : ''}
        ${this.icon !== '' || this.iconSrc !== ''
          ? html` <srui-icon
              icon="${this.icon}"
              iconsrc="${this.iconSrc}"
              color="${this.iconColor}"
              size="${this.iconSize}"
            />`
          : ''}
        ${!this.rounded
          ? html`<span class='${componentName}__label'><slot></span>`
          : ''}
      </button>
    `;
  }
  _emit(event: Event): Event | void {
    const closestForm = this.closest('form');

    if (this.disabled) {
      event.stopPropagation();
      return;
    }

    if (this.type === 'submit' && closestForm) {
      event.stopImmediatePropagation();
      closestForm.dispatchEvent(new Event('submit'));
      return;
    }

    return event;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'primary-button': PrimaryButtonI;
    }
  }

  interface HTMLElementTagNameMap {
    'primary-button': PrimaryButton;
  }
}
