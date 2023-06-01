export default class DataGrid {
    #tBodyElement
    #keys
    #parentId
    constructor(parentId, columns) {
        //columns - array of objects {field: <name of key>,
        // headerName: <column name>}
        this.#keys = columns.map(c => c.field);
        this.#buildTableHeader(parentId, columns.map(c => c.headerName));
        this.#parentId = parentId;
    }
    fillData(rowsData) {
        this.#tBodyElement.innerHTML = rowsData.map(rd => this.#getRow(rd)).join('');
    }
    #getRow(obj) {
        return `<tr>
                   ${this.#keys.map(key => `<td>${obj[key]}</td>` ).join('')}
                 </tr>  `
    }
    insertRow(obj) {
        this.#tBodyElement.innerHTML += this.#getRow(obj);
    }
    
    #buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `<div class="wrap-table">
            <table>
            <thead >
               <tr style="position:fixed; width:100%">
                   ${columnNames.map(headerName => 
                    `<th>${headerName}</th>`).join('')}
               </tr>
               <tr style="visibility: hidden">${columnNames.map(headerName => `<th>${headerName}</th>`).join('')}</tr>
            </thead>
            <tbody id="${parentId}-table" >
            <tr></tr>
            </tbody>
          </table>
          </div>`
        this.#tBodyElement = document.getElementById(parentId + "-table");

    
    }
    // addHeaderHandler(headerName, func){
    //     document.getElementById(`${this.#parentId}-${headerName}`).onclick = ()=> func(headerName);
    // }
}
