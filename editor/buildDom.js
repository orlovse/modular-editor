import { createDomElement } from './helpers';

export let elements = {
    overlay: null,
    modal: null,
    textarea: null,
    submitButton: null,
    charCounter: null,
    platformRadios: {},
    closeButton: null,
};

export function createDOM(config, uiText, close) {
    elements.closeButton = createDomElement('button', {
        className: 'editor__close-button',
        innerHTML: '&times;',
        attributes: { 'aria-label': uiText.closeButtonLabel }
    });

    const header = createDomElement('div', {
        className: 'editor__header',
        children: [
            createDomElement('h2', { className: 'editor__title', textContent: uiText.title }),
            elements.closeButton
        ]
    });

    const platformElements = config.platforms.map((p, index) => {
        const radioId = `editor__platform-${p.id}`;
        const radioInput = createDomElement('input', {
            attributes: { type: 'radio', name: 'social-composer-platform', value: p.id, id: radioId },
        });
        if (index === 0) radioInput.checked = true;
        
        elements.platformRadios[p.id] = radioInput;

        return createDomElement('div', {
            children: [
                radioInput,
                createDomElement('label', { attributes: { for: radioId }, textContent: p.label })
            ]
        });
    });
    
    const platformsContainer = createDomElement('div', {
        className: 'editor__platforms',
        attributes: { role: 'radiogroup', 'aria-labelledby': 'editor__platform-label-id' },
        children: [
            ...platformElements
        ]
    });

    elements.textarea = createDomElement('textarea', {
        className: 'editor__textarea',
    });
    elements.charCounter = createDomElement('span', { className: 'editor__char-counter' });
    elements.submitButton = createDomElement('button', {
        className: 'editor__submit-button',
        attributes: { type: 'submit' }
    });

    const footer = createDomElement('div', {
        className: 'editor__footer',
        children: [elements.charCounter, elements.submitButton]
    });

    const form = createDomElement('form', {
        className: 'editor__form',
        children: [elements.textarea, footer]
    });

    elements.modal = createDomElement('div', {
        className: 'editor__modal',
        attributes: { role: 'dialog', 'aria-modal': 'true' },
        children: [header, platformsContainer, form]
    });

    elements.overlay = createDomElement('div', {
        className: 'editor__overlay',
        eventListeners: { click: (e) => { if (e.target === elements.overlay) close(); } },
        children: [elements.modal]
    });
}