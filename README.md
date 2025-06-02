# Home Assignment: Social Post Editor

## 🎯 Objective
Build a reusable, framework-agnostic UI component for creating social media posts using only vanilla JavaScript and CSS.

## Visual example
<img width="719" alt="Screenshot 2025-06-02 at 22 18 32" src="https://github.com/user-attachments/assets/9bd23d2b-365b-4cb7-960e-1f3b9a0c0306" />


https://github.com/user-attachments/assets/63c3297f-afa3-4a27-9051-3421676f1145


---

## ✅ Core Requirements

* **Tech Stack:** Vanilla JS (ES6+), functional style. **No frameworks or libraries** (React, Vue, jQuery, etc.).
* **UI/UX:** A modal dialog with a form, platform selector, and a `textarea`.
* **Character Counter:** A real-time counter (`current / max`) that updates as the user types.
* **State Handling:** The submit button must have `disabled`, `loading`, and `error` states. An error message should be displayed on failed submission.
* **Accessibility (A11y):** The modal must have a **focus trap** and be closable with the `Escape` key. Use of proper ARIA attributes is required.
* **Styling:** Styles must be encapsulated and self-contained.

---

## 🛠️ API Specification

### `createPostEditor(config)`
The factory function accepts a `config` object:
* `platforms` **(required)**: `Array<{id, label, maxLength}>` — Defines the social platforms.
* `options` (optional): `{title, submitText, ...}` — Customizes UI text.
* `onSubmit` **(required)**: `Function(postData) => Promise<void>` — An async callback for form submission.

### Returned API Object
The function returns an object with two methods:
* `open(initialText?: string)`: Opens the modal.
* `destroy()`: Removes the component and all its listeners.

---

## 🚀 Usage Example

```javascript
const editor = createPostEditor({
    platforms: [
        { id: 'twitter', label: 'Twitter', maxLength: 80 },
        { id: 'linkedin', label: 'LinkedIn', maxLength: 500 },
        { id: 'facebook', label: 'Facebook', maxLength: 800 },
    ],
    onSubmit: (postData) => {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
});

document.getElementById('openBtn').addEventListener('click', editor.open);
