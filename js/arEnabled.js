import {Component, Property} from '@wonderlandengine/api';


/**
 * arEnabled
 */
export class ArEnabled extends Component {
    static TypeName = 'arEnabled';
    /* Properties that are configurable in the editor */
    static Properties = {
        skyBoxes: Property.object(),
        floor: Property.object(),
        imageCycleButton: Property.object(),
        raiseButtonMesh: Property.object(),
        buttonLabel: Property.object(),
    };
    skyboxChildren = null;


    start() {
        const arButton = document.getElementById('ar-button');
        this.skyboxChildren = this.skyBoxes.getChildren()
        if (arButton) {
            arButton.addEventListener('click', () => {
                this.floor.active = false;
                this.imageCycleButton.active = false;
                this.raiseButtonMesh.active = false;
                this.buttonLabel.active = false;
                for (let i = 0; i < this.skyboxChildren.length; i++) {
                    console.log('Disabling: ' + this.skyboxChildren[i]);
                    this.skyboxChildren[i].active = false;
                }
            });
        }
        const vrButton = document.getElementById('vr-button');
        if (vrButton) {
            vrButton.addEventListener('click', () => {
                this.floor.active = true;
                this.imageCycleButton.active = true;
                this.raiseButtonMesh.active = true;
                this.buttonLabel.active = true;
                for (let i = 0; i < this.skyboxChildren.length; i++) {
                    console.log('Disabling: ' + this.skyboxChildren[i]);
                    this.skyboxChildren[i].active = true;
                }
            })
        }
    }

}
