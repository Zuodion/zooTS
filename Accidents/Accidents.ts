class Accidents {
    private readonly _zoo: Zoo;
    private readonly _logger: ILogger;
    private readonly _time: Time

    constructor(zoo: Zoo, logger: ILogger, time: Time) {
        this._zoo = zoo;
        this._logger = logger;
        this._time = time

    }

    startAccidents () {
        this.makeSounds()
    }

    //Adding needs when animal has arrived
    public animalNeeds (animal: Animal) {
        this.animalStarving(animal)
        this.animalSleeping(animal)
        this.observer(animal)
    }

    // Loop with auto generate time for Starving
    private animalStarving (animal: Animal): void {
        let delay: number = ((Math.floor(Math.random() * 10) + 1) * animal._tougness * 1000)
        let starving: number = setInterval(() => {
            animal._currentSatiety -= animal._tougness;
            if (animal._currentSatiety < 0) {
                animal._currentSatiety = 0;
                this.animalDying(animal)
            }
            Refresh.refresh(animal)
            clearInterval(starving)
            this.animalStarving(animal)
        }, delay)
    }

    private animalDying (animal: Animal): void {
        if (animal._currentSatiety === 0) {
            animal.status = 'Starving';
            animal._currentHp -= ((1 / animal._tougness) * 10);
            if (animal._currentHp < 0) {
                animal._currentHp = 0;
                animal.status = 'Dead';
            }
            Refresh.refresh(animal)
        } else {
            animal.status = 'none'
        }
    }

    private animalSleeping (animal: Animal): void {
        setInterval(() => {
            if (animal.status === 'Dead') return;
            let slept = false;
            if (this._time.hours > 22 || this._time.hours < 4) {
                if (!slept) {
                    animal.status = 'Sleeping'
                    Refresh.refresh(animal)
                    setTimeout(() => {
                        slept = true;
                        animal.status = 'none';
                        Refresh.refresh(animal)
                    }, 360000)
                }
            }
        }, 60000)

    }
    private observer (animal: Animal): void {
        setInterval(() => {
            if (animal.status === 'none') {
                animal.status = 'Walking'
                Refresh.refresh(animal)
            }
        }, 1000)
    }

    private makeSounds (): void {
        let delay: number = ((Math.floor(Math.random() * 10) + 1) * 5000)
        let noises = setInterval(() => {
            let animal = this.randomAnimal()
            if (animal) {
                this._logger.topMessage(`A ${animal._name} say: '${animal.noise[Math.floor(Math.random() * animal.noise.length)]}'.`)
            }
            clearInterval(noises)
            this.makeSounds()
        }, delay)
    }

    private randomAnimal (): Animal {
        return this._zoo.zooArray[Math.floor(Math.random() * this._zoo.zooArray.length)];
    }
}
