import DataGrid from "./DataGrid.js";
import { orderObjByField } from "../util/number-functions.js";
export default class FilteredDataGrid extends DataGrid {
    #columns
    #objStoreData
    #keys
    constructor(parentId, columns, isFiltered) {
        super(parentId, columns);
        this.#objStoreData = {};
        this.#keys = columns.map(c => c.field);

        this.#columns = columns;
        if (!isFiltered) {
            this.#setFilteredBtnsVisible(parentId, this.#keys);
        }
        this.#addHeaderSortHandlers(parentId);
    }
    #addHeaderSortHandlers(parentId) {
        [...this.#keys].forEach(key => {
            const btns = [document.getElementById(`${parentId}-${key}-asc`),
                document.getElementById(`${parentId}-${key}-desc`)];
            [...btns].forEach(btn=>btn.onclick = (event) =>{
                event.preventDefault();
                let isAsc = false;
                if (btn.id.substring(btn.id.length -1 - 2).toLocaleLowerCase() == 'asc'){
                    isAsc=true;
                }
                this.fillData(orderObjByField(this.#objStoreData, key, isAsc));
            })
        });
    }

    getTableData(){
        return this.#objStoreData;
    }

    fillData(rowsData) {
        this.#objStoreData = {};
        super.fillData.bind(this, rowsData)();
        document.getElementById("summary").innerHTML = `Summary: ${Object.entries(this.#objStoreData).length} employees`;
    }
    insertRow(obj) {
        super.insertRow(obj);
        this.#objStoreData[obj[this.#keys[0]]] = obj;
    }
    #setFilteredBtnsVisible(parentId, keys) {
        [...keys].forEach(key => {
            document.getElementById(`${parentId}-${key}-asc`).style.display = 'none';
            document.getElementById(`${parentId}-${key}-desc`).style.display = 'none';
        });
    }
    removeRow(rowElement) {
        super.removeRow(rowElement)
        delete this.#objStoreData[rowElement.innerHTML.split('<td>')[1].replace('</td>', '')];
    }

    updateRow(rowElement, newObj) {
        super.updateRow(rowElement, newObj);
        this.#objStoreData[rowElement.innerHTML.split('<td>')[1].replace('</td>', '')] = newObj;
    }
}