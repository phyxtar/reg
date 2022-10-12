import React from 'react';

const CongratScreen = () => {
  const Confettiful = function (el) {
    this.el = el;
    this.containerEl = null;

    this.confettiFrequency = 3;
    this.confettiColors = [
      '#EF2964',
      '#00C09D',
      '#2D87B0',
      '#48485E',
      '#EFFF1D',
    ];
    this.confettiAnimations = ['slow', 'medium', 'fast'];

    this._setupElements();
    this._renderConfetti();
  };

  Confettiful.prototype._setupElements = function () {
    const containerEl = document.createElement('div');
    const elPosition = this.el.style.position;

    if (elPosition !== 'relative' || elPosition !== 'absolute') {
      this.el.style.position = 'relative';
    }

    containerEl.classList.add('confetti-container');

    this.el.appendChild(containerEl);

    this.containerEl = containerEl;
  };

  Confettiful.prototype._renderConfetti = function () {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px';
      const confettiBackground =
        this.confettiColors[
          Math.floor(Math.random() * this.confettiColors.length)
        ];
      const confettiLeft =
        Math.floor(Math.random() * this.el.offsetWidth) + 'px';
      const confettiAnimation =
        this.confettiAnimations[
          Math.floor(Math.random() * this.confettiAnimations.length)
        ];

      confettiEl.classList.add(
        'confetti',
        'confetti--animation-' + confettiAnimation
      );
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);

      this.containerEl.appendChild(confettiEl);
    }, 25);
  };

  window.confettiful = new Confettiful(document.querySelector('.js-container'));
  return (
    <>
      <div class='js-container container' style='top:0px !important;'></div>

      <div style='text-align:center;margin-top:30px;position:  fixed;width:100%;height:100%;top:0px;left:0px;'>
        <div class='checkmark-circle'>
          <div class='background'></div>
          <div class='checkmark draw'></div>
        </div>
        <h1>Congratulations!</h1>
        <p>You are all set. Well done!</p>
        <button
          class='submit-btn'
          type='submit'
          onclick="alert('🥺🥺🥺🥺🥺\n Oh no you didn\'t!!!!!!!');"
        >
          Continue
        </button>
      </div>
    </>
  );
};

export default CongratScreen;
