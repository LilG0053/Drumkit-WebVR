import { Component, Property} from '@wonderlandengine/api';
import { HowlerAudioSource } from '@wonderlandengine/components';

/**
 * kickDrumActivation
 */
export class KickDrumActivation extends Component {
    static TypeName = 'kickDrumActivation';
    
    /* Properties that are configurable in the editor */
    static Properties = {

    };
    continuouslyPressed = false;
    start() {
        console.log('start() with param', this.param);
        this.kickSound = this.object.addComponent(HowlerAudioSource, {
            src: 'sfx/kick.wav',
            spatial: true,
        });
    }

    update(dt) {
        if (!this.engine.xr) return;
        
        //Plays kick sound on A button press
        for (let input of this.engine.xr.session.inputSources) {
            if (input.handedness === 'left' && input.gamepad) {
                if (input.gamepad.buttons[5].pressed && !this.continuouslyPressed) {
                    this.kickSound.play();
                    this.continuouslyPressed = true;
                } else if (!input.gamepad.buttons[5].pressed) {
                    this.continuouslyPressed = false;
                }
            }
             
        }
    }
}
