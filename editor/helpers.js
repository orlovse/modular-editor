export function createDomElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.id) element.id = options.id;
    if (options.className) element.className = options.className;
    if (options.textContent) element.textContent = options.textContent;
    if (options.innerHTML) element.innerHTML = options.innerHTML;
    
    if (options.attributes) {
        for (const attr in options.attributes) {
            element.setAttribute(attr, options.attributes[attr]);
        }
    }

    if (options.children) {
        options.children.forEach(child => {
            if (child instanceof Node) {
                element.appendChild(child);
            } else if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            }
        });
    }

    if (options.eventListeners) {
        for (const eventType in options.eventListeners) {
            element.addEventListener(eventType, options.eventListeners[eventType]);
        }
    }

    return element;
}