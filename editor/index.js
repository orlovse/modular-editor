import * as store from './store';
import { elements, createDOM } from './buildDom';
import './editor-styles.css';

export function createPostEditor(config) {
    const uiText = {
        title: config.options?.title || 'New Post',
        placeholder: config.options?.textareaPlaceholder || 'Type your text...',
        submitButton: config.options?.submitText || 'Submit',
    };

    function render(state) {
        if (!elements.modal) {
            createDOM(config, uiText, close);
        }
        
        const platform = state.currentPlatformId 
            ? config.platforms.find(platform => platform.id === state.currentPlatformId)
            : config.platforms[0];

        elements.textarea.placeholder = uiText.placeholder;
        const textLength = state.text.length;
        const maxLength = platform.maxLength;
        elements.charCounter.textContent = `${textLength} / ${maxLength}`;
        elements.charCounter.style.color = textLength > maxLength ? 'red' : 'inherit';

        const isInvalid = textLength === 0 || textLength > maxLength;
        elements.submitButton.disabled = isInvalid || state.isLoading;
        elements.submitButton.textContent = state.isLoading ? 'Loading...' : uiText.submitButton;

        if (elements.errorContainer) {
            elements.errorContainer.textContent = state.error || '';
            elements.errorContainer.style.display = state.error ? 'block' : 'none'; 
        }
    }

    const unsubscribe = store.subscribe(render);

    function handlePlatformChange(event) {
        store.setState({ currentPlatformId: event.target.value });
        elements.textarea.focus();
    }

    function handleTextareaInput(event) {
        store.setState({ text: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        store.setState({ isLoading: true });

        try {
            await config.onSubmit({
                ...store.getState()
            });

            close();
        } finally {
            store.setState({ isLoading: true });
        }
    }

    function attachEvents() {
        if (!elements.modal) return;
        elements.modal.querySelector('.editor__form').addEventListener('submit', handleSubmit);
        elements.textarea.addEventListener('input', handleTextareaInput);
        elements.closeButton.addEventListener('click', close);
        Object.values(elements.platformRadios).forEach(radio => {
            radio.addEventListener('change', handlePlatformChange);
        });
    }

    function detachEvents() {
        if (!elements.modal) return;
        const form = elements.modal.querySelector('.editor__form');
        if (form) form.removeEventListener('submit', handleSubmit);
        if (elements.textarea) elements.textarea.removeEventListener('input', handleTextareaInput);
        if (elements.closeButton) elements.closeButton.removeEventListener('click', close);
        Object.values(elements.platformRadios).forEach(radio => {
            if (radio) radio.removeEventListener('change', handlePlatformChange);
        });
    }
    
    function open() {
        const state = store.getState();

        if (state.isOpen) return;
        if (!elements.overlay) createDOM(config, uiText, close);

        store.setState({
            isOpen: true,
            text: '',
            isLoading: false,
            currentPlatformId: config.platforms[0].id
        });

        
        document.body.appendChild(elements.overlay);

        elements.overlay.classList.add('m_active');

        elements.textarea.value = '';

        if (elements.platformRadios[state.currentPlatformId]) {
            elements.platformRadios[state.currentPlatformId].checked = true;
        }
        
        attachEvents();

        elements.textarea.focus();
    }

    function close() {
        const state = store.getState();

        if (!state.isOpen) return;

        store.setState({ isOpen: false })
        
        elements.overlay.classList.remove('m_active');
        elements.overlay.addEventListener('transitionend', () => {
            if (!state.isOpen) { 
                detachEvents();
                
                if (elements.overlay && elements.overlay.parentNode === document.body) {
                     document.body.removeChild(elements.overlay);
                }
            }
        }, { once: true });
    }
    
    function destroy() {
        unsubscribe();

        if (elements.overlay) {
            if (store.getState().isOpen) close();
            if (elements.overlay.parentNode) elements.overlay.remove();
        }
    }

    return { open, close, destroy };
}