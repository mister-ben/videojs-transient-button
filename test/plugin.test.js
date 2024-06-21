import {videojs} from 'video.js';
import { TransientButton, TransientButtonOptions } from '../src/TransientButton.js';

QUnit.module('Transient Button');

QUnit.test('dummy', (assert) => {
  assert.strictEqual('a', 'a', 'dummy test works');
});

QUnit.test('testing', (assert) => {
  const done = assert.async();

  const player = videojs(document.createElement('video'));

  /** @type {TransientButtonOptions} */
  const options = {
    controlText: 'Some text',
    clickHandler: () => {
      assert.ok(true, 'buttton clicked');
      done();
    }
  };
  const button = player.addChild('TransientButton', options);

  assert.ok(player.getChild('TransientButton'), 'player has added component');

  button.trigger('click');
});
