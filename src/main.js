import CompanyService from "./service/CompanyServiceREST.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import FilteredDataGrid from "./ui/FilteredDataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import statisticsConfig from "./config/statistics-config.json" assert{type: 'json'}
import employeesConfig from "./config/employees-config.json" assert{type: 'json'}
import { range, filterByStr } from "./util/number-functions.js";
import Spinner from "./ui/Spinner.js";
import EmployeeTableUpdate from "./ui/EmployeeTableUpdate.js";
import FindForm from "./ui/FindForm.js";

const N_EMPLOYEES = 50;
const resultRemove = 'remove';
const refreshPressed ='refresh';
const sections = [
    { title: "Employees", id: "employees-table" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];
const { minSalary, maxSalary, departments, minYear, maxYear } = employeesConfig;
const { age, salary } = statisticsConfig;
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

const spinner = new Spinner('spinner-place');
const menu = new ApplicationBar("menu-place", sections, menuHandler);
const companyService = new CompanyService();
const employeeForm = new EmployeeForm("employees-form-place", employeesConfig);
const employeeTable = new FilteredDataGrid("employees-table-place", employeeColumns, true);
const ageStatistics = new FilteredDataGrid("age-statistics-place", statisticsColumns, false);
const salaryStatistics = new FilteredDataGrid("salary-statistics-place", statisticsColumns, false);
const updateEmployees = new EmployeeTableUpdate("employees-update", employeesConfig);
const findForm = new FindForm('find-form-place', employeeColumns.map(f => f.field));


employeeForm.addHandler(async (employee) => {
    await action(companyService.addEmployee.bind(companyService, employee));
})

async function menuHandler(index) {
    switch (index) {
        case 0: {
            const employees = await action(companyService.getAllEmployees.bind(companyService));
            employeeTable.fillData(employees);
            break;
        }
        case 2: {
            const ageStatisticsData = await action(companyService.getStatistics.bind(companyService, age.field, age.interval));
            ageStatistics.fillData(ageStatisticsData);
            const salaryStatisticsData = await action(companyService.getStatistics.bind(companyService, salary.field, salary.interval));
            salaryStatistics.fillData(salaryStatisticsData)
            break;
        }
    }
}

async function action(serviceFn) {
    spinner.start();
    const res = await serviceFn();
    spinner.stop();
    return res;
}

 //Add employees on start
// function createRandomEmployees() {
//     const promises = range(0, N_EMPLOYEES).map(() => companyService.addEmployee(getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments)));
//     return Promise.all(promises);
// }
// action(createRandomEmployees);

async function awaitBtnUpdateClicked() {
    while (true) {
        const operation = await updateEmployees.handlerBtnClicked();
        const tableReply = await employeeTable.getDataRow();
        if (tableReply != undefined){
            const { employee, rowElement } = tableReply;
            if (operation == resultRemove) {
                if (updateEmployees.actionRemove(employee)) {
                    const dbResult = await action(companyService.removeEmployee.bind(companyService, employee.id));
                    console.log(dbResult);
                    employeeTable.removeRow(rowElement);
                }
            } else {
                let formAnswer = await updateEmployees.actionUpdate(employee);
                if (formAnswer != false){
                    const dbResult = await action(companyService.updateEmployee.bind(companyService, formAnswer));
                    console.log(dbResult);
                    employeeTable.updateRow(rowElement, formAnswer);
                } 
            }
        }
    }
}

awaitBtnUpdateClicked();

async function getFindRequest(){
    while(true){
        const request = await findForm.getFindDataPromise();
        if (request !=refreshPressed){
            const {field, value} = request;
            const filteredData = filterByStr(employeeTable.getTableData(),field, value);
            employeeTable.fillData(filteredData);
        } else {
            // refresh from DB
            const employees = await action(companyService.getAllEmployees.bind(companyService));
            employeeTable.fillData(employees);
        }
    }
}

getFindRequest();
