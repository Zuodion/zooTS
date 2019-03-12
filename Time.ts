class Time {
    public hours: number;
    constructor() {
        this.hours = 8
    }
    public startTime (): void {
        let minutes: number = 0;
        setInterval(() => {
            let zeroHours: any = 0;
            let zeroMinutes: any = 0;
            minutes++;
            if (minutes > 59) {
                minutes = 0;
                this.hours++;
            }
            if (this.hours > 23) this.hours = 0;
            if (this.hours > 9) zeroHours = '';
            if (minutes > 9) zeroMinutes = '';
            document.getElementById('time')!.innerHTML = `Time in zoo: ${zeroHours}${this.hours} : ${zeroMinutes}${minutes}`
        }, 1000)
    }
}
