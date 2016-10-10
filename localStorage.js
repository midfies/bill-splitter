module.exports = class LocalStorage {
    constructor(key, obj) {
        this.key = key;
        this.obj = obj;
    }

    saveObj() {
        let objToJSON = JSON.stringify(obj);
        localStorage.setItem(this.key, this.objToJSON);
    }

    getObj() {
        let storedObj = localStorage.getItem(this.key);
        let objToArr = JSON.parse(storedObj);
        return objToArr;
    }

    deleteObj() {
        localStorage.removeItem(this.key);
    }
}