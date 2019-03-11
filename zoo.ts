class Zoo {
    public zooArray: Animal[] = []; //Creating Array which contains all animals

    // Triggered when button 'Feed all Animals' has pushed
    private _feedAnimal (): void {
        for (let i = 0; i < this.zooArray.length; i++) {
            document.getElementsByName('feed-button')[i].click()
        }
    }

    // Triggered when button 'Heal all Animals' has pushed
    private _healAnimal (): void {
        for (let animal in this.zooArray) {
            this.zooArray[animal]._currentHp = this.zooArray[animal]._maxHp;
            Refresh.refresh(this.zooArray[animal])
        }
    }
}
