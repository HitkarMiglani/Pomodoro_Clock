# Pomodoro Clock - Assignment

A functional Pomodoro Timer built with vanilla JavaScript, CSS, and HTML that fulfills all the required user stories with additional features for enhanced user experience.

## ✅ User Stories Fulfilled

### User Story 1: Container Structure

- ✅ Created a div with class "container"
- ✅ Container is centered on the screen
- ✅ Container has height of 460px and width of 220px

### User Story 2: Container Styling

- ✅ Applied background color with transparency (rgba)
- ✅ Split container into two parts horizontally using flexbox

### User Story 3: Timer Display

- ✅ Upper part displays countdown time in MM:SS format
- ✅ Shows current session/break status

### User Story 4: Controls Section

- ✅ **Session Time Section**:
  - Increase/decrease with + and - buttons
  - Session time cannot go below 1 minute
  - Buttons disabled when timer is running
- ✅ **Break Time Section**:
  - Same functionality as session time
  - Independent time setting
- ✅ **Timer Buttons**:
  - Start button starts the countdown
  - Reset button resets the timer
  - Buttons are properly disabled when appropriate

### User Story 5: Automatic Cycling

- ✅ Session time automatically transitions to break time
- ✅ Break time automatically transitions back to session time
- ✅ Cycle continues until reset button is clicked
- ✅ Timer never stops until manually reset

## 🌟 Extra Features Added

### Enhanced User Experience

- **Visual Feedback**:

  - Different colors for session vs break time
  - Pulsing animation when timer is running
  - Low time warning (last 10 seconds)
  - Button hover effects and transitions

- **Audio Notifications**:

  - Sound alerts when sessions/breaks complete
  - Generated using Web Audio API

- **Keyboard Shortcuts**:

  - Spacebar: Start/Pause timer
  - R key: Reset timer

- **Smart Interface**:
  - Button text changes (Start → Pause)
  - Visual notifications with container highlighting
  - Responsive design elements

### Code Quality Features

- **Modern JavaScript**: ES6 class-based architecture
- **Clean Code**: Well-organized, commented code
- **Error Handling**: Graceful fallbacks for browser compatibility
- **Performance**: Efficient timer management and cleanup

## 🎨 Design Features

- **Modern UI**: Clean, professional appearance
- **Gradient Backgrounds**: Attractive color schemes
- **Smooth Animations**: CSS transitions and keyframes
- **Accessibility**: Focus states and keyboard navigation
- **Responsive**: Works on different screen sizes

## 🚀 How to Use

1. Open `index.html` in any modern web browser
2. Adjust session and break times using the + and - buttons
3. Click "Start" to begin your Pomodoro session
4. The timer will automatically alternate between work and break periods
5. Click "Reset" at any time to return to the initial state

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- All modern mobile browsers

## 🔧 Technical Implementation

- **HTML**: Semantic structure following user story requirements
- **CSS**: Modern styling with flexbox, gradients, and animations
- **JavaScript**: ES6 classes, event handling, and DOM manipulation
- **No external dependencies**: Pure vanilla web technologies

## 📋 Assignment Compliance

This Pomodoro Clock meets and exceeds all the specified user story requirements:

1. ✅ Container with exact dimensions (220px × 460px) and centering
2. ✅ Background with transparency and horizontal split layout
3. ✅ Upper section displaying countdown timer
4. ✅ Lower section with all required controls and functionality
5. ✅ Automatic session/break cycling that continues indefinitely

**Additional value**: Enhanced with professional-grade features while maintaining simplicity and meeting all core requirements.

---

**Perfect for demonstration of front-end development skills! 🍅⏱️**
