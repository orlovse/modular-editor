import { createPostEditor } from '../editor';
import '../editor/editor-styles.css';

function setupPostEditor() {
    const openButton = document.getElementById('editor-trigger');

    const editor = createPostEditor({
        platforms: [
            { id: 'twitter', label: 'Twitter', maxLength: 80 },
            { id: 'linkedin', label: 'LinkedIn', maxLength: 500 },
            { id: 'facebook', label: 'Facebook', maxLength: 800 },
        ],
        options: {
            title: 'New Post',
            submitText: 'Save',
            textareaPlaceholder: 'Write your post',
        },
        onSubmit: (postData) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('Submit data: ', postData);
                    resolve();
                }, 1500);
            });
        }
    });

    openButton.addEventListener('click', editor.open);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPostEditor);
} else {
    setupPostEditor();
}