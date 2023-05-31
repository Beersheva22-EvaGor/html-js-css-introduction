import CompanyService from "./service/CompanyService.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import statisticsConfig from "./config/statistics-config.json" assert{type: 'json'}
import employeesConfig from "./config/employees-config.json" assert{type: 'json'}
import Spinner from "./ui/Spinner.js";

const N_EMPLOYEES = 50;
const sections = [
    { title: "Employees", id: "employees-table-place" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];
const { minSalary, maxSalary, departments, minYear, maxYear } = employeesConfig;
const { age, salary } = statisticsConfig;
const statisticsIndex = sections.findIndex(s => s.title == "Statistics");
const employeeColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'birthYear', headerName: 'Birth Year' },
    { field: 'gender', headerName: 'Gender' },
    { field: 'salary', headerName: 'Salary (ILS)' },
    { field: 'department', headerName: 'Department' }


];
const statisticsColumns = [
    { field: 'min', headerName: "Min value" },
    { field: 'max', headerName: "Max value" },
    { field: 'count', headerName: "Count" }
]

const menu = new ApplicationBar("menu-place", sections, menuHandler);
const companyService = new CompanyService();
const employeeForm = new EmployeeForm("employees-form-place");
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const ageStatistics = new DataGrid("age-statistics-place", statisticsColumns);
const salaryStatistics = new DataGrid("salary-statistics-place", statisticsColumns);
const spinner_age = new Spinner('age-statistics-place-table');
const spinner_salary = new Spinner('salary-statistics-place-table');
const spinner = new Spinner('employees-table-place-table');
const spinnerAddEmployee = new Spinner('button-id');
const spinnerGetAllEmployees = new Spinner('employees-table-place-table');

async function menuHandler(index) {
    if (index == statisticsIndex) {
        spinner_age.start();
        let stat = await companyService.getStatistics(age.field, age.interval)
        ageStatistics.fillData(stat);
        spinner_age.stop();
        spinner_salary.start();
        let data = await companyService.getStatistics(salary.field, salary.interval);
        salaryStatistics.fillData(data);
        spinner_salary.stop();

    }
}

let loaded = false;
async function init() {
    spinner.start();
    for (let i = 0; i < N_EMPLOYEES; i++) {
        const data = getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments);
        const employee = await companyService.addEmployee(data);
        employeeTable.insertRow(employee);
    };
    spinner.stop();
    loaded = true;
}

init();

async function run() {
    while (true) {
        await employeeForm.buttonHasPressed();
        const employee = getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments);
        spinnerAddEmployee.start();
        await companyService.addEmployee(employee);
        spinnerAddEmployee.stop();
        if (loaded){
            spinnerGetAllEmployees.start();
            const allEmployees = await companyService.getAllEmployees();
            employeeTable.fillData(allEmployees);
            spinnerGetAllEmployees.stop();
        }
    }
}
run();

