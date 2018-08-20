const BehaviorForCircles = {
  async smallProcessing(setTheState, rando, spin, makeTimerLadder) {
    let diceRoll = Math.ceil(Math.random() * 6)
    if(diceRoll < 6) {
      await setTimeout( async () => {
        await setTheState('smallSpin', rando(90, 25), 'smallTime', rando(200));
        setTimeout( async () => {
          await setTheState('smallSpin', spin - 5, 'smallTime', 200);
        }, 600)
      })

      await setTimeout( async () => {
        setTheState('smallTime', 50)
        await makeTimerLadder();
      }, 1100)

    } else {
      await setTimeout(() => {
        setTheState('smallSpin', rando(1800*4, 720), 'smallTime', 2000)
      })
    }
  },

  smallChilling(setTheState, rando, spin) {
    let num = rando(200, 45)
    setTheState('smallSpin', spin + num, 'smallTime', (num * 90) < 7000 ? 18000 : (num * 90))
    setTimeout(() => {
      setTheState('smallSpin', rando(200, 75), 'smallTime', 500)
    }, 19000)
  },

  bigProcessing(setTheState, rando) {
    setTheState('bigSpin', rando(720) - 360), 'bigTime', rando(2500, 1500)
  },

  bigChilling(setTheState, rando) {
    setTheState('bigSpin', rando(720) - 360, 'bigTime', rando(14490, 13000))
  },

  bigListening(setTheState, rando, spin) {
    const coin = this.coinFlip()
    setTheState('bigSpin', spin + rando(35, 10),)
  },

  coinFlip(bias) {
    let theBias = bias;
    if(theBias === undefined) {
      theBias = 0.5;
    }

    return Math.random() >= theBias ? true : false;
  }
}

export default BehaviorForCircles;
