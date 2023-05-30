import { range } from "../util/number-functions.js";
import config from "../config/service-config.json" assert {type: 'json'};

const FORM_AGE_ID = 'form-age';
const MIN_AGE_ID = 'min-age-id';
const MAX_AGE_ID ='max-age-id';
const SUBMIT_ID = 'submit-age-id';
const PROMPT_MIN_AGE = "minimal age";
const PROMPT_MAX_AGE = "maximal age";

export default class AgeStatisticsForm{
    #parentId;
    #formElement;
    #maxAgeElement;
    #minAgeElement;
    #formData;
    
    constructor(parentId){
        this.#formData = {};
        this.#parentId = parentId;
        this.#buildForm();
        this.#setElements();
        this.#setSelectOptions();
        this.#setHandlers();
    }
    #buildForm(){
        document.getElementById(this.#parentId).insertAdjacentHTML('afterbegin',
            `<form id="${this.#parentId}-${FORM_AGE_ID}" class="form-statistics-cl">
        <div class="row-input">
            <select id="${this.#parentId}-${MIN_AGE_ID}" class="select-control" required></select>
            <select id="${this.#parentId}-${MAX_AGE_ID}" class="select-control" required></select>
        </div>

        <div class="buttons-group">
            <button type="submit" id ="${this.#parentId}-${SUBMIT_ID}">Submit</button>
            <button type="reset">Reset</button>
        </div>
    </form>
        `);
    }

    #setElements() {
        this.#formElement = document.getElementById(`${this.#parentId}-${FORM_AGE_ID}`);
        this.#minAgeElement = document.getElementById(`${this.#parentId}-${MIN_AGE_ID}`);
        this.#maxAgeElement = document.getElementById(`${this.#parentId}-${MAX_AGE_ID}`);
    }

    #minAgeHandler(){
        const minAge = +this.#minAgeElement.value;
        this.#formData.minAge = minAge;
        if (this.#formData.maxAge == undefined || this.#formData.maxAge < minAge) {
            delete this.#formData.maxAge;
            setOptionItems(this.#maxAgeElement, range(minAge, config.maxAge + 1), PROMPT_MIN_AGE);
        }
    }
    #maxAgeHandler(){
        const maxAge = +this.#maxAgeElement.value;
        this.#formData.maxAge = maxAge;
        if (this.#formData.minAge == undefined || this.#formData.minAge > maxAge) {
            delete this.#formData.minAge;
            setOptionItems(this.#minAgeElement, range(config.minAge, maxAge), PROMPT_MAX_AGE);
        }
    
    }

    #setHandlers() {
        this.#minAgeElement.onchange = this.#minAgeHandler.bind(this);
        this.#maxAgeElement.onchange = this.#maxAgeHandler.bind(this);
        this.#formElement.onreset = () => {
            this.#formData = {};
            this.#setSelectOptions();
        }
    }
    getDataFromForm() {
        return new Promise(resolve => {
            this.#formElement.onsubmit = (event) => {
                event.preventDefault();
                resolve(this.#formData);
            }
        })
    }


    #setSelectOptions() {  
        setOptionItems(this.#minAgeElement, range(config.minAge, config.maxAge + 1), PROMPT_MIN_AGE);
        setOptionItems(this.#maxAgeElement, range(config.minAge, config.maxAge + 1), PROMPT_MAX_AGE);
    }
}

function setOptionItems(element, options, placeholder) {
    element.innerHTML = `<option value hidden selected>--${placeholder}--</option>`;
    element.innerHTML += options.map(o => `<option value="${o}">${o}</option>`).join('')
}