
export default class ItemModel{
    constructor(code, desc, price, qty) {
        this._code = code;
        this._desc = desc;
        this._price = price;
        this._qty = qty;

    }

    get code(){
        return this._code
    }

    set code(value){
        this._code = value;
    }

    get desc(){
        return this._desc;
    }

    set desc(value){
        this._desc = value;
    }


    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }


}