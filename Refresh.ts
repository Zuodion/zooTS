class Refresh {

    //Refreshing animal's stats
    public static refresh (data: Animal): void {
        document.getElementById(data._id)!.innerHTML = ConverterAnimal.sheetAnimal(data)
    }
}