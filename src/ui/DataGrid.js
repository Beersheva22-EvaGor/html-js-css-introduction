export default class DataGrid {
    #tBodyElement
    #keys
    #parentId
    #rowIndex
    #selectedRow
    #promiseResultData
    #columns
    constructor(parentId, columns) {
        this.#columns = columns;
        this.#keys = columns.map(c => c.field);
        this.#buildTableHeader(parentId, columns.map(c => c.headerName));
        this.#parentId = parentId;
        this.#rowIndex = 0;
    }
    fillData(rowsData) {
        this.#rowIndex = 0;
        this.#tBodyElement.innerHTML = '';
        rowsData.forEach(rd => this.insertRow(rd));
    }

    insertRow(obj) {
        const rowElement = document.createElement('tr');
        rowElement.id = `${this.#parentId}-row${++this.#rowIndex}`;
        rowElement.innerHTML = `${this.#keys.map(key => `<td>${obj[key]}</td>`).join('')}`;
        this.#tBodyElement.append(rowElement);

        this.#addHandlerCurrentRow(rowElement);
    }

    #addHandlerCurrentRow(rowElement) {
        const dataRow = {};
        const data = {};
        rowElement.onclick = () => { 
            const cells = rowElement.cells;
            this.#keys.forEach((key, index) => dataRow[key] = cells[index].innerHTML);
            data.employee = dataRow;
            data.rowElement = rowElement;
            this.#selectRow(rowElement); 
            this.#promiseResultData=data; 
        }
    }

    getDataRow(){
        return new Promise(resolve => resolve(this.#promiseResultData));
    }

    #selectRow(rowElement){
       if (this.#selectedRow && this.#selectedRow != rowElement){
        this.#selectedRow.classList.remove('selected');
       }
       this.#selectedRow = rowElement;
        if (rowElement.classList.contains('selected')){
            rowElement.classList.remove('selected');
        } else{
            rowElement.classList.add('selected');
        }
    }

    #buildTableHeader(parentId, columnNames) {
        const tableSectionElement = document.getElementById(parentId);
        tableSectionElement.innerHTML =
            `<div class="wrap-table">
            <table>
            <thead >
               <tr style="position:fixed; width:100%">
                   ${columnNames.map(headerName =>
                `<th>${headerName} 
                <div class="header-order-buttons">
                    <button id="${parentId}-${this.#getKeyByHeaderName(headerName)}-asc">&#8681;</button>
                    <button id="${parentId}-${this.#getKeyByHeaderName(headerName)}-desc">&#8679;</button>
                </div>
                </th>`).join('')}
               </tr>
               <tr style="visibility: hidden">${columnNames.map(headerName => `<th>${headerName}
               </th>`).join('')}</tr>
            </thead>
            <tbody id="${parentId}-table" >
            <tr></tr>
            </tbody>
          </table>
          </div>`
        this.#tBodyElement = document.getElementById(parentId + "-table");
    }

    #getKeyByHeaderName(headerName){
        return this.#columns.find(r=> r.headerName == headerName).field;
    }

    removeRow(rowElement) {
        rowElement.remove();
        this.#promiseResultData = undefined;
    }

    updateRow(rowElement, newObj){
        rowElement.innerHTML = `${this.#keys.map(key => `<td>${newObj[key]}</td>`).join('')}`;
    }
}


