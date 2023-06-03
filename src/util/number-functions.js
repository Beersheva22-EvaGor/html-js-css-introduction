export function range(min, max) {
    return Array.from({ length: max - min })
        .map((__, index) => index + min)
}
export function count(array, field, interval) {
    return array.reduce((res, cur) => {
        const intervalNumber = Math.trunc(cur[field] / interval);
        res[intervalNumber] = res[intervalNumber] == undefined ? 1 :
            res[intervalNumber] + 1
        return res;
    }, {});
}
export function orderObjByField(obj, field, isAsc) {
    //return Object.values(obj).sort((e1, e2) => isAsc?(e2.field > e1.field ? 1 : -1) : (e1.field > e2.field ? 1 : -1));
    return Object.values(obj).sort((e1, e2) => compare(e1, e2, field, isAsc))
}
function compare(e1, e2, field, isAsc) {
    return isAsc ? (e2[field] > e1[field] ? 1 : -1) : (e1[field] > e2[field] ? 1 : -1);
}