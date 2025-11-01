export default class OrderModel{
    constructor(id,date,total,cusId) {
        this._id = id;
        this._date = date;
        this._total = total;
        this._cusId = cusId;
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get cusId() {
        return this._cusId;
    }

    set cusId(value) {
        this._cusId = value;
    }
}