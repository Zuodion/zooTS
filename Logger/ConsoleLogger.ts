class ConsoleLogger implements ILogger{
    topMessage(message: string): void {
        console.log(message)
    }
}