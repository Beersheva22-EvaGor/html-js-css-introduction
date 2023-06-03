import { setOptionItems } from "../util/ui-functions.js";

const KEY_ID = 'key-id';
const FORM_ID = 'find-form-id';
const FIND_ID = 'find-id';
const SUBMIT_BTN_ID = 'submit';
const REFRESH_BTN_ID = 'refresh';
const refresh ='refresh';

export default class FindForm {
    #promiseFindResult
    #objData
    constructor(parentId, keys) {
        this.#objData = {};
        this.#createForm(parentId);
        this.#addHandler(parentId);
        this.#setSelectOptions(parentId, keys)
    }

    #createForm(parentId) {
        document.getElementById(parentId).innerHTML =
            `<form id="${parentId}-${FORM_ID}-form" class="form-update">
                <div class="find-form">
                <div>
                    <select id="${parentId}-${KEY_ID}"></select>
                    <input type="text" id="${parentId}-${FIND_ID}"  placeholder="Input text to find" required>
                    <button id="${parentId}-${SUBMIT_BTN_ID}"><img src="./src/img/loupe.png" alt="Italian Trulli" style="width: 15px"></button>
                    <button id="${parentId}-${REFRESH_BTN_ID}">&#8635;</button>
                    </div>
                </div>
            </form>`;
    }

    #addHandler(parentId) {
        this.#addHandlerSubmit(parentId);
        this.#addHandlerRefresh(parentId);
    }
    #addHandlerSubmit(parentId) {
        document.getElementById(`${parentId}-${SUBMIT_BTN_ID}`).onclick = event => {
            event.preventDefault();
            this.#objData['field'] = document.getElementById(`${parentId}-${KEY_ID}`).value;
            this.#objData['value'] = document.getElementById(`${parentId}-${FIND_ID}`).value;
            this.#promiseFindResult(this.#objData)
        }
    }
    #addHandlerRefresh(parentId) {
        document.getElementById(`${parentId}-${REFRESH_BTN_ID}`).onclick = event => {
            event.preventDefault();
            this.#promiseFindResult(refresh);
        }
    }

    getFindDataPromise() {
        return new Promise(resolve => this.#promiseFindResult = resolve);
    }
    #setSelectOptions(parentId, paramObj) {
        setOptionItems(document.getElementById(`${parentId}-${KEY_ID}`), paramObj, 'Choose field');
    }
}