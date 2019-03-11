class IdGenerator {
    private _id: number;
    constructor() {
        this._id = 0;
    }

    public generateId () {
        this._id += 1;
        return '_' + this._id;
    }
}

