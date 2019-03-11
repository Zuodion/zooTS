class Main {
    public static vueController: VueController;
    public static idGenerator: any;
    public static events: Events;
    public static time: Time;
    static initialization () {
        let zoo: Zoo = new Zoo();
        this.vueController = new VueController(zoo);
        this.vueController.creatingVue()
        this.idGenerator = new IdGenerator();
        this.events = new Events(zoo)
        this.events.startEvent()
        this.time = new Time()
        Time.startTime()
    }
}

interface Window {
    [key: string]: any; //To avoid errors with using Window
}

Main.initialization()
