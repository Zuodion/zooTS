class Main {
    public static vueController: VueController;
    public static idGenerator: IdGenerator;
    public static accidents: Accidents;
    public static time: Time;
    static initialization (): void {
        let zoo: Zoo = new Zoo();
        this.vueController = new VueController(zoo);
        this.vueController.creatingVue()
        this.idGenerator = new IdGenerator();
        this.accidents = new Accidents(zoo)
        this.accidents.startEvent()
        this.time = new Time()
        Time.startTime()
    }
}

interface Window {
    [key: string]: any; //To avoid errors with using Window
}

Main.initialization()
