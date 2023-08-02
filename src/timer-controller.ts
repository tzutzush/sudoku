export class TimerController {
  private startTime = 0;
  private timer!: NodeJS.Timer;
  public clock: HTMLElement;
  public timerSection: HTMLElement;
  constructor() {
    this.timerSection = document.createElement("div");
    this.timerSection.classList.add("timer-section");
    this.clock = document.createElement("div");
    this.clock.classList.add("timer");
    this.timerSection.appendChild(this.clock);
  }

  private setTimer() {
    this.updateTimer();
    return setInterval(this.updateTimer.bind(this), 1000);
  }

  private updateTimer(): void {
    const currentTime = formatTime(Date.now() - this.startTime);
    this.clock.textContent = currentTime;
  }

  clearTimer() {
    clearInterval(this.timer);
  }

  updateState(startTime: number) {
    this.startTime = startTime;
    this.timer = this.setTimer();
    this.updateTimer();
  }
}

export function formatTime(milliSeconds: number): string {
  const seconds = Math.trunc(milliSeconds / 1000);
  const minutes = Math.trunc(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
