class VueController {
    public mainDiv: any;
    private readonly _zoo: Zoo;
    private readonly _accidents: Accidents
    private _loggingPlace: string;

    constructor(zoo: Zoo, accidents: Accidents, loggingPlace: string) {
        this._loggingPlace = loggingPlace
        this._accidents = accidents
        this._zoo = zoo;
    }

    // Triggered when Main is initializing
    public creatingVue (): void {
        let selectLogger = document.getElementById('select-logger')
        let options = ['ConsoleLogger', 'DomLogger']
        for (let i = 0; i < options.length; i++) {
            let loggerOption = document.createElement('option')
            loggerOption.value = options[i]
            loggerOption.innerText = options[i]
            selectLogger!.appendChild(loggerOption)
            if (localStorage.getItem('loggingPlace') === options[i]) loggerOption.selected = true
        }
        

        //Creating select block on base in Animal list
        let selectAnimal = document.getElementById('animalSpecies');
        for (let i = 0; i < Object.keys(AnimalList).length; i++) {
            let option = document.createElement('option')
            option.className = 'animal-choice'
            option.value = Object.keys(AnimalList)[i]
            option.innerText = Object.keys(AnimalList)[i]
            selectAnimal!.appendChild(option)
        }
        //Creating main div with animals
        this.mainDiv = document.createElement('div');
        this.mainDiv.className = 'animal-list'
        document.body.appendChild(this.mainDiv)
    }


    public changeLogging(value: string): void{
        localStorage.setItem('loggingPlace', value)
        this._loggingPlace = value
    }

    // Triggered when button 'Add new Animal' has pushed
    public addNewAnimal (): void {

        // Accept 'Name', 'Age' input and what species selected 
        let animalName: string = document.getElementsByTagName('input')[0].value;
        let animalAge: number = Number(document.getElementsByTagName('input')[1].value);
        let className: string = (<HTMLInputElement>document.getElementById('animalSpecies')).value;

        if (Number(animalName) || !Number(animalAge)) return alert('Please enter the correct name and age'); //If accepted incorrect data

        let newAnimal: Animal = new window[className](animalName, animalAge); //Creating new animal
        this._zoo.zooArray.push(newAnimal); //Added new animal into zoo
        this.setInList(newAnimal); //Adding new animal into animal list in DOM
        this._accidents.animalNeeds(newAnimal) //Added animal's needs
    }

    //Adding new animal into animal list in DOM
    public setInList (data: Animal): void {

        //Creating new animalDiv
        let animalDiv = document.createElement('div');
        animalDiv.className = 'animal'
        this.mainDiv.appendChild(animalDiv)

        //Added animal's stats into animalDiv
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(ConverterAnimal.sheetAnimal(data)));
        div.id = data._id;
        div.className = 'stats'
        animalDiv.appendChild(div);

        //Added button feed into animalDiv
        let feedButton = document.createElement('button')
        feedButton.name = 'feed-button'
        feedButton.className = 'feed-button'
        feedButton.appendChild(document.createTextNode(`Feed the ${data._name}`));
        feedButton.setAttribute('onClick', `main._vueController._zoo.zooArray[${this._zoo.zooArray.length - 1}].feed()`)// Adding event animal.feed() to button
        feedButton.addEventListener("click", () => Refresh.refresh(data))// Adding refreshing animal's stats after button's click
        animalDiv.appendChild(feedButton);
    }
}
