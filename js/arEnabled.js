import {Component, Property} from '@wonderlandengine/api';


/**
 * arEnabled
 */
export class ArEnabled extends Component {
    static TypeName = 'arEnabled';
    /* Properties that are configurable in the editor */
    static Properties = {
        skyBox: Property.object(),
        floor: Property.object(),
    };



    start() {
        const arButton = document.getElementById('ar-button');
        if (arButton) {
            arButton.addEventListener('click', () => {
                this.skyBox.active = false;
                this.floor.active = false;
            });
        }
        const vrButton = document.getElementById('vr-button');
        if (vrButton) {
            vrButton.addEventListener('click', () => {
                this.skyBox.active = true;
                this.floor.active = true;
            })
        }
    }

}
