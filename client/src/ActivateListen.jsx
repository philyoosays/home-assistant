import React from 'react';

import Listener from './Listener';
import BehaviorCircles from './BehaviorCircles';

import circleIO from './assets/collection-jarvis/circle-inner-outer.png';
import circleFCW from './assets/collection-jarvis/circlefancy-clockwise.png';
import arcReactor from './assets/collection-jarvis/arc-reactor.png';

import circleTripod from './assets/collection-jarvis/circle-clockwise-tripodcenter.png';
import circleCW from './assets/collection-jarvis/circle-clockwise.png';
import circleDots from './assets/collection-jarvis/circlefancy-dots-and-numbers.png';

import './ActivateListen.css'

const {

  smallProcessing,
  smallChilling,
  smallListening,
  bigProcessing,
  bigChilling,
  bigListening,
  coinFlip

} = BehaviorCircles;

const { recognition, SpeechRecognitionEvent } = Listener;

export default class ActivateListen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bigSpin: 0,
      bigTime: 5000,
      bigScale: 1,
      bigImage: circleIO,
      bigOpacity: 1,
      bigInterval: undefined,
      smallZ: 5,
      smallSpin: 30,
      smallTime: 5000,
      smallScale: 0.70,
      smallImage: circleFCW,
      smallOpacity: 1,
      smallInterval: undefined,
      centerSpin: 360,
      centerTime: 20000,
      centerScale: 0,

      listenState: 'processing',
      arcOpacity: 1,
    };

    this.setTheState = this.setTheState.bind(this);
    this.makeTimerLadder = this.makeTimerLadder.bind(this);
  }

  componentDidMount() {

    setTimeout( async () => {
      await this.setTheState('listenState', 'chilling', 'arcOpacity', 0)
      this.stopIntervals()
      console.log('slowingdown', this.state.listenState)
    }, 1000)

    let bigInterval;
    let smallInterval;
    let ratioRandom = (num) => coinFlip(num);

    this.setTheState('bigSpin', this.rando(720) - 360, 'bigTime', this.rando(4000, 300))
    this.setTheState('smallSpin', this.rando(90, 25), 'smallTime', this.rando(600, 200))

    switch(this.state.listenState) {
      case 'chilling':
        bigInterval = setInterval(() => bigChilling(this.setTheState, this.rando), 15000)
        smallInterval = setInterval(() => smallChilling(this.setTheState, this.rando, this.state.smallSpin, this.makeTimerLadder), ratioRandom(0.7) ? 3600 : this.rando(19000, 12000))
        break;

      case 'processing':
        bigInterval = setInterval(() => bigProcessing(this.setTheState, this.rando), 2500)
        smallInterval = setInterval(() => smallProcessing(this.setTheState, this.rando, this.state.smallSpin, this.makeTimerLadder), ratioRandom(0.7) ? 3600 : this.rando(6000, 1000))
        break;

      case 'listening':
        this.setTheState('bigTime', 2800, 'bigScale', 1)
        this.setTheState('smallTime', 2500, 'smallScale', '1.4')
        this.setTheState('centerScale', 1, 'centerTime', 4000)
        setTimeout(() => {
          bigInterval = setInterval(() => bigListening(this.setTheState, this.rando, this.state.bigSpin), 10000);
          smallInterval = setInterval(() => smallListening(this.setTheState, this.rando, this.state.smallSpin), 8000);
          recognition.start()
          recognition.onresult = (event) => {
            console.log('event', event)
          }
          recognition.onspeechend = function() {
            recognition.stop();
          }

          recognition.onnomatch = function(event) {
            diagnostic.textContent = "I didn't recognise that color.";
          }

          recognition.onerror = function(event) {
            diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
          }
        }, 2800)
        break;
    }

    this.setTheState('bigInterval', bigInterval, 'smallInterval', smallInterval)
  }

  componentWillUnmount() {
    this.stopIntervals();
  }

  stopIntervals() {
    clearInterval(this.state.bigInterval);
    clearInterval(this.state.smallInterval);
  }

  handleClick() {
    console.log('clicked')
    switch(this.state.listenState) {
      case 'chilling':
        setTimeout(() => {
          this.setTheState('bigScale', 1.43, 'bigTime', 500)
          this.setTheState('smallScale', 1.00, 'smallTime', 600)
          setTimeout(() => {
            this.setTheState('bigScale', 0, 'bigTime', 500, 'bigSpin', 360 * 8)
            this.setTheState('smallScale', 0, 'smallTime', 600, 'smallSpin', 360 * 10)
            this.setTheState('arcOpacity', 1)
          }, 1000)
          setTimeout(() => {
            let timeObj = {
              theBigTime: 1500,
              theSmallTime: 1500,
              theCenterTime: 1500
            }
            this.reset(false, timeObj);
            this.setTheState('listenState', 'listening')
          }, 1700)
        })
        break;
      default:
        break;
    }
  }

  makeTimerLadder(num, place) {
    if(num === undefined) {
      num = place = 0;
    }
    if(place < 7) {
      let increment = place%2 === 0 ? 20 : -20
      setTimeout(() => {
        this.setTheState('smallSpin', this.state.smallSpin + increment)
        this.makeTimerLadder(num + 1, place + 1)
      }, num * 500)
    }
  }

  rando(limit, padBottom) {
    let theLimit = limit;
    if(padBottom !== undefined) {
      theLimit -= padBottom
      return Math.ceil(Math.random() * theLimit) + padBottom
    } else {
      return Math.ceil(Math.random() * theLimit);
    }
  }

  reset(showOpacity, newTimes) {
    if(showOpacity) {
      this.setTheState({
        bigOpacity: 1,
        smallOpacity: 1
      })
    }

    let theTimeObj = {
      theBigTime: 5000,
      theSmallTime: 5000,
      theCenterTime: 20000,
    }

    if(newTimes) {
      for(let key in newTimes) {
        theTimeObj[key] = newTimes[key]
      }
    }

    let { theBigTime, theSmallTime, theCenterTime } = theTimeObj;

    this.setState({
      bigSpin: 0,
      bigTime: theBigTime,
      bigScale: 1,
      bigImage: circleIO,
      bigInterval: undefined,
      smallSpin: 30,
      smallTime: theSmallTime,
      smallScale: 0.70,
      smallImage: circleFCW,
      smallInterval: undefined,
      centerSpin: 360,
      centerTime: theCenterTime,
      centerScale: 0,
    })
  }

  async setTheState(key, value, keyTwo, valueTwo, keyThree, valueThree, keyFour, valueFour) {
    let newState = {
      [key]: value,
      [keyTwo]: valueTwo,
      [keyThree]: valueThree,
      [keyFour]: valueFour
    }

    let safety = 0;
    while(newState.hasOwnProperty(undefined) && safety < 3) {
      delete newState[undefined]
      safety++;
    }

    if(safety >= 3) {
      console.log('Safety Triggered')
    }

    await this.setState( newState );
  }

  render() {
    const styleBig = {
      transition: `all ${parseFloat(this.rando(this.state.bigTime)/1000)}s ease-in-out`,
      transform: `rotate(${this.rando(this.state.bigSpin)}deg) scale(${this.state.bigScale})`,
      opacity: this.state.bigOpacity,
      top: this.state.listenState === 'listening' ? '0px' : '2px',
      left: this.state.listenState === 'listening' ? '5px' : '8px'
    }

    const styleSmall = {
      transition: `all ${parseFloat(this.rando(this.state.smallTime)/1000)}s`,
      // transform: `rotate(${this.rando(this.state.smallSpin)}deg) scale(${this.state.smallScale})`,
      transform: `rotate(0deg) scale(${this.state.smallScale})`,
      opacity: this.state.smallOpacity,
      top: this.state.listenState === 'listening' ? '-35px' : '6px',
      left: this.state.listenState === 'listening' ? '0px' : '0px',
      zIndex: this.state.listenState === 'listening' ? '3' : '5',
    }

    const styleCenter = {
      transition: `all ${parseFloat(this.rando(this.state.centerTime)/1000)}s`,
      transform: `rotate(${this.rando(this.state.centerSpin)}deg) scale(${this.state.centerScale})`,
      display: this.state.centerDisplay,
      opacity: this.state.centerOpacity,
    }

    const styleArc = {
      opacity: this.state.arcOpacity,
    }

    const bigImage = this.state.listenState === 'listening' ? circleCW : circleIO;
    const smallImage = this.state.listenState === 'listening' ? circleTripod : circleFCW;
    // const centerImage = this.state.listenState === 'listening' ? circleDots : '';

    return(
      <section className="listen-container">
        <article className="listen-circle-container" onClick={() => this.handleClick()}>
          <figure className="listen-bigcircle-container" style={ styleBig }>
            <img src={ bigImage } className="listen-ai-bigcircle" alt="big-circle"/>
          </figure>
          <figure className="listen-smallcircle-container" style={ styleSmall }>
            <img src={ smallImage } className="listen-ai-smallcircle" alt="small-circle" />
          </figure>
          <figure className="listen-center-container" style={ styleCenter }>
            <img src={ circleDots } className="listen-ai-centercircle" alt="center-circle" />
          </figure>
          <figure className="listen-arc-container" style={ styleArc }>
            <img src={ arcReactor } className="listen-ai-arc" alt="arc-reactor" />
          </figure>
          <figure className="listen-arcshadow-container" style={{ visibility: 'hidden' }}>
            <img src={ arcReactor } className="listen-ai-arcshadow" alt="arc-reactor-shadow" />
          </figure>
        </article>
      </section>
    );
  }
}
