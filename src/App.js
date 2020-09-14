import React from 'react';
import './style.css';
import TimeControl from './settimer';
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerType: 'session',
      time: 1500,
      playng: false

    }
    this.startCountDown = this.startCountDown.bind(this);
  }

  decreaseBreak = (e) => {
    const {breakLength} = this.state;
    this.lengthControl('breakLength','session',e.target.value, breakLength);
  }
  increaseBreak = (e) => {
    const {breakLength} = this.state;
    this.lengthControl('breakLength','session',e.target.value, breakLength);
    
  }
  increaseSession = (e) => {
    const {sessionLength} = this.state;
    this.lengthControl('sessionLength','break',e.target.value, sessionLength);
  }
  decreaseSession = (e) => {
    const {sessionLength} = this.state;
    this.lengthControl('sessionLength','break',e.target.value, sessionLength);
  }
  lengthControl = (stateCHange,timertype, value, length) => {
    if (this.state.playng == true) return;
    if (this.state.timerType === timertype){
      if(value === 'decrease' && length != 1){
        this.setState({
          [stateCHange]: length - 1
        })
      }else if (value === 'increase' && length != 60){
        this.setState({
          [stateCHange]: length + 1
        })
      }
    } else {
      if(value === 'decrease' && length != 1){
        this.setState({
          [stateCHange]: length - 1,
          time: length * 60 - 60
        });
      }else if (value === 'increase' && length != 60){
        this.setState({
          [stateCHange]: length + 1,
          time: length * 60 + 60
        })
      }
    }
  }
  TimerControl = () =>{
    const {playng} = this.state;
    let control = playng == false ? ( 
      this.startCountDown(),
      this.setState({playng: true})) : (this.setState({
        playng: false
      }), clearInterval(this.start))
  }
  startCountDown = () => {
    this.start = setInterval(()=>{this.decreaseTimer();this.Control()}, 1000);
  }
  
  decreaseTimer = () => {
    const {time} = this.state;
    this.setState({
      time: time - 1
    })
  }
  

  clock = () => {
    let minutes = Math.floor(this.state.time / 60);
    let seconds = this.state.time % 60;
    seconds = seconds < 10 ? `0${seconds}`:seconds;
    minutes = minutes < 10 ? `0${minutes}`:minutes;
    return minutes + ':' + seconds;
  }
  Control = () => {
    const {time,timerType,breakLength,sessionLength} = this.state;
    if(time < 0){
      if (timerType == 'session')  {
        clearInterval(this.start);
         this.startCountDown();
         this.switchTime(breakLength, 'break');
      } else {clearInterval(this.start);
        this.startCountDown();
        this.switchTime(sessionLength, 'session');
      }
      this.audioPlay.play();
    }
  }
  switchTime = (leng, type) =>{
    this.setState({
      time: leng * 60,
      timerType: type
    })
  }
  Reset = () => {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerType: 'session',
      time: 1500,
      playng: false
    });
    clearInterval(this.start);
    this.audioPlay.pause();
    this.audioPlay.currentTime = 0;
  }
  render(){

    return(
      <div className='container'>
        <h1>Pomidoro Clock</h1>
        <TimeControl 
          decreaseBreak ={this.decreaseBreak}
          breakLength ={this.state.breakLength}
          increaseBreak={this.increaseBreak}
          sessionLength={this.state.sessionLength}
          increaseSession={this.increaseSession}
          decreaseSession={this.decreaseSession}
        />
        <div className='timer'>
          <div id="timer-label">
            {this.state.timerType}
          </div>
          <div id="time-left">
            {this.clock()}
          </div>
        </div>
        <div className="timer-control">
        <button id="start_stop" onClick={this.TimerControl}>
          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-play-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
          </svg>
          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-pause-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
          </svg>
        </button>
        <button id='reset' onClick={this.Reset}>
          <svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
          </svg>
        </button>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={(audio) => {
            this.audioPlay = audio;
          }}
        />
      </div>
    );
  }
}

export default App;
