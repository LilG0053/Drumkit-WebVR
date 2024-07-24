import { Component, InputComponent, MeshComponent, Type, Property } from '@wonderlandengine/api';
import { CursorTarget, HowlerAudioSource } from '@wonderlandengine/components';

/**
 * Helper function to trigger haptic feedback pulse.
 *
 * @param {Object} object An object with 'input' component attached
 * @param {number} strength Strength from 0.0 - 1.0
 * @param {number} duration Duration in milliseconds
 */
export function hapticFeedback(object, strength, duration) {
    const input = object.getComponent(InputComponent);
    if (input && input.xrInputSource) {
        const gamepad = input.xrInputSource.gamepad;
        if (gamepad && gamepad.hapticActuators)
            gamepad.hapticActuators[0].pulse(strength, duration);
    }
}


/**
 * Button component.
 *
 * Shows a 'hoverMaterial' on cursor hover, moves backward on cursor down,
 * returns to its position on cursor up, plays click/unclick sounds and haptic
 * feedback on hover.
 *
 * Use `target.onClick.add(() => {})` on the `cursor-target` component used
 * with the button to define the button's action.
 *
 * Supports interaction with `finger-cursor` component for hand tracking.
 */


export class ColorSwitcher extends Component {
    static TypeName = 'colorSwitcher';

    static Properties = {
        /** Object that has the button's mesh attached */
        buttonMeshObject: Property.object(),
        /** Drumset material to be changed colors */
        drumMaterial: Property.material(),
        /** Material to apply when the user hovers the button */
        hoverMaterial: Property.material(),
    };

    static onRegister(engine) {
        engine.registerComponent(HowlerAudioSource);
        engine.registerComponent(CursorTarget);
    }

    /* Position to return to when "unpressing" the button */
    returnPos = new Float32Array(3);
    /* Keeps track of the drum height so it doesnt go too high*/
    colorArr = [];
    colIdx = 0;
    start() {
        this.mesh = this.buttonMeshObject.getComponent(MeshComponent);
        this.defaultMaterial = this.mesh.material;
        this.buttonMeshObject.getTranslationLocal(this.returnPos);

        this.target =
            this.object.getComponent(CursorTarget) ||
            this.object.addComponent(CursorTarget);

        this.soundClick = this.object.addComponent(HowlerAudioSource, {
            src: 'sfx/click.wav',
            spatial: true,
        });
        this.soundUnClick = this.object.addComponent(HowlerAudioSource, {
            src: 'sfx/unclick.wav',
            spatial: true,
        });
        this.colorArr = [
            'blue',
            'red',
            'orange',
            'yellow',
            'green',
            'purple',
            'black',
        ]
        this.colIdx = 0;
    }

    onActivate() {
        this.target.onHover.add(this.onHover);
        this.target.onUnhover.add(this.onUnhover);
        this.target.onDown.add(this.onDown);
        this.target.onUp.add(this.onUp);
    }

    onDeactivate() {
        this.target.onHover.remove(this.onHover);
        this.target.onUnhover.remove(this.onUnhover);
        this.target.onDown.remove(this.onDown);
        this.target.onUp.remove(this.onUp);
    }

    /* Called by 'cursor-target' */
    onHover = (_, cursor) => {
        this.mesh.material = this.hoverMaterial;
        if (cursor.type === 'finger-cursor') {
            this.onDown(_, cursor);
        }

        hapticFeedback(cursor.object, 0.5, 50);
    }

    /* Called by 'cursor-target' */
    onDown = (_, cursor) => {
        if (this.isDown || this.isUp) {
            let modifier = 1;
            if (this.isDown) {
                modifier = -1;
                console.log('down');
            } else {
                console.log('up');
                modifier = 1;
            }
            this.buttonMeshObject.translateLocal([0.0, -0.1, 0.0]);


        }
        this.soundClick.play();
        console.log('button down');
        hapticFeedback(cursor.object, 1.0, 20);
        //cycle through color indices
        this.colIdx = (this.colIdx + 1) % this.colorArr.length;
        //switch statement to choose the correct color
        switch (this.colorArr[this.colIdx]) {
            case 'red':
                this.drumMaterial.setDiffuseColor([1.0, 0, 0, 1.0]);
                console.log('Changing color to red');
                break;
            case 'orange':
                this.drumMaterial.setDiffuseColor([1.0, 0.5, 0, 1.0]);
                console.log('Changing color to orange');
                break;
            case 'yellow':
                this.drumMaterial.setDiffuseColor([1.0, 1.0, 0, 1.0]);
                console.log('Changing color to yellow');
                break;
            case 'green':
                this.drumMaterial.setDiffuseColor([0, 1.0, 0, 1.0]);
                console.log('Changing color to green');
                break;
            case 'blue':
                this.drumMaterial.setDiffuseColor([0, 0.65, 0.85, 1.0]);
                console.log('Changing color to blue');
                break;
            case 'purple':
                this.drumMaterial.setDiffuseColor([0.6, 0.2, 0.9, 1.0]);
                console.log('Changing color to purple');
                break;
            case 'black':
                this.drumMaterial.setDiffuseColor([0.2, 0.2, 0.2, 1.0]);
                console.log('Changing color to black');
                break;
            default:
                this.drumMaterial.setDiffuseColor([0, 0.5, 0.85, 1.0]);
                console.log('Changing color to default');
        }
            
    }

    /* Called by 'cursor-target' */
    onUp = (_, cursor) => {
        this.soundUnClick.play();
        this.buttonMeshObject.setTranslationLocal(this.returnPos);
        hapticFeedback(cursor.object, 0.7, 20);
    }

    /* Called by 'cursor-target' */
    onUnhover = (_, cursor) => {
        this.mesh.material = this.defaultMaterial;
        if (cursor.type === 'finger-cursor') {
            this.onUp(_, cursor);
        }

        hapticFeedback(cursor.object, 0.3, 50);
    }
}