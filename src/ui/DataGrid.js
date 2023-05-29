export default class DataGrid {
    #tBodyElement
    #keys
    constructor(parentId, columns) {
        //columns - array of objects {field: <name of key>, headerName: <alias for column>}
        this.#keys = columns.map(c => c.field);
        this.#buildTableHeader(parentId, columns.map(c=> c.headerName));

    }
    fillData(rowsData){
        let keys = this.#keys;
        this.#tBodyElement.innerHTML = rowsData.map(row => "<tr>" + keys.map(key => `<td> ${row[key]} </td>`).join('') + "</tr>").join('\n');
    }

    #buildTableHeader(parentId, columnNames){
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML = 
        `<table>
            <thead>
                <tr>
                ${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}
                </tr>
                </thead>
                <tbody id = "${parentId}-table">
                </tbody
            </table>`
        this.#tBodyElement = document.getElementById(parentId +"-table");
    }
}
