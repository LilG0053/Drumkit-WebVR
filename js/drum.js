import { Component, Property, Type, InputComponent, MeshComponent, Object3D } from '@wonderlandengine/api';
import { CursorTarget, HowlerAudioSource } from '@wonderlandengine/components';

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object3D} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */
export function hapticFeedback(
    object,
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
/** Checks if the open hi hat button is pressed, and determines if the open sound should be played*/
function openHatCheck() {
    for (let input of this.engine.xr.session.inputSources) {
        if (input.handedness === 'left' && input.gamepad) {
            if (input.gamepad.buttons[4].pressed) {
                this.openHat.play();
            } else {
                this.soundHit.play();
            }
        } else {
            this.soundHit.play();
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
        inputObject: Property.object(),
        isHiHat: { type: Type.Bool, defualt: false },
    };

    hitLastFrame = false;
    lastObjectId = 0;
    otherDrumstickPlayed = false;
    static onRegister(engine) {
        engine.registerComponent(HowlerAudioSource);
        engine.registerComponent(CursorTarget);
    }


    init() {
        this.collider = this.object.getComponent('collision');
    }

    onActivate() {
        this.target.onDown.add(this.onDown);
    }

    start() {
        console.log('onActivate() object: ', this.objectId);
        console.log('Drumsoundpath is: ', this.drumSoundPath.toString());
        this.soundHit = this.object.addComponent(HowlerAudioSource, {
            src: this.drumSoundPath.toString(),
            spatial: true,
        });
        this.openHat = this.object.addComponent(HowlerAudioSource, {
            src: 'sfx/openHat.mp3',
            spatial: true,
        })
        this.hitLastFrame = false;
        this.target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);
    }

    update(dt) {
        /* Called every frame. */
        let overLaps = this.collider.queryOverlaps();
        let stickDetected = false;
        let isOtherDrumstick = false;
        let stickNumber = 0;
        let openHatPlayed = false;
        // check for stick overlap
        for (const otherCollision of overLaps) {
            const otherObject = otherCollision.object;
            //console.log(`Collision with object ${otherObject.objectId}`);
            //If it has been hit by the drumstick play the sound
            if (otherObject.name === 'drumstick') {
                stickDetected = true;
                stickNumber++;
                if (otherObject.objectId != this.lastObjectId) {
                    isOtherDrumstick = true
                }
                if (!this.hitLastFrame) {
                    //Check if the object is a hi hat
                    if (this.isHiHat) {
                        for (let input of this.engine.xr.session.inputSources) {
                            if (input.handedness === 'left' && input.gamepad) {
                                if (input.gamepad.buttons[4].pressed) {
                                    this.openHat.play();
                                    openHatPlayed = true;
                                }
                            }
                        }
                    }
                    if (!openHatPlayed) {
                        this.soundHit.play();
                    }
                    this.hitLastFrame = true;
                    stickDetected = true;
                    this.lastObjectId = otherObject.objectId;
                    //travel up the hierarchy to get the controller
                    hapticFeedback(otherObject.parent.parent.parent.parent, 0.9, 100);
                } else if (isOtherDrumstick && !this.otherDrumstickPlayed) {
                    if (this.isHiHat) {
                        for (let input of this.engine.xr.session.inputSources) {
                            if (input.handedness === 'left' && input.gamepad) {
                                if (input.gamepad.buttons[4].pressed) {
                                    this.openHat.play();
                                    openHatPlayed = true;
                                }
                            }
                        }
                    }
                    if (!openHatPlayed) {
                        this.soundHit.play();
                    }
                    this.hitLastFrame = true;
                    stickDetected = true;
                    this.lastObjectId = otherObject.objectId;
                    this.otherDrumstickPlayed = true;
                    //travel up the hierarchy to get the controller
                    hapticFeedback(otherObject.parent.parent.parent.parent, 0.9, 100);
                }
            }
        }

        if (!stickDetected) {
            this.hitLastFrame = false;
        }
        if (stickNumber === 1) {
            this.otherDrumstickPlayed = false;
        }
    }

    onDown = (_, cursor) => {
        //For M+K support
        this.soundHit.play();
    }
}
