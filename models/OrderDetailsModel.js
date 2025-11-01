export default class OrderDetailsModel{
    constructor(orderId, itemId, qty ) {
        this._orderId = orderId;
        this._itemId =itemId;
        this._qty = qty;

    }


    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }
}