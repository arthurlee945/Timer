function CountDown(props) {
  let minutes = props.minutes;
  let seconds = props.seconds;
  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h1", { id: props.countdown, className: props.wiggle }, minutes < 10 ? "0" + minutes : minutes, ":", seconds < 10 ? "0" + seconds : seconds)));


}

class TimeSetter extends React.Component {
  render() {
    let time = this.props.time;
    return /*#__PURE__*/(
      React.createElement("div", { className: "setters" }, /*#__PURE__*/
      React.createElement("div", { id: "setterBtns" }, /*#__PURE__*/
      React.createElement("i", { className: "fas fa-chevron-up", id: this.props.incId, onClick: this.props.incClick }), /*#__PURE__*/
      React.createElement("p", { id: this.props.ogLength, className: "btnDetail" }, time < 10 ? "0" + time : time), /*#__PURE__*/
      React.createElement("i", { className: "fas fa-chevron-down", id: this.props.decId, onClick: this.props.decClick })), /*#__PURE__*/

      React.createElement("div", { className: "btnDes" }, /*#__PURE__*/
      React.createElement("p", { id: this.props.id }, this.props.name))));



  }}


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakTime: 5,
      sessionTime: 25,
      secondsLeft: 0,
      minutesLeft: 25,
      countStart: false,
      typeCounting: "Session",
      wiggle: false };

    this.incrementTime = this.incrementTime.bind(this);
    this.decrementTime = this.decrementTime.bind(this);
    this.countDownStarter = this.countDownStarter.bind(this);
    this.startCounting = this.startCounting.bind(this);
    this.resetBtn = this.resetBtn.bind(this);
    this.playBeep = this.playBeep.bind(this);
  }
  componentDidMount() {
    this.setState({ minutesLeft: this.state.sessionTime });
  }
  componentWillUpdate() {
    if (this.state.typeCounting == "Session" && this.state.minutesLeft == 0 && this.state.secondsLeft == 0) {
      this.setState({ minutesLeft: this.state.sessionTime });
    } else
    if (this.state.typeCounting == "Break" && this.state.minutesLeft == 0 && this.state.secondsLeft == 0) {
      this.setState({ minutesLeft: this.state.breakTime });
    }
  }
  countDownStarter() {
    this.setState({ countStart: !this.state.countStart });
    this.startCounting();
  }

  startCounting() {
    let countDown = setInterval(() => {
      if (this.state.countStart) {
        if (this.state.secondsLeft > 0) {
          this.setState({ secondsLeft: this.state.secondsLeft - 1, wiggle: false });
        } else
        if (this.state.secondsLeft <= 0) {
          if (this.state.minutesLeft > 0) {
            this.setState({ minutesLeft: this.state.minutesLeft - 1, secondsLeft: 59 });
          } else
          {
            this.playBeep();
            if (this.state.typeCounting == "Session") {
              this.setState({ typeCounting: "Break", wiggle: true });
            } else
            if (this.state.typeCounting == "Break") {
              this.setState({ typeCounting: "Session", wiggle: true });
            }
          }
        }
      } else
      {
        clearInterval(countDown);
        let sound = document.getElementById("beep");
        sound.pause();
        sound.currentTime = 0;
      }
    }, 1000);
  }

  resetBtn() {
    let sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
    this.setState({
      breakTime: 5,
      sessionTime: 25,
      secondsLeft: 0,
      minutesLeft: 25,
      countStart: false,
      typeCounting: "Session",
      wiggle: false });

  }

  incrementTime(e) {
    const { breakTime, sessionTime } = this.state;
    if (e.target.id == "break-increment") {
      if (breakTime < 60) {
        this.setState({
          breakTime: this.state.breakTime + 1 });

      }
    } else
    {
      if (sessionTime < 60) {
        this.setState({
          sessionTime: this.state.sessionTime + 1,
          minutesLeft: this.state.sessionTime + 1,
          secondsLeft: 0 });

      }
    }
  }
  decrementTime(e) {
    const { breakTime, sessionTime } = this.state;

    if (e.target.id == "break-decrement") {
      if (breakTime > 1) {
        this.setState({
          breakTime: this.state.breakTime - 1 });

      }
    } else
    {
      if (sessionTime > 1) {
        this.setState({
          sessionTime: this.state.sessionTime - 1,
          minutesLeft: this.state.sessionTime - 1,
          secondsLeft: 0 });

      }
    }
  }

  playBeep() {
    let sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.play();
  }

  render() {
    let startStop = this.state.countStart ? "fas fa-pause" : "fas fa-play";
    let wiggle = this.state.wiggle ? "alarmAni" : "";
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", { id: "title" }, this.state.typeCounting)), /*#__PURE__*/

      React.createElement("div", { className: "mainTimer" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement(CountDown, { countdown: "time-left", wiggle: wiggle, minutes: this.state.minutesLeft, seconds: this.state.secondsLeft })), /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/
      React.createElement(TimeSetter, { id: "break-label", name: "Break", ogLength: "break-length", decId: "break-decrement", incId: "break-increment", time: this.state.breakTime, incClick: !this.state.countStart && this.incrementTime, decClick: !this.state.countStart && this.decrementTime }), /*#__PURE__*/
      React.createElement(TimeSetter, { id: "session-label", name: "Session", ogLength: "session-length", decId: "session-decrement", incId: "session-increment", time: this.state.sessionTime, incClick: !this.state.countStart && this.incrementTime, decClick: !this.state.countStart && this.decrementTime }))), /*#__PURE__*/


      React.createElement("div", { id: "controls" }, /*#__PURE__*/
      React.createElement("i", { id: "start_stop", className: startStop, onClick: this.countDownStarter }), /*#__PURE__*/
      React.createElement("i", { id: "reset", onClick: this.resetBtn, className: "fas fa-history" })), /*#__PURE__*/

      React.createElement("audio", { id: "beep", preload: "auto", src: "https://github.com/arthurlee945/AudioLibrary/blob/main/steins_gate_sonuva.mp3?raw=true" })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Timer, null), document.getElementById("root"));