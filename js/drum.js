import {Component, Property} from '@wonderlandengine/api';

/**
 * drum
 */
export class Drum extends Component {
    static TypeName = 'drum';
    static Properties = {
        /** Object that has the button's mesh attached */

    };

    init() {
        this.collider = this.object.getComponent('collision');
    }
    start() {
        console.log('start() object: ', this.objectId);
    }

    update(dt) {
        /* Called every frame. */
        let overLaps = this.collider.queryOverlaps();
        for (const otherCollision of overLaps) {
            const otherObject = otherCollision.object;
            console.log(`Collision with object ${otherObject.objectId}`);
        }
    }
}
