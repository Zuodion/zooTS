abstract class Animal {
    abstract _species: string;
    public _name: string;
    public _age: number;
    public _maxHp: number;
    public _currentHp: number;
    public _maxSatiety: number;
    public _currentSatiety: number;
    public _id: string;
    public _tougness: number;
    private _status: string = 'none';
    constructor(name: string, age: number, toughness: number) {
        this._tougness = toughness;
        this._name = name;
        this._age = age;
        this._maxHp = 100 * toughness;
        this._currentHp = this._maxHp
        this._maxSatiety = 75 * toughness;
        this._currentSatiety = this._maxSatiety;
        this._id = Main.idGenerator.generateId()
    }
    protected feed () {
        if (this.status === 'Sleeping' || this.status === 'Dead') return;
        this.status = 'Eating'
        setTimeout(() => this.status = 'none', 10000)
        if (this._currentSatiety < (this._maxSatiety - this._tougness * 5)) this._currentSatiety += this._tougness * 5;
        else (this._currentSatiety = this._maxSatiety)
    }

    public set status (value: string) {
        this._status = value;
    }
    public get status (): string {
        return this._status;
    }

    //public makesSound () { }
}