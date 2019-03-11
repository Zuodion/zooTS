class Time {
    static hours: number = 8;
    static startTime () {
        let minutes: number = 0;
        setInterval(() => {
            let zeroHours: any = 0;
            let zeroMinutes: any = 0;
            minutes++;
            if (minutes > 59) { 
                minutes = 0; 
                Time.hours++;
            }
            if (Time.hours > 23) Time.hours = 0;
            if (Time.hours > 9) zeroHours = '';
            if (minutes > 9) zeroMinutes = '';
            document.getElementById('time')!.innerHTML = `Time in zoo: ${zeroHours}${Time.hours} : ${zeroMinutes}${minutes}`
        }, 1000)
    }
}
