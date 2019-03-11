class VueController {
    public mainDiv: any;
    private readonly _zoo: Zoo;

    constructor(zoo: Zoo) {
        this._zoo = zoo;
    }

    // Triggered when Main is initializing
    public creatingVue (): void {

        //Creating select block on base in Animal list
        let select = document.getElementById('animalSpecies');
        for (let i = 0; i < Object.keys(AnimalList).length; i++) {
            let option = document.createElement('option')
            option.value = Object.keys(AnimalList)[i]
            option.innerText = Object.keys(AnimalList)[i]
            select!.appendChild(option)
        }
        //Creating main div with animals
        this.mainDiv = document.createElement('div');
        document.body.appendChild(this.mainDiv)
    }

    // Triggered when button 'Add new Animal' has pushed
    public addNewAnimal (): void {

        // Accept 'Name', 'Age' input and what species selected 
        let animalName: string = document.getElementsByTagName('input')[0].value;
        let animalAge: number = Number(document.getElementsByTagName('input')[1].value);
        let className: string = document.getElementsByTagName('select')[0].value;

        if (Number(animalName) || !Number(animalAge)) return alert('Please enter the correct name and age'); //If accepted incorrect data

        let newAnimal: Animal = new window[className](animalName, animalAge); //Creating new animal
        this._zoo.zooArray.push(newAnimal); //Added new animal into zoo
        this.setInList(newAnimal); //Adding new animal into animal list in DOM
        Main.accidents.animalNeeds(newAnimal) //Added animal's needs
    }

    //Adding new animal into animal list in DOM
    public setInList (data: Animal): void {

        //Creating new animalDiv
        let animalDiv = document.createElement('div');
        this.mainDiv.appendChild(animalDiv)

        //Added animal's stats into animalDiv
        let div = document.createElement('div');
        div.appendChild(document.createTextNode(ConverterAnimal.sheetAnimal(data)));
        div.id = data._id;
        animalDiv.appendChild(div);

        //Added button feed into animalDiv
        let feedButton = document.createElement('button')
        feedButton.name = 'feed-button'
        feedButton.appendChild(document.createTextNode(`Feed the ${data._name}`));
        feedButton.setAttribute('onClick', `Main.vueController._zoo.zooArray[${this._zoo.zooArray.length - 1}].feed()`)// Adding event animal.feed() to button
        feedButton.addEventListener("click", () => Refresh.refresh(data))// Adding refreshing animal's stats after button's click
        animalDiv.appendChild(feedButton);
    }
}
