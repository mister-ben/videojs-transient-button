import videojs from 'video.js';

/** @import Player from 'video.js/dist/types/player' */

/**
 * 
 * @typedef {object} TransientButtonOptions Options for transient buttons
 * @property {number} [forceTimeout=4000] Duration in ms that the button remains visible when first shown
 * @property {('top' | 'near-top' | 'left' | 'bottom' | 'right')[]} [position=['top', 'left']] Position to show button
 * @property {boolean} [takeFocus=false] Button should take keyboard focus when shown
 * @property {string} [controlText] The text for the control
 * @property {string} [className] Space-separated classes to apply
 * @property {function} [clickHandler] Function to set as click handler
 *
 */

/**
 * @type {TransientButtonOptions}
 */
const defaults = {
  forceTimeout: 4000,
  takeFocus: false,
  position: ['top', 'left']
};

class TransientButton extends videojs.getComponent('Button') {
  /**
   * 
   * @param {Player} player 
   * @param {TransientButtonOptions} options Button options
   */
  constructor(player, options) {
    options = (videojs.obj.merge(defaults, options));
    super(player, options);
    this.controlText(options.controlText);
    this.hide();

    // When shown, the float button will be visible even if the user is inactive.
    // Clear this if there is any interaction.
    /**
     * @private
     */
    this.clearForceTimeout_ = () => {
      this.removeClass('force-display');
    };
  }

  buildCSSClass() {
    return `vjs-transient-button focus-visible ${this.options_.position.map((c) => `vjs-${c}`).join(' ')}`;
  }

  createEl() {
    /** @type HTMLButtonElement */
    const el = videojs.dom.createEl(
      'button', {}, {
        type: 'button',
        class: this.buildCSSClass()
      },
      videojs.dom.createEl('span')
    );

    this.controlTextEl_ = el.querySelector('span');

    return el;
  }

  /**
   * Display the transient button for the duration of options.forceTimeout and on user activity until hidden.
   */
  show() {
    super.show();
    this.addClass('force-display');
    if (this.options_.takeFocus) {
      this.el().focus({ preventScroll: true});
    }

    /**
     * @private
     */
    this.forceDisplayTimeout_ = this.player_.setTimeout(() => {
      console.log('force display timeout remote class', this)
      this.removeClass('force-display');
    }, this.options_.forceTimeout);

    player.any(['useractive', 'userinactive'], this.clearForceTimeout_);
  }

  hide() {
    this.removeClass('force-display');
    super.hide();
  }

  dispose() {
    this.player_.clearTimeout(this.forceDisplayTimeout_);
    player.off(['useractive', 'userinactive'], this.clearForceTimeout_);
    super.dispose();
  }
}

videojs.registerComponent('TransientButton', TransientButton);
export default TransientButton;
