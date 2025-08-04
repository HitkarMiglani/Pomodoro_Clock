class PomodoroTimer {
  constructor() {
    this.sessionTime = 25;
    this.breakTime = 5;
    this.timeLeft = this.sessionTime * 60;
    this.isRunning = false;
    this.isSession = true;
    this.timerId = null;
    this.sessionGoal = 4;

    this.initializeElements();
    this.setupEventListeners();
    this.updateDisplay();
    this.loadSessionCount();
  }

  initializeElements() {
    this.timeLeftDisplay = document.getElementById("time-left");
    this.timerLabel = document.getElementById("timer-label");
    this.sessionLength = document.getElementById("session-length");
    this.breakLength = document.getElementById("break-length");
    this.sessionDecrement = document.getElementById("session-decrement");
    this.sessionIncrement = document.getElementById("session-increment");
    this.breakDecrement = document.getElementById("break-decrement");
    this.breakIncrement = document.getElementById("break-increment");
    this.startStopBtn = document.getElementById("start-stop");
    this.resetBtn = document.getElementById("reset");
    this.container = document.querySelector(".container");
    this.timerDisplay = document.querySelector(".timer-display");
    this.sessionCountDisplay = document.getElementById("session-count");
    this.progressCircle = document.querySelector(".progress-circle");
    this.sessionGoalDisplay = document.getElementById("session-goal");
    this.goalDisplay = document.getElementById("goal-display");
    this.goalDecrement = document.getElementById("goal-decrement");
    this.goalIncrement = document.getElementById("goal-increment");
    this.progressFill = document.getElementById("progress-fill");
  }

  setupEventListeners() {
    this.sessionDecrement.addEventListener("click", () => {
      this.adjustTime("session", -1);
    });

    this.sessionIncrement.addEventListener("click", () => {
      this.adjustTime("session", 1);
    });

    this.breakDecrement.addEventListener("click", () => {
      this.adjustTime("break", -1);
    });

    this.breakIncrement.addEventListener("click", () => {
      this.adjustTime("break", 1);
    });

    this.startStopBtn.addEventListener("click", () => {
      this.toggleTimer();
    });

    this.resetBtn.addEventListener("click", () => {
      this.resetTimer();
    });

    this.goalDecrement.addEventListener("click", () => {
      this.adjustGoal(-1);
    });

    this.goalIncrement.addEventListener("click", () => {
      this.adjustGoal(1);
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        this.toggleTimer();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        this.resetTimer();
      }
    });
  }

  formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  updateDisplay() {
    this.timeLeftDisplay.textContent = this.formatTime(this.timeLeft);
    this.timerLabel.textContent = this.isSession
      ? "Session Time"
      : "Break Time";

    this.container.classList.toggle("break-mode", !this.isSession);
    this.container.classList.toggle("running", this.isRunning);

    if (this.timeLeft <= 10 && this.isRunning) {
      this.container.classList.add("low-time");
    } else {
      this.container.classList.remove("low-time");
    }

    this.startStopBtn.textContent = this.isRunning ? "Pause" : "Start";
    this.startStopBtn.classList.toggle("running", this.isRunning);

    this.sessionDecrement.disabled = this.isRunning;
    this.sessionIncrement.disabled = this.isRunning;
    this.breakDecrement.disabled = this.isRunning;
    this.breakIncrement.disabled = this.isRunning;
    this.goalDecrement.disabled = this.isRunning;
    this.goalIncrement.disabled = this.isRunning;

    this.updateProgressCircle();
  }

  adjustTime(type, amount) {
    if (this.isRunning) return;

    if (type === "session") {
      this.sessionTime = Math.max(1, this.sessionTime + amount);
      this.sessionLength.textContent = `${this.sessionTime} min`;

      if (this.isSession) {
        this.timeLeft = this.sessionTime * 60;
      }
    } else if (type === "break") {
      this.breakTime = Math.max(1, this.breakTime + amount);
      this.breakLength.textContent = `${this.breakTime} min`;

      if (!this.isSession) {
        this.timeLeft = this.breakTime * 60;
      }
    }

    this.updateDisplay();
  }

  adjustGoal(amount) {
    if (this.isRunning) return;

    this.sessionGoal = Math.max(0, this.sessionGoal + amount);
    this.sessionGoalDisplay.textContent = `${this.sessionGoal} sessions`;
    this.goalDisplay.textContent = this.sessionGoal;
    this.updateProgressDisplay();
  }

  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.isRunning = true;

    this.timerId = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        this.handleTimeUp();
      }

      this.updateDisplay();
    }, 1000);

    this.updateDisplay();
    this.showNotification(`${this.isSession ? "Session" : "Break"} started!`);
  }

  pauseTimer() {
    this.isRunning = false;

    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }

    this.updateDisplay();
    this.showNotification("Timer paused");
  }

  handleTimeUp() {
    clearInterval(this.timerId);
    this.timerId = null;
    this.isRunning = false;

    if (this.isSession) {
      this.isSession = false;
      this.timeLeft = this.breakTime * 60;
      this.showNotification("Session complete! Break time!");
      this.incrementSessionCount();
    } else {
      this.isSession = true;
      this.timeLeft = this.sessionTime * 60;
      this.showNotification("Break over! Ready for next session?");
    }

    setTimeout(() => {
      this.startTimer();
    }, 1000);

    this.playNotificationSound();
  }

  resetTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      clearInterval(this.sessionCount);
      this.timerId = null;
      this.sessionCount = 0;
      this.updateSessionCountDisplay();
    }

    this.isRunning = false;
    this.isSession = true;
    this.timeLeft = this.sessionTime * 60;

    this.updateDisplay();
    this.showNotification("Timer reset to session mode");
  }

  updateProgressCircle() {
    if (!this.progressCircle) return;

    const totalTime = this.isSession
      ? this.sessionTime * 60
      : this.breakTime * 60;
    const progress = (totalTime - this.timeLeft) / totalTime;
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - progress * circumference;

    this.progressCircle.style.strokeDasharray = circumference;
    this.progressCircle.style.strokeDashoffset = offset;
  }

  loadSessionCount() {
    const saved = localStorage.getItem("pomodoroSessions");
    this.sessionCount = saved ? parseInt(saved) : 0;
    this.updateSessionCountDisplay();

    if (this.sessionGoalDisplay) {
      this.sessionGoalDisplay.textContent = `${this.sessionGoal} sessions`;
    }
    if (this.goalDisplay) {
      this.goalDisplay.textContent = this.sessionGoal;
    }
  }

  incrementSessionCount() {
    this.sessionCount++;
    localStorage.setItem("pomodoroSessions", this.sessionCount);
    this.updateSessionCountDisplay();
  }

  updateSessionCountDisplay() {
    if (this.sessionCountDisplay) {
      this.sessionCountDisplay.textContent = this.sessionCount;
    }
    this.updateProgressDisplay();
  }

  updateProgressDisplay() {
    if (this.goalDisplay) {
      this.goalDisplay.textContent = this.sessionGoal;
    }

    if (this.progressFill) {
      const progressPercent = Math.min(
        (this.sessionCount / this.sessionGoal) * 100,
        100
      );
      this.progressFill.style.width = `${progressPercent}%`;

      if (this.sessionCount >= this.sessionGoal) {
        this.progressFill.classList.add("completed");
        this.showGoalCompletedNotification();
      } else {
        this.progressFill.classList.remove("completed");
      }
    }
  }

  showGoalCompletedNotification() {
    if (this.sessionCount === this.sessionGoal) {
      this.showNotification(
        `🎉 Goal achieved! Completed ${this.sessionGoal} sessions!`
      );
      setTimeout(() => {
        if (
          confirm(
            `Congratulations! You've completed ${this.sessionGoal} sessions. Would you like to set a new goal?`
          )
        ) {
          this.sessionGoal += 4;
          this.sessionGoalDisplay.textContent = `${this.sessionGoal} sessions`;
          this.updateProgressDisplay();
        }
      }, 1000);
    }
  }

  showNotification(message) {
    console.log(`Pomodoro: ${message}`);

    this.container.style.boxShadow = "0 0 20px rgba(0, 123, 255, 0.8)";
    setTimeout(() => {
      this.container.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
    }, 300);
  }

  playNotificationSound() {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        0.2,
        audioContext.currentTime + 0.1
      );
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log("Audio notification not available");
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PomodoroTimer();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    console.log("Pomodoro timer running in background");
  } else {
    console.log("Pomodoro timer back in focus");
  }
});
