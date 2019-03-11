class Accidents {
    private readonly _zoo: Zoo;
    constructor(zoo: Zoo) {
        this._zoo = zoo;
    }

    startEvent () {

    }

    //Adding needs when animal has arrived
    public animalNeeds (animal: Animal) {
        this.animalStarving(animal)
        this.animalSleeping(animal)
        this.observer(animal)
    }

    // Loop with auto generate time for Starving
    private animalStarving (animal: Animal): void {
        let delay: number = ((Math.floor(Math.random() * 10) + 1) * animal._tougness * 10)
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
            if (Time.hours > 22 || Time.hours < 4) {
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
            }
            Refresh.refresh(animal);
        }, 1000)
    }

    /*/private randomAnimal (): Animal {
        return this._zoo.zooArray[Math.floor(Math.random() * this._zoo.zooArray.length)];
    }*/
}
