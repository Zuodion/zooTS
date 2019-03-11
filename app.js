"use strict";
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
var IdGenerator = /** @class */ (function () {
    function IdGenerator() {
        this._id = 0;
    }
    IdGenerator.prototype.generateId = function () {
        this._id += 1;
        return '_' + this._id;
    };
    return IdGenerator;
}());
var Refresh = /** @class */ (function () {
    function Refresh() {
    }
    //Refreshing animal's stats
    Refresh.refresh = function (data) {
        document.getElementById(data._id).innerHTML = ConverterAnimal.sheetAnimal(data);
    };
    return Refresh;
}());
var Time = /** @class */ (function () {
    function Time() {
    }
    Time.startTime = function () {
        var minutes = 0;
        setInterval(function () {
            var zeroHours = 0;
            var zeroMinutes = 0;
            minutes++;
            if (minutes > 59) {
                minutes = 0;
                Time.hours++;
            }
            if (Time.hours > 23)
                Time.hours = 0;
            if (Time.hours > 9)
                zeroHours = '';
            if (minutes > 9)
                zeroMinutes = '';
            document.getElementById('time').innerHTML = "Time in zoo: " + zeroHours + Time.hours + " : " + zeroMinutes + minutes;
        }, 1000);
    };
    Time.hours = 8;
    return Time;
}());
var VueController = /** @class */ (function () {
    function VueController(zoo) {
        this._zoo = zoo;
    }
    // Triggered when Main is initializing
    VueController.prototype.creatingVue = function () {
        //Creating select block on base in Animal list
        var select = document.getElementById('animalSpecies');
        for (var i = 0; i < Object.keys(AnimalList).length; i++) {
            var option = document.createElement('option');
            option.value = Object.keys(AnimalList)[i];
            option.innerText = Object.keys(AnimalList)[i];
            select.appendChild(option);
        }
        //Creating main div with animals
        this.mainDiv = document.createElement('div');
        document.body.appendChild(this.mainDiv);
    };
    // Triggered when button 'Add new Animal' has pushed
    VueController.prototype.addNewAnimal = function () {
        // Accept 'Name', 'Age' input and what species selected 
        var animalName = document.getElementsByTagName('input')[0].value;
        var animalAge = Number(document.getElementsByTagName('input')[1].value);
        var className = document.getElementsByTagName('select')[0].value;
        if (Number(animalName) || !Number(animalAge))
            return alert('Please enter the correct name and age'); //If accepted incorrect data
        var newAnimal = new window[className](animalName, animalAge); //Creating new animal
        this._zoo.zooArray.push(newAnimal); //Added new animal into zoo
        this.setInList(newAnimal); //Adding new animal into animal list in DOM
        Main.events.animalNeeds(newAnimal); //Added animal's needs
    };
    //Adding new animal into animal list in DOM
    VueController.prototype.setInList = function (data) {
        //Creating new animalDiv
        var animalDiv = document.createElement('div');
        this.mainDiv.appendChild(animalDiv);
        //Added animal's stats into animalDiv
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(ConverterAnimal.sheetAnimal(data)));
        div.id = data._id;
        animalDiv.appendChild(div);
        //Added button feed into animalDiv
        var feedButton = document.createElement('button');
        feedButton.name = 'feed-button';
        feedButton.appendChild(document.createTextNode("Feed the " + data._name));
        feedButton.setAttribute('onClick', "Main.vueController._zoo.zooArray[" + (this._zoo.zooArray.length - 1) + "].feed()"); // Adding event animal.feed() to button
        feedButton.addEventListener("click", function () { return Refresh.refresh(data); }); // Adding refreshing animal's stats after button's click
        animalDiv.appendChild(feedButton);
    };
    return VueController;
}());
var Zoo = /** @class */ (function () {
    function Zoo() {
        this.zooArray = []; //Creating Array which contains all animals
    }
    // Triggered when button 'Feed all Animals' has pushed
    Zoo.prototype._feedAnimal = function () {
        for (var i = 0; i < this.zooArray.length; i++) {
            document.getElementsByName('feed-button')[i].click();
        }
    };
    // Triggered when button 'Heal all Animals' has pushed
    Zoo.prototype._healAnimal = function () {
        for (var animal in this.zooArray) {
            this.zooArray[animal]._currentHp = this.zooArray[animal]._maxHp;
            Refresh.refresh(this.zooArray[animal]);
        }
    };
    return Zoo;
}());
var Animal = /** @class */ (function () {
    function Animal(name, age, toughness) {
        this._status = 'none';
        this._tougness = toughness;
        this._name = name;
        this._age = age;
        this._maxHp = 100 * toughness;
        this._currentHp = this._maxHp;
        this._maxSatiety = 75 * toughness;
        this._currentSatiety = this._maxSatiety;
        this._id = Main.idGenerator.generateId();
    }
    Animal.prototype.feed = function () {
        var _this = this;
        if (this._status === 'Sleeping' || this._status === 'Dead')
            return;
        this.status = 'Eating';
        setTimeout(function () { return _this.clearStatus(); }, 10000);
        if (this._currentSatiety < (this._maxSatiety - this._tougness * 5))
            this._currentSatiety += this._tougness * 5;
        else
            (this._currentSatiety = this._maxSatiety);
    };
    Animal.prototype.clearStatus = function () {
        this.status = 'none';
    };
    Animal.prototype.sleep = function () {
        this.status = 'Sleeping';
    };
    Animal.prototype.walk = function () {
        this.status = 'Walking';
    };
    Animal.prototype.starving = function () {
        this.status = 'Starving';
    };
    Animal.prototype.dead = function () {
        this.status = 'Dead';
    };
    Object.defineProperty(Animal.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    return Animal;
}());
var AnimalList;
(function (AnimalList) {
    AnimalList["Cow"] = "Cow";
    AnimalList["Giraffe"] = "Giraffe";
    AnimalList["Otter"] = "Otter";
})(AnimalList || (AnimalList = {}));
var ConverterAnimal = /** @class */ (function () {
    function ConverterAnimal() {
    }
    /**
     * @param {Object} animal
     * @returns {String}
     */
    ConverterAnimal.sheetAnimal = function (animal) {
        return "Name: " + animal._name + " Species: " + animal._species + " Age: " + animal._age + " Satiety: " + animal._currentSatiety + "/" + animal._maxSatiety + " Hp: " + animal._currentHp + "/" + animal._maxHp + " Status: " + animal.status;
    };
    return ConverterAnimal;
}());
var Cow = /** @class */ (function (_super) {
    __extends(Cow, _super);
    function Cow(name, age) {
        var _this = _super.call(this, name, age, 4) || this;
        _this._species = 'Cow';
        return _this;
    }
    return Cow;
}(Animal));
var Giraffe = /** @class */ (function (_super) {
    __extends(Giraffe, _super);
    function Giraffe(name, age) {
        var _this = _super.call(this, name, age, 5) || this;
        _this._species = 'Giraffe';
        return _this;
    }
    return Giraffe;
}(Animal));
var Otter = /** @class */ (function (_super) {
    __extends(Otter, _super);
    function Otter(name, age) {
        var _this = _super.call(this, name, age, 2) || this;
        _this._species = 'Otter';
        return _this;
    }
    return Otter;
}(Animal));
var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events(zoo) {
        var _this = _super.call(this) || this;
        _this._zoo = zoo;
        return _this;
    }
    Events.prototype.startEvent = function () {
    };
    //Adding events when animal has arrived
    Events.prototype.animalNeeds = function (animal) {
        this.animalStarving(animal);
        this.animalDying(animal);
        this.animalSleeping(animal);
        this.animalProcrastination(animal);
    };
    // Loop with auto generate time for Starving
    Events.prototype.animalStarving = function (animal) {
        var _this = this;
        var delay = ((Math.floor(Math.random() * 10) + 1) * animal._tougness * 1000);
        var starving = setInterval(function () {
            animal._currentSatiety -= animal._tougness;
            if (animal._currentSatiety < 0)
                animal._currentSatiety = 0;
            Refresh.refresh(animal);
            clearInterval(starving);
            _this.animalStarving(animal);
        }, delay);
    };
    Events.prototype.animalDying = function (animal) {
        setInterval(function () {
            if (animal._currentSatiety === 0) {
                animal.starving();
                animal._currentHp -= ((1 / animal._tougness) * 10);
                if (animal._currentHp < 0) {
                    animal._currentHp = 0;
                    animal.dead();
                }
                Refresh.refresh(animal);
            }
        }, 10000);
    };
    Events.prototype.animalSleeping = function (animal) {
        setInterval(function () {
            if (animal.status === 'Dead')
                return;
            var slept = false;
            if (Time.hours > 22 || Time.hours < 4) {
                if (!slept) {
                    animal.sleep();
                    Refresh.refresh(animal);
                    setTimeout(function () {
                        slept = true;
                        animal.clearStatus();
                        Refresh.refresh(animal);
                    }, 360000);
                }
            }
        }, 60000);
    };
    Events.prototype.animalProcrastination = function (animal) {
        setInterval(function () {
            if (animal.status === 'none')
                animal.walk();
            Refresh.refresh(animal);
        }, 1000);
    };
    return Events;
}(Zoo));
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.initialization = function () {
        var zoo = new Zoo();
        this.vueController = new VueController(zoo);
        this.vueController.creatingVue();
        this.idGenerator = new IdGenerator();
        this.events = new Events(zoo);
        this.events.startEvent();
        this.time = new Time();
        Time.startTime();
    };
    return Main;
}());
Main.initialization();