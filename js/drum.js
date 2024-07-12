import { Component, Property, Type } from '@wonderlandengine/api';
import { HowlerAudioSource } from '@wonderlandengine/components';

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
            console.log(`Collision with object ${otherObject.objectId}`);
            //If it has been hit by the drumstick play the sound
            if (otherObject.name === 'drumstick') {
                stickDetected = true;
                if (!this.hitLastFrame) {
                    this.soundHit.play();
                    this.hitLastFrame = true;
                    stickDetected = true;
                }
            }
        }

        if (!stickDetected) {
            this.hitLastFrame = false;
        }
    }
}
