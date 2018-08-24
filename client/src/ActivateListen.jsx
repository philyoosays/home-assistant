import React from 'react';

import GoFetch from './utilities/GoFetch';
import Listener from './utilities/Listener';
import BehaviorCircles from './utilities/BehaviorCircles';

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
      counter: 0,

      listenState: 'processing',
      arcOpacity: 1,
      arcFilter: 'none',
      arcShadowOpacity: 0,
    };

    this.setTheState = this.setTheState.bind(this);
    this.makeTimerLadder = this.makeTimerLadder.bind(this);
    this.startListening = this.startListening.bind(this);
  }

  componentDidMount() {

    console.log('component re-mounted')
    this.setTheState('listenState', 'processing');
    this.behaviorSwitch()

    setTimeout( async () => {
      await this.setTheState('listenState', 'chilling', 'arcOpacity', 0, 'arcShadowOpacity', 1)
      console.log('slowingdown', this.state.listenState)
    }, 5000)
  }

  async componentDidUpdate(prevProps, prevState) {
    if(prevState.listenState !== this.state.listenState) {
      this.behaviorSwitch()
    }
  }

  componentWillUnmount() {
    this.stopIntervals();
  }

  async behaviorSwitch() {
    await this.stopIntervals();

    let bigInterval;
    let smallInterval;
    let dontSetInterval = false;
    let ratioRandom = (num) => coinFlip(num);
    switch(this.state.listenState) {
      case 'chilling':
        console.log('switch chilling')
        this.setTheState('arcFilter', 'none')
        bigInterval = setInterval(() => bigChilling(this.setTheState, this.rando), 15000)
        smallInterval = setInterval(() => smallChilling(this.setTheState, this.rando, this.state.smallSpin), this.rando(19000, 12000))
        break;

      case 'processing':
        console.log('switch processing')
        bigInterval = setInterval(() => bigProcessing(this.setTheState, this.rando), 2500)
        smallInterval = setInterval(() => smallProcessing(this.setTheState, this.rando, this.state.smallSpin, this.makeTimerLadder), this.rando(6000, 1000))
        break;

      case 'listening':
        console.log('switch listening')
        dontSetInterval = true;
        this.setTheState('bigSpin', 0, 'bigTime', 0, 'smallSpin', 0, 'smallTime', 0)
        // bigInterval = setInterval(() => bigListening(this.setTheState, this.rando, this.state.bigSpin), 10000);
        // // smallInterval = setInterval(() => smallListening(this.setTheState, this.rando, this.state.smallSpin), 8000);
        // smallInterval = smallListening(this.setTheState, this.rando, this.state.smallSpin);
        break;
    }
    if(!dontSetInterval) {
      this.setTheState('bigInterval', bigInterval, 'smallInterval', smallInterval)
    }
  }

  async handleClick() {
    console.log('clicked')
    switch(this.state.listenState) {
      case 'chilling':
        await setTimeout(async () => {
          this.setTheState('bigScale', 1.43, 'bigTime', 500)
          this.setTheState('smallScale', 1.00, 'smallTime', 600)
          await setTimeout(() => {
            this.setTheState('bigScale', 0, 'bigTime', 500, 'bigSpin', 360 * 8)
            this.setTheState('smallScale', 0, 'smallTime', 600, 'smallSpin', 360 * 10)
            this.setTheState('arcOpacity', 1)
          }, 1000)
          await setTimeout(async () => {
            let timeObj = {
              theBigTime: 2800,
              theSmallTime: 2500,
              theCenterTime: 4000
            }
            await this.reset(false, timeObj);
            this.setTheState('bigScale', 1, 'listenState', 'listening')
            this.setTheState('bigSpin', 720, 'smallSpin', 1080)
            setTimeout( async () => {
              await this.setTheState('bigSpin', 0, 'bigTime', 0, 'smallSpin', 0, 'smallTime', 0)
            }, 3000)
          }, 1700)
        })

        setTimeout(() => {
          this.startListening()
        }, 3000)
        break;
      case 'listening':
        this.reset(true)
        this.setTheState('listenState', 'chilling')
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
      smallSpin: 30,
      smallTime: theSmallTime,
      smallScale: 0.70,
      smallImage: circleFCW,
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

  startListening(acknowledgeless, setTheState) {
    recognition.start();
    recognition.onresult = async (event) => {

      const result = event.results['0']['0'].transcript;
      console.log('Listen: ', result)

      if(result.toLowerCase() === 'helios') {
        await this.setTheState('arcFilter', 'sepia(100%)');
        setTimeout(() => {
          console.log('happening')
          this.startListening(true, setTheState);
        }, 2510)
        recognition.stop();
      }
      if(acknowledgeless) {
        fetch('http://192.168.1.6:6001/api/analyze', {
          body: JSON.stringify({ result }),
          headers: {
            'content-type': 'application/json',
            secretHandshake: process.env.REACT_APP_SECRET
          },
          method: 'POST'
        })
        .then(response => response.json())
          .then(data => {
            console.log(data)
          })
        this.props.setParentState('speechResults', result);
      }
    }
    recognition.onspeechend = (event) => {
      console.log('stopping')
      recognition.stop();
      this.setTheState('listenState', 'chilling')
    }

    recognition.onnomatch = (event) => {
      console.log('No Match')
    }

    recognition.onerror = (event) => {
      console.log('error')
      this.setTheState('listenState', 'chilling')
    }
  }

  stopIntervals() {
    clearInterval(this.state.bigInterval);
    clearInterval(this.state.smallInterval);
  }

  render() {
    const styleBig = {
      transition: `all ${parseFloat(this.rando(this.state.bigTime)/1000)}s ease-in-out`,
      transform: `rotate(${this.state.bigSpin}deg) scale(${this.state.bigScale})`,
      opacity: this.state.bigOpacity,
      top: this.state.listenState === 'listening' ? '0px' : '2px',
      left: this.state.listenState === 'listening' ? '5px' : '8px'
    }

    const styleSmall = {
      transition: `all ${parseFloat(this.rando(this.state.smallTime)/1000)}s`,
      transform: `rotate(${this.state.smallSpin}deg) scale(${this.state.smallScale})`,
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
      filter: this.state.arcFilter,
    }

    const styleArcShadow = {
      opacity: this.state.arcShadowOpacity
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
          <figure className="listen-arcshadow-container" style={ styleArcShadow }>
            <img src={ arcReactor } className="listen-ai-arcshadow" alt="arc-reactor-shadow" />
          </figure>
        </article>
      </section>
    );
  }
}
