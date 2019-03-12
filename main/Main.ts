class Main {
    private _idGenerator: IdGenerator;
    private _vueController: VueController;
    private _accidents: Accidents;
    private _time: Time;
    private _logger: ILogger;
    private zoo: Zoo
    constructor(){
        this._idGenerator = new IdGenerator()
        this._logger = new DomLogger()
        this.zoo = new Zoo();
        this._time = new Time()
        this._accidents = new Accidents(this.zoo, this._logger, this._time)
        this._vueController = new VueController(this.zoo, this._accidents);
    }
    initialization (): void {
        this._time.startTime()
        this._vueController.creatingVue()
        this._accidents.startAccidents()
    }
    public get idGenerator(): string{
        return this._idGenerator.generateId()
    }
}

interface Window {
    [key: string]: any; //To avoid errors with using Window
}
let main = new Main()
main.initialization()
