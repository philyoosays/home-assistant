import React from 'react';

import circleIO from './assets/collection-jarvis/circle-inner-outer.png';
import circleFCW from './assets/collection-jarvis/circlefancy-clockwise.png';

import './ActivateListen.css'

export default class ActivateListen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      styleBig: {},
      styleSmall: {},
      bigSpin: 360,
      bigTime: 5,
      smallSpin: 30,
    };


  }

  circleOuterMovement(toggle) {
    if(toggle === undefined) {
      toggle = 0;
    }
    switch(toggle) {
      case 0:
        break;
    }
  }

  circleInnerMovement() {

  }

  rando(limitOne, limitTwo) {
    let theLimit;

    if(!limitTwo) {
      theLimit = limitOne;
    } else {
      theLimit = this.rando(limitTwo);
    }

    return Math.ceil(Math.random() * theLimit);
  }

  setTheState(key, value, keyTwo, valueTwo, keyThree, valueThree) {
    let newState = {
      [key]: value,
      [keyTwo]: valueTwo,
      [keyThree]: valueThree,
    }

    let safety = 0;
    while(newState.hasOwnProperty(undefined) && safety < 3) {
      delete newState[undefined]
      safety++;
    }

    this.setState( newState );
  }

  render() {
    let styleBig = {
      transition: `spin ${this.rando(this.state.bigTime)} ease-out`,
      transform: `rotate(${this.rando(this.state.bigSpin)}deg)`
    }
    return(
      <section className="listen-container">
        <article className="listen-circle-container">
          <figure className="listen-bigcircle-container" style={ styleBig }>
            <img src={circleIO} className="listen-ai-bigcircle" alt="big-circle"/>
          </figure>
          <figure className="listen-smallcircle-container" style={ this.state.styleSmall }>
            <img src={circleFCW} className="listen-ai-smallcircle" alt="small-circle" />
          </figure>
        </article>
      </section>
    );
  }
}
