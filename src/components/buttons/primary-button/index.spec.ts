import { LitElement } from 'lit-element';

describe('primary-button', () => {
  const PRIMARY_BUTTON_TAG = 'primary-button';

  const ELEMENT_ID = 'primary-button';

  let buttonElement: LitElement;

  const getShadowRoot = (tagName: string): ShadowRoot => {
    return document.body.getElementsByTagName(tagName)[0].shadowRoot;
  };

  beforeEach(() => {
    buttonElement = window.document.createElement(
      PRIMARY_BUTTON_TAG
    ) as LitElement;

    buttonElement.innerHTML = 'Click';

    document.body.appendChild(buttonElement);
  });

  afterEach(() => {
    document.body.getElementsByTagName(PRIMARY_BUTTON_TAG)[0].remove();
  });

  it('renders correctly', () => {
    expect(buttonElement).toMatchInlineSnapshot(`
      <primary-button>
        Click
      </primary-button>
    `);
  });

  it('set the text', async () => {
    const TEXT = 'Click';

    buttonElement.innerHTML = TEXT;

    await buttonElement.updateComplete;

    const text: string = getShadowRoot(PRIMARY_BUTTON_TAG)
      .querySelector('slot')
      .assignedNodes()[0].nodeValue;

    expect(text).toBe(TEXT);
  });

  it('set the color', async () => {
    const COLOR = 'red';

    buttonElement.setAttribute('color', COLOR);

    await buttonElement.updateComplete;

    const classList: DOMTokenList =
      getShadowRoot(PRIMARY_BUTTON_TAG).getElementById(ELEMENT_ID).classList;

    expect(classList).toContain(`primary-button--color-${COLOR}`);
  });

  it('set the size', async () => {
    const SIZE = 'desktop';

    buttonElement.setAttribute('size', SIZE);

    await buttonElement.updateComplete;

    const classList: DOMTokenList =
      getShadowRoot(PRIMARY_BUTTON_TAG).getElementById(ELEMENT_ID).classList;

    expect(classList).toContain(`primary-button--size-${SIZE}`);
  });

  it('set disabled', async () => {
    buttonElement.setAttribute('disabled', '');

    await buttonElement.updateComplete;

    const attributeNames: string[] = getShadowRoot(PRIMARY_BUTTON_TAG)
      .getElementById(ELEMENT_ID)
      .getAttributeNames();

    const classList: DOMTokenList =
      getShadowRoot(PRIMARY_BUTTON_TAG).getElementById(ELEMENT_ID).classList;

    expect(attributeNames).toContain('disabled');

    expect(classList).toContain(`primary-button--disabled`);
  });

  it('set loading', async () => {
    buttonElement.setAttribute('loading', '');

    await buttonElement.updateComplete;

    const loaderElement: Element = getShadowRoot(PRIMARY_BUTTON_TAG)
      .getElementById(ELEMENT_ID)
      .getElementsByClassName('primary-button__loader')[0];

    const classList: DOMTokenList =
      getShadowRoot(PRIMARY_BUTTON_TAG).getElementById(ELEMENT_ID).classList;

    expect(loaderElement).toBeTruthy();

    expect(classList).toContain(`primary-button--loading`);
  });

  it('handles clicks', async () => {
    const RESULT = 100;

    const mockClickFunction = jest.fn(() => RESULT);

    buttonElement.addEventListener('click', () => {
      mockClickFunction();
    });

    getShadowRoot(PRIMARY_BUTTON_TAG).getElementById(ELEMENT_ID).click();

    expect(mockClickFunction).toHaveBeenCalledTimes(1);

    expect(mockClickFunction).toHaveNthReturnedWith(1, RESULT);
  });
});
