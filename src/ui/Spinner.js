export default class Spinner {
    #parentId;
    #spinnerElement;
    #parentElement;
    constructor(parentId) {
        this.#parentId = parentId;
        this.#parentElement = document.getElementById(parentId);
        this.#buildHTML();
    }
    start() {
        this.#parentElement.appendChild(this.#spinnerElement);
    }
    stop() {
        try {
            document.getElementById(`${this.#parentId}-container-spinner-animation`).remove();
        } catch (err) {
            console.log(err, this.#parentId);
        }
    }
    #buildHTML() {
        const str = `
        <div class="circle1">
        </div>
        <div class="circle2">
        </div>
        <div class="circle3">
        </div>
      `;
        this.#spinnerElement = document.createElement("div");
        this.#spinnerElement.setAttribute('id', `${this.#parentId}-container-spinner-animation`);
        this.#spinnerElement.setAttribute('class', 'spinner-animation');
        this.#spinnerElement.innerHTML = str;   
    }


}