
let zooArray: any = []
let mainDiv: any;
let created = false

class IdGeneratorModel {
    _id: number;
    constructor() {
        this._id = 0;
    }

    generateId () {
        this._id += 1;
        return '_' + this._id;
    }
}
const idGenerator = new IdGeneratorModel();

class Zoo {
    _feedAnimal (animal: Animal): void {
        animal.feed();
        refresh(animal)
    }
    _healAnimal (animal: Animal): void {
        animal._hp = 100;
        refresh(animal)
    }
}



abstract class Animal {
    _species!: string;
    _name: string;
    _age: number;
    _hp: number;
    _satiety: number;
    _id: string;
    constructor(name: string, age: number, toughness: number) {
        this._name = name;
        this._age = age;
        this._hp = 100 * toughness;
        this._satiety = 75 * toughness;
        this._id = idGenerator.generateId()
    }
    feed (): void { }
    sleep (): void { }
}
class Cow extends Animal {
    constructor(name: string, age: number) {
        super(name, age, 4);
        this._species = 'Cow';
    }
    feed () {
        this._satiety += 30;
        refresh(this)
    }
    sleep () {
        console.log(`${this._name} is sleeping`)
    }
}

class Giraffe extends Animal {
    constructor(name: string, age: number) {
        super(name, age, 5);
        this._species = 'Giraffe';
    }
    feed () {
        this._satiety += 20;
        refresh(this)
    }
    sleep () {
        console.log(`${this._name} is sleeping`)
    }
}

class Otter extends Animal {
    constructor(name: string, age: number) {
        super(name, age, 2);
        this._species = 'Otter';
    }
    feed () {
        this._satiety += 10;
        refresh(this)
    }
    sleep () {
        console.log(`${this._name} is sleeping`)
    }
}


interface Window {
    [key: string]: any;//потрібно для того щоб не було помилок
}

function addNewAnimal () {
    var animalName = document.getElementsByTagName('input')[0].value;
    var className = document.getElementsByTagName('select')[0].value;
    var animalAge = document.getElementsByTagName('input')[1].value;
    if (Number(animalName) || !Number(animalAge)) return alert('Please enter the correct name and age'); //опрацьовує помилки з типами даних
    if (zooArray.find((animal: Animal) => animal._name === animalName)) return alert('This name is already taken')
    let newObject = new this[className](animalName, animalAge);
    zooArray.push(newObject);
    setInList(zooArray); //TODO: можливо можна замутить так щоб воно добавляло в список нову тварину а не переоновлювало весь
}

function setInList (data: any): void {
    if (created) mainDiv.remove()
    mainDiv = document.createElement('div');
    document.body.appendChild(mainDiv);
    for (let animal of data) {

        let animalDiv = document.createElement('div');
        mainDiv.appendChild(animalDiv)

        var div = document.createElement('div');
        div.appendChild(document.createTextNode(sheetAnimal(animal)));
        div.id = animal._id;
        animalDiv.appendChild(div);

        var button = document.createElement('button')
        button.appendChild(document.createTextNode(`Feed the ${animal._name}`));
        button.setAttribute('onClick', `zooArray[${zooArray.length-1}].feed()`)
        animalDiv.appendChild(button);

    }
    created = true;
}

function sheetAnimal (data: Animal) {
    return `Name: ${data._name} Species: ${data._species} Age: ${data._age} Satiety: ${data._satiety} Hp: ${data._hp}`
}

function refresh (data: Animal) {
    document.getElementById(data._id)!.innerHTML = sheetAnimal(data)
}
