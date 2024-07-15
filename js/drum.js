import { Component, Property, Type, InputComponent, MeshComponent, Object3D } from '@wonderlandengine/api';
import { HowlerAudioSource } from '@wonderlandengine/components';

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object3D} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */
export function hapticFeedback(
    Object3D,
    strength,
    duration
) {
    const input = object.getComponent(InputComponent);
    if (input && input.xrInputSource) {
        const gamepad = input.xrInputSource.gamepad;
        if (gamepad && gamepad.hapticActuators) {
            const hapticActiator = gamepad.hapticActuators[0];
            if (hapticActiator) {
                hapticActiator.pulse(strength, duration).catch((e) => {
                    console.error('hapticFeedback: pulse failed', e);
                });
            } else {
                console.log(
                    'hapticFeedback: hapticActuators not found on this device'
                );
                console.dir(gamepad.hapticActuators);
            }
        }
    }
}

/**
 * drum
 */
export class Drum extends Component {
    static TypeName = 'drum';

    static Properties = {
        /** Object that has the button's mesh attached */
        drumSoundPath: { type: Type.String, default: 'sfx/snare.mp3' },
    };

    hitLastFrame = false;

    static onRegister(engine) {
        engine.registerComponent(HowlerAudioSource);
    }


    init() {
        this.collider = this.object.getComponent('collision');
    }

    start() {
        console.log('onActivate() object: ', this.objectId);
        console.log('Drumsoundpath is: ', this.drumSoundPath.toString());
        this.soundHit = this.object.addComponent(HowlerAudioSource, {
            src: this.drumSoundPath.toString(),
            spatial: true,
        });
        this.hitLastFrame = false;
    }
    
    update(dt) {
        /* Called every frame. */
        let overLaps = this.collider.queryOverlaps();
        let stickDetected = false;
        // check for stick overlap
        for (const otherCollision of overLaps) {
            const otherObject = otherCollision.object;
            //console.log(`Collision with object ${otherObject.objectId}`);
            //If it has been hit by the drumstick play the sound
            if (otherObject.name === 'drumstick') {
                stickDetected = true;
                if (!this.hitLastFrame) {
                    this.soundHit.play();
                    this.hitLastFrame = true;
                    stickDetected = true;
                    //travel up the hierarchy to get the controller
                    hapticFeedback(otherObject, 0.7, 20);
                }
            }
        }

        if (!stickDetected) {
            this.hitLastFrame = false;
        }
    }
}
