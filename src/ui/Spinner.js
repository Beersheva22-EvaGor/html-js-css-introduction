export default class Spinner {
    #spinnerElement
    #coverElement
    constructor(parentId) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = `<div class="spinner" hidden>
        <div class="circle1">
        </div>
        <div class="circle2">
        </div>
        <div class="circle3">
        </div>
      </div>`;
        this.#spinnerElement = parentElement.childNodes[0];
        this.#coverElement = document.getElementById('cover');
    }
    start() {
        this.#coverElement.style.display = 'block';
        this.#spinnerElement.hidden = false;
    }
    stop() {
        this.#coverElement.style.display = 'none';
        this.#spinnerElement.hidden = true;
    }
}