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
        document.getElementById('cover').hidden = false;
        this.#spinnerElement.hidden = false;
    }
    stop() {
        document.getElementById('cover').hidden = true;
        this.#spinnerElement.hidden = true;
    }
}