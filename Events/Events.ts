class Events extends Zoo {
    private readonly _zoo: Zoo;
    constructor(zoo: Zoo) {
        super();
        this._zoo = zoo;
    }

    startEvent () {

    }

    //Adding events when animal has arrived
    public animalNeeds (animal: Animal) {
        this.animalStarving(animal)
        this.animalDying(animal)
        this.animalSleeping(animal)
        this.animalProcrastination(animal)
    }

    // Loop with auto generate time for Starving
    private animalStarving (animal: Animal): void {
        let delay: number = ((Math.floor(Math.random() * 10) + 1) * animal._tougness * 1000)
        let starving: number = setInterval(() => {
            animal._currentSatiety -= animal._tougness;
            if (animal._currentSatiety < 0) animal._currentSatiety = 0;
            Refresh.refresh(animal)
            clearInterval(starving)
            this.animalStarving(animal)
        }, delay)

    }

    private animalDying (animal: Animal): void {
        setInterval(() => {
            if (animal._currentSatiety === 0) {
                animal.starving();
                animal._currentHp -= ((1 / animal._tougness) * 10);
                if (animal._currentHp < 0) {
                    animal._currentHp = 0;
                    animal.dead();
                }
                Refresh.refresh(animal)
            }
        }, 10000)
    }

    private animalSleeping (animal: Animal): void {
        setInterval(() => {
            if (animal.status === 'Dead') return;
            let slept = false;
            if (Time.hours > 22 || Time.hours < 4) {
                if (!slept) {
                    animal.sleep()
                    Refresh.refresh(animal)
                    setTimeout(() => {
                        slept = true;
                        animal.clearStatus()
                        Refresh.refresh(animal)
                    }, 360000)
                }
            }
        }, 60000)

    }
    private animalProcrastination (animal: Animal): void {
        setInterval(() => {
            if (animal.status === 'none') animal.walk()
            Refresh.refresh(animal);
        }, 1000)
    }

    /*/private randomAnimal (): Animal {
        return this._zoo.zooArray[Math.floor(Math.random() * this._zoo.zooArray.length)];
    }*/
}
