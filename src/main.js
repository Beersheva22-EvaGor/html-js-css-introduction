import EmpolyeesService from "./service/EmployeesService.js";
import ApplicationBar from "./ui/ApplicationBar.js";
import DataGrid from "./ui/DataGrid.js";
import EmployeeForm from "./ui/EmployeeForm.js";
import { getRandomEmployee } from "./util/random.js";
import AgeStatisticsForm from "./ui/AgeStatisticsForm.js";
//employee model
//{id: number of 9 digits, name: string, birthYear: number,
// gender: female | male, salary: number, department: QA, Development, Audit, Accounting, Management}
const sections = [
    { title: "Empolyees", id: "employees-table-place" },
    { title: "Add Employee", id: "employees-form-place" },
    { title: "Statistics", id: "statistics-place" }
];
const employeeColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'birthYear', headerName: 'Birth Year' },
    { field: 'gender', headerName: 'Gender' },
    { field: 'salary', headerName: 'Salary (ILS)' },
    { field: 'department', headerName: 'Department' }
]
const statisticsColumns = employeeColumns.slice(2, 3).concat(employeeColumns.slice(1, 2).concat(employeeColumns.slice(3)));
//flexibility due to the ability to add more functions
const callbackFunctions = [generateAgeStatistics];
const employeesService = new EmpolyeesService();
const menu = new ApplicationBar("menu-place", sections);
menu.addHandlerStatistics(callbackFunctions);


const employeeForm = new EmployeeForm("employees-form-place");
const employeeTable = new DataGrid("employees-table-place", employeeColumns);
const statisticsTable = new DataGrid("statistics-place", statisticsColumns);
const ageStatisticsForm = new AgeStatisticsForm("statistics-place");

async function generateAgeStatistics() {
    while (true) {
        const fromFormData = await ageStatisticsForm.getDataFromForm();
        const { minAge, maxAge } = fromFormData;
        const employeesFilteredData = await employeesService.getAgeStatistics(minAge, maxAge);
        statisticsTable.fillData(employeesFilteredData);
    }
}

async function run() {
    while (true) {
        await employeeForm.buttonHasPressed();
        let newEmployee = getRandomEmployee();
        employeeTable.insertRow(newEmployee);
        employeesService.addEmployee(newEmployee);
    }
}


run();
generateAgeStatistics();