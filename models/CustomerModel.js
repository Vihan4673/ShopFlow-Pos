export default class CustomerModel{
    constructor(id, name, address, telephone) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._telephone = telephone;

    }

    get id(){
        return this._id;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get telephone() {
        return this._telephone;
    }

    set telephone(value) {
        this._telephone = value;
    }

    set id(id){
        this._id = id;
    }
}