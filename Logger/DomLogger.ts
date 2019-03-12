class DomLogger implements ILogger{
    topMessage(message: string): void {
        document.getElementById('logs')!.innerHTML = message
    }
}