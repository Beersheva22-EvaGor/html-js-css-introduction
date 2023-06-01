import CompanyService from "./service/CompanyService.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import statisticsConfig from "./config/statistics-config.json" assert{type: 'json'}
import employeesConfig from "./config/employees-config.json" assert{type: 'json'}
import { range } from "./util/number-functions.js";
import Spinner from "./ui/Spinner.js";

const N_EMPLOYEES = 50;
const sections = [
    { title: "Employees", id: "employees-table-place" },
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
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const ageStatistics = new DataGrid("age-statistics-place", statisticsColumns);
const salaryStatistics = new DataGrid("salary-statistics-place", statisticsColumns);


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
function createRandomEmployees() {
    const promises = range(0, N_EMPLOYEES).map(() => companyService.addEmployee(getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments)));
    return Promise.all(promises);
}

action(createRandomEmployees);

// employeeTableFilter('ID');