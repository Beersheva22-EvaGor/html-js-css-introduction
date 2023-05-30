const ACTIVE = 'active';
export default class ApplicationBar {
    #buttons
    #sectionElements
    #activeIndex
    #handlerStatistics;
    constructor(parentId, sections) {
        //sections - array of objects 
        //each object {title: string, id: string}
        this.#fillButtons(parentId, sections.map(s => s.title));
        this.#setSectionElements(sections.map(s => s.id));
        this.#addListeners();
    }
    addHandlerStatistics(handler) {
        this.#handlerStatistics = handler;
    }

    #fillButtons(parentId, titles) {
        const parentElement = document.getElementById(parentId);
        parentElement.innerHTML = titles.map(t => `<button class="menu-button">${t}</button>`).join('');
        this.#buttons = parentElement.childNodes;
    }
    #setSectionElements(sectionIds) {
        this.#sectionElements = sectionIds.map(id => document.getElementById(id));
    }
    #addListeners() {
        this.#buttons.forEach((b, index) => b.addEventListener('click',
            this.#handler.bind(this, index)));
    }
    #handler(index) {
        if (this.#activeIndex == undefined || index != this.#activeIndex) {
            if (this.#activeIndex != undefined) {
                this.#buttons[this.#activeIndex].classList.remove(ACTIVE);
                this.#sectionElements[this.#activeIndex].hidden = true;
            }

            this.#sectionElements[index].hidden = false;
            this.#buttons[index].classList.add(ACTIVE);
            this.#activeIndex = index;

        }

        if (index == 2) {
            [...this.#handlerStatistics].forEach(f => f());
        }
    }

}