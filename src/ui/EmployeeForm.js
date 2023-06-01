const FORM_ID = 'form-id';
const DEPARTMENT_ID='department-id';
const NAME_ID = 'name-id';
const BIRTH_YEAR_ID = 'birth-year-id';
const SALARY_ID ='salary-id';
const NOTIFICATION_ID = 'notification-id';
const TEXT_INIT = 'Please fill the form';
const TEXT_NAME_WRONG = "*Name must contain name and surname without numbers/symbols, starts with uppercase";

export default class EmployeeForm {
    #dataObj
    #formElement
    #departmentElement
    #parentId
    #nameElement
    #notification

    constructor(parentId, paramObj) {   //paramObj={minAge, maxAge, minSalary, maxSalary, departments}
        this.#parentId = parentId;
        this.#fillForm(paramObj);
        this.#dataObj = { };    //name: 'Vasya', department: 'QA', salary: 5000, birthYear: 2000 
        this.#setElements();
        this.#setSelectOptions(paramObj);
        this.#setNameHandler();
    }
    
    #fillForm(paramObj) {
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML =
            `<form class="form-control" id="${this.#parentId}-${FORM_ID}">
            <label id="${this.#parentId}-${NOTIFICATION_ID}" style="color: black; font-size: 1rem;">${TEXT_INIT}</label>
            <div class="row-data">
                <input type="text" id="${this.#parentId}-${NAME_ID}" name="name" placeholder="Input name" required>
                <input type="number" id="${this.#parentId}-${BIRTH_YEAR_ID}" name="birth-year" required
                    min="${paramObj.minYear}" max="${paramObj.maxYear}" placeholder="Input year of birth">
            </div>
            <div class="row-data">
            <select id="${this.#parentId}-${DEPARTMENT_ID}" name="department" required></select>
            <input type="number" id="${this.#parentId}-${SALARY_ID}" name="salary" min="${paramObj.minSalary * 1000}" max="${paramObj.maxSalary * 1000}" placeholder="Input salary" required>
            </div>
            <div class="radio-group">
            <div class="radio-control">
            <input type="radio" name="gender" required unchecked value="female" id="${this.#parentId}-gender-female">
            <label for="${this.#parentId}-gender-female">female</label>
            </div>
            <divclass="radio-control">
            <input type="radio" name="gender" required unchecked value="male" id="${this.#parentId}-gender-male">
            <label for="${this.#parentId}-gender-male">male</label>
            </div>
            </div>
            <button type="sumbit" class="submit-btn">Submit</button>

            
            </form>`;

    }
    #setElements(){
        this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        this.#departmentElement = document.getElementById(`${this.#parentId}-${DEPARTMENT_ID}`);
        this.#nameElement = document.getElementById(`${this.#parentId}-${NAME_ID}`);
        this.#notification = document.getElementById(`${this.#parentId}-${NOTIFICATION_ID}`);
    }

    addHandler(submitFn) {
        this.#formElement.onsubmit = async event=>{
            event.preventDefault();
            const formData = new FormData(this.#formElement);
            this.#dataObj.gender = formData.get('gender');
            this.#dataObj.name = formData.get('name');
            this.#dataObj.salary = formData.get('salary');
            this.#dataObj.birthYear = formData.get('birth-year');
            this.#dataObj.department = formData.get('department');
            if (checkName(this.#dataObj.name)){
                await submitFn(this.#dataObj);
                this.#clearForm();
            } else {
                setStyleSpellCheckName(this.#nameElement, this.#notification, false);
            }
        };
    }
    #setNameHandler(){
        this.#nameElement.onclick = ()=> setStyleSpellCheckName(this.#nameElement, this.#notification, true);
    }
    #setSelectOptions(paramObj) {
        setOptionItems(this.#departmentElement, paramObj.departments, 'Choose department');
    }
    #clearForm(){
        this.#dataObj={};
        document.querySelectorAll('.form-control input').forEach(child =>{
            if (child.name == 'gender'){
                 child.checked = false;
            } else {
                child.value='';
            }
        });

        this.#departmentElement.value='';
    }

}

function checkName(str){
    return  /^[A-Z][^\d!@#\$%\^\&*\)\(+=._-]/.test(str);
}

function setOptionItems(element, options, placeholder) {
    element.innerHTML = `<option value hidden selected>--${placeholder}--</option>`;
    element.innerHTML += options.map(o => `<option value="${o}">${o}</option>`).join('')
}
function setStyleSpellCheckName(nameElement, notification, isOk){
    let color = 'red';
    let fontStyle = 'italic';
    let message = TEXT_NAME_WRONG;
    if (isOk){
        color = 'black';
        fontStyle = 'normal';
        message = TEXT_INIT;
    }
    nameElement.style.borderColor =color;
    notification.style.color = color;
    notification.style.fontStyle = fontStyle;
    notification.innerHTML = message;
}