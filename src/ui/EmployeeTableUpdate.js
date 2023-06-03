import { setOptionItems } from "../util/ui-functions.js";

const FORM_ID = 'employees-table-form-id';
const DEPARTMENT_ID = 'employees-table-department-id';
const SALARY_ID = 'employees-table-salary-id';
const resultRemove = 'remove';
const resultUpdate = 'update';
const CLOSE_BTN_ID = 'cancel-btn-id';
const SUBMIT_BTN_ID = 'submit-btn-id';

export default class EmployeeTableUpdate {
    #formElement
    #labelElement
    #dataObj
    #departmentElement
    #salaryElement
    #closeBtn
    #submitBtn
    #parentId

    #promiseResult

    constructor(parentId, paramObj) {
        this.#parentId = parentId;
        const parentElement = document.getElementById(parentId);
        this.#createForm(parentElement, parentId, paramObj);
        this.#setSelectOptions(parentId, paramObj);
        this.#setElements(parentId);
        // this.#addHandlers(parentId);
        this.#addHandlersOnClick();
    }

    #addHandlersOnClick() {
        this.#removeHandler();
        this.#updateHandler();
    }

    #removeHandler() {
        document.getElementById("remove-employee").onclick = event => {
            event.preventDefault();
            this.#promiseResult(resultRemove);
        }
    }
    #updateHandler() {
        document.getElementById("update-employee").onclick = event => {
            event.preventDefault();
            this.#promiseResult(resultUpdate);
        }
    }

    handlerBtnClicked() {
        return new Promise(resolve => this.#promiseResult = resolve);
    }

    actionRemove(data) {
        return (confirm(`Do you want to remove employee ${data.name} (id = ${data.id})? \nPress OK or Cancel.`) == true)
    }
    actionUpdate(data) {
        document.getElementById('cover').hidden = false;
        this.#formElement.style.display = 'flex';
        //set current data
        this.#labelElement.innerHTML = this.#generateLabelText(data);
        this.#salaryElement.value = data.salary;
        this.#setCurrentDepartment(data.department);

        this.#setUpdateHandlers(data);
        return new Promise(resolve => this.#dataObj = resolve);
    }

    #setUpdateHandlers(data) {
        this.#setUpdateHandlerSubmit(data);
        this.#setUpdateHandlerClose();
    }
    #setUpdateHandlerClose() {
        this.#closeBtn.onclick = event => {
            event.preventDefault();
            this.#hideForm();
            this.#dataObj(false);
        }
    }
    #hideForm() {
        document.getElementById('cover').hidden = true;
        this.#formElement.style.display = 'none';
    }

    #setUpdateHandlerSubmit(data) {
        this.#submitBtn.onclick = async event => {
            event.preventDefault();
            const formData = new FormData(document.getElementById(`${this.#parentId}-${FORM_ID}-form`));
            data.department = formData.get('department');
            data.salary = formData.get('salary');
            this.#hideForm();
            this.#dataObj(data);
        }
    }

    #setCurrentDepartment(department) {
        [...this.#departmentElement.options].find(o => {
            if (o.text == department) {
                o.selected = true;
            }
        })
    }
    #generateLabelText(employee) {
        return `<div>Do you want to update an employee:</div>
        <div id="label-employee-data">id = ${employee.id}: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${employee.name}, &nbsp; ${employee.birthYear} b.y.</div> `;
    }

    #setElements(parentId) {
        this.#labelElement = document.getElementById(`${parentId}-info`);
        this.#departmentElement = document.getElementById(`${parentId}-${DEPARTMENT_ID}`);
        this.#salaryElement = document.getElementById(`${parentId}-${SALARY_ID}`);
        this.#closeBtn = document.getElementById(`${parentId}-${CLOSE_BTN_ID}`);
        this.#submitBtn = document.getElementById(`${parentId}-${SUBMIT_BTN_ID}`);
    }

    #createForm(parentElement, parentId, paramObj) {
        parentElement.innerHTML =
            `<div class ="form-control above" id="${parentId}-${FORM_ID}">
        <button id="${parentId}-${CLOSE_BTN_ID}" class="closeX">X</button>
        <form id="${parentId}-${FORM_ID}-form">
            <label id="${parentId}-info"></label>
            <div class="row-data">
                <select id="${parentId}-${DEPARTMENT_ID}" name="department" required></select>
                <input type="number" id="${parentId}-${SALARY_ID}" name="salary" min="${paramObj.minSalary * 1000}" max="${paramObj.maxSalary * 1000}" placeholder="Input salary" required>
            </div>
            <div  class="row-data">
                <button type="sumbit" class="submit-btn" id="${parentId}-${SUBMIT_BTN_ID}">Submit</button>
            </div>
        </form>
        </div>`;
        this.#formElement = document.getElementById(`${parentId}-${FORM_ID}`);
        this.#formElement.style.display = 'none';
    }

    #setSelectOptions(parentId, paramObj) {
        setOptionItems(document.getElementById(`${parentId}-${DEPARTMENT_ID}`), paramObj.departments, 'Choose department');
    }
}