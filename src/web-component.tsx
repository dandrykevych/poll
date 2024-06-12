import ReactDOM from "react-dom/client";
import PollWidget from './components/PollWidget';
import { PollWidgetHTMLProps } from './models/poll.model.ts';
import { WebComponentTracker } from './web-component-tracker.ts';

const normalizeAttribute = (attribute: string) => {
  return attribute
    .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
};

const normalizeOutput = (input: string) => {
  input = input.trim();

  if (input.startsWith('[')) {
    const jsonString = input
      .replace(/([{,])\s*(['"])?(\w+)\2\s*:/g, '$1"$3":') // Add quotes to keys
      .replace(/'/g, '"'); // Replace single quotes with double quotes

    try {
      // Parse the corrected JSON string
      const array = JSON.parse(jsonString);
      return array;
    } catch (e) {
      console.error("Parsing error:", e);
      return null;
    }
  } else {
    return input;
  }
}

class PollWidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes<PollWidgetHTMLProps>();
    const root = ReactDOM.createRoot(this.shadowRoot as ShadowRoot);

    const isRegistered = WebComponentTracker.register(props.id);

    if (!isRegistered) {
      console.warn(`Element with name ${props.id} is already rendered on this page.`);
      this.innerHTML = ``;
      return;
    }

    root.render(<PollWidget {...props} />);
  }

  private getPropsFromAttributes<T>(): T {
    const props: Record<string, string> = {};

    for (let index = 0; index < this.attributes.length; index++) {
      const attribute = this.attributes[index];
      props[normalizeAttribute(attribute.name)] = normalizeOutput(attribute.value);
    }

    return props as T;
  }
}

export default PollWidgetWebComponent;
