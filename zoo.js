var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var zooArray = [];
var mainDiv;
var IdGeneratorModel = /** @class */ (function () {
    function IdGeneratorModel() {
        this._id = 0;
    }
    IdGeneratorModel.prototype.generateId = function () {
        this._id += 1;
        return '_' + this._id;
    };
    return IdGeneratorModel;
}());
var idGenerator = new IdGeneratorModel();
var Zoo = /** @class */ (function () {
    function Zoo() {
    }
    Zoo.prototype._feedAnimal = function (animal) {
        animal.feed();
        refresh(animal);
    };
    Zoo.prototype._healAnimal = function (animal) {
        animal._hp = 100;
        refresh(animal);
    };
    return Zoo;
}());
var Animal = /** @class */ (function () {
    function Animal(name, age, toughness) {
        this._name = name;
        this._age = age;
        this._hp = 100 * toughness;
        this._satiety = 75 * toughness;
        this._id = idGenerator.generateId();
    }
    Animal.prototype.feed = function () { };
    Animal.prototype.sleep = function () { };
    return Animal;
}());
var Cow = /** @class */ (function (_super) {
    __extends(Cow, _super);
    function Cow(name, age) {
        var _this = _super.call(this, name, age, 4) || this;
        _this._species = 'Cow';
        return _this;
    }
    Cow.prototype.feed = function () {
        this._satiety += 30;
        refresh(this);
    };
    Cow.prototype.sleep = function () {
        console.log(this._name + " is sleeping");
    };
    return Cow;
}(Animal));
var Giraffe = /** @class */ (function (_super) {
    __extends(Giraffe, _super);
    function Giraffe(name, age) {
        var _this = _super.call(this, name, age, 5) || this;
        _this._species = 'Giraffe';
        return _this;
    }
    Giraffe.prototype.feed = function () {
        this._satiety += 20;
        refresh(this);
    };
    Giraffe.prototype.sleep = function () {
        console.log(this._name + " is sleeping");
    };
    return Giraffe;
}(Animal));
var Otter = /** @class */ (function (_super) {
    __extends(Otter, _super);
    function Otter(name, age) {
        var _this = _super.call(this, name, age, 2) || this;
        _this._species = 'Otter';
        return _this;
    }
    Otter.prototype.feed = function () {
        this._satiety += 10;
        refresh(this);
    };
    Otter.prototype.sleep = function () {
        console.log(this._name + " is sleeping");
    };
    return Otter;
}(Animal));
function addNewAnimal() {
    var animalName = document.getElementsByTagName('input')[0].value;
    var className = document.getElementsByTagName('select')[0].value;
    var animalAge = document.getElementsByTagName('input')[1].value;
    if (Number(animalName) || !Number(animalAge))
        return alert('Please enter the correct name and age'); //опрацьовує помилки з типами даних
    if (zooArray.find(function (animal) { return animal._name === animalName; }))
        return alert('This name is already taken');
    var newObject = new this[className](animalName, animalAge);
    zooArray.push(newObject);
    setInList(zooArray); //TODO можливо можна замутить так щоб воно добавляло в список нову тварину а не переоновлювало весь
}
function setInList(data) {
    mainDiv = document.createElement('div');
    document.body.appendChild(mainDiv);
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var animal = data_1[_i];
        var animalDiv = document.createElement('div');
        mainDiv.appendChild(animalDiv);
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(sheetAnimal(animal)));
        div.id = animal._id;
        animalDiv.appendChild(div);
        var button = document.createElement('button');
        button.appendChild(document.createTextNode("Feed the " + animal._name));
        button.setAttribute('onClick', "zooArray[" + (zooArray.length - 1) + "].feed()");
        animalDiv.appendChild(button);
    }
}
function sheetAnimal(data) {
    return "Name: " + data._name + " Species: " + data._species + " Age: " + data._age + " Satiety: " + data._satiety + " Hp: " + data._hp;
}
function refresh(data) {
    document.getElementById(data._id).innerHTML = sheetAnimal(data);
}
