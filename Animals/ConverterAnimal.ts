class ConverterAnimal {

    /**
     * @param {Object} animal
     * @returns {String}
     */
    public static sheetAnimal (animal: Animal): string {
        return `Name: ${animal._name} Species: ${animal._species} Age: ${animal._age} Satiety: ${animal._currentSatiety}/${animal._maxSatiety} Hp: ${animal._currentHp}/${animal._maxHp} Status: ${animal.status}`
    }
}
