import { Component, Property } from '@wonderlandengine/api';
import { HeyVRSDK } from './latest.sandbox.js';

/**
 * StickSkins
 */
export class StickSkins extends Component {
    static TypeName = 'StickSkins';
    /* Properties that are configurable in the editor */
    static Properties = {
        stickMaterial: Property.material(),
    };
    inventory = null;
    configData = { "marketing": { "subscribedToGame": false, "subscribedToDeveloper": false }, "inventory": { "catalog": [{ "name": "Super cool item", "slug": "cool-item", "price": 100, "price_discounted": 100, "model": "", "thumbnail": "https://heyvr.io/assets/img/placeholder/placeholder_full.jpg", "item_class": "unlockable", "type": "singular", "expires_after": 0, "description": "Super cool item's description." }, { "name": "Even cooler item", "slug": "cooler-item", "price": 500, "price_discounted": 400, "model": "", "thumbnail": "https://heyvr.io/assets/img/placeholder/placeholder_full.jpg", "item_class": "unlockable", "type": "singular", "expires_after": 0, "description": "Even cooler item's description." }, { "name": "Coolest item", "slug": "coolest-item", "price": 1000, "price_discounted": 200, "model": "", "thumbnail": "https://heyvr.io/assets/img/placeholder/placeholder_full.jpg", "item_class": "unlockable", "type": "singular", "expires_after": 0, "description": "Coolest item's description." }], "myItems": [{ "name": "My Item 1", "slug": "my-item-1", "type": "singular", "owned_count": 1, "expires_on": "", "acquired_at": "2024-07-01T10:55:17.110Z", "item_class": null, "model": "/path/to/model.glb", "hero": "/path/to/hero-image.jpg", "thumbnail": "/path/to/thumbnail-image.jpg", "description": "Fancy item description here." }, { "name": "My Item 2", "slug": "my-item-2", "type": "stackable", "owned_count": 12, "expires_on": "2024-07-01T10:55:17.110Z", "acquired_at": "2024-07-01T10:55:17.110Z", "item_class": "class_1", "model": null, "hero": "/path/to/hero-image.jpg", "thumbnail": "/path/to/thumbnail-image.jpg", "description": "Fancy item description here." }] }, "leaderboard": { "scores": [{ "rank": 1, "score": 6304, "user": "Player1", "created_at": "2023-02-13T17:19:11.000000Z" }, { "rank": 2, "score": 6305, "user": "Player2", "created_at": "2023-03-10T19:51:32.000000Z" }, { "rank": 3, "score": 6306, "user": "Player3", "created_at": "2023-03-10T19:49:46.000000Z" }, { "rank": 4, "score": 6321, "user": "Player4", "created_at": "2023-03-10T19:52:38.000000Z" }, { "rank": 5, "score": 6330, "user": "Player5", "created_at": "2023-03-05T18:13:27.000000Z" }, { "rank": 6, "score": 6334, "user": "Player6", "created_at": "2023-03-05T18:14:01.000000Z" }, { "rank": 7, "score": 6339, "user": "Player7", "created_at": "2023-01-19T18:26:31.000000Z" }, { "rank": 8, "score": 9343, "user": "Player8", "created_at": "2023-03-10T19:53:21.000000Z" }, { "rank": 9, "score": 9351, "user": "Player9", "created_at": "2023-03-10T19:54:09.000000Z" }, { "rank": 10, "score": 12361, "user": "Player10", "created_at": "2023-03-10T19:50:52.000000Z" }], "mine": [{ "score": 6304, "user": "Player1", "created_at": "2023-02-13T17:19:11.000000Z", "rank": 10 }, { "score": 6305, "user": "Player2", "created_at": "2023-03-10T19:51:32.000000Z", "rank": 11 }, { "score": 6306, "user": "Player3", "created_at": "2023-03-10T19:49:46.000000Z", "rank": 13 }, { "score": 6321, "user": "Player4", "created_at": "2023-03-10T19:52:38.000000Z", "rank": 25 }, { "score": 6330, "user": "Player5", "created_at": "2023-03-05T18:13:27.000000Z", "rank": 66 }, { "score": 6334, "user": "Player6", "created_at": "2023-03-05T18:14:01.000000Z", "rank": 818 }, { "score": 6339, "user": "Player7", "created_at": "2023-01-19T18:26:31.000000Z", "rank": 91 }, { "score": 9343, "user": "Player8", "created_at": "2023-03-10T19:53:21.000000Z", "rank": 2 }, { "score": 9351, "user": "Player9", "created_at": "2023-03-10T19:54:09.000000Z", "rank": 35 }, { "score": 12361, "user": "Player10", "created_at": "2023-03-10T19:50:52.000000Z", "rank": 15 }], "friends": [{ "rank": 12, "score": 6304, "user": "Friend 1", "created_at": "2023-02-13T17:19:11.000000Z" }, { "rank": 15, "score": 6305, "user": "Friend 2", "created_at": "2023-03-10T19:51:32.000000Z" }, { "rank": 83, "score": 6306, "user": "Friend 3", "created_at": "2023-03-10T19:49:46.000000Z" }, { "rank": 92, "score": 6321, "user": "Friend 4", "created_at": "2023-03-10T19:52:38.000000Z" }, { "rank": 103, "score": 6330, "user": "Friend 5", "created_at": "2023-03-05T18:13:27.000000Z" }, { "rank": 122, "score": 6334, "user": "Friend 6", "created_at": "2023-03-05T18:14:01.000000Z" }, { "rank": 125, "score": 6339, "user": "Friend 7", "created_at": "2023-01-19T18:26:31.000000Z" }, { "rank": 991, "score": 9343, "user": "Friend 8", "created_at": "2023-03-10T19:53:21.000000Z" }, { "rank": 10901, "score": 9351, "user": "Friend 9", "created_at": "2023-03-10T19:54:09.000000Z" }, { "rank": 192871, "score": 12361, "user": "Friend 10", "created_at": "2023-03-10T19:50:52.000000Z" }] }, "saveGame": { "slots": { "1": { "name": "Save Slot 1", "save_data": "{\"key_1\":\"Value 1\",\"key_2\":\"Value 2\"}", "created_at": "2023-03-10T19:54:09.000000Z", "updated_at": "2023-03-10T19:59:52.000000Z" }, "2": { "name": "Save Slot 2", "save_data": "{\"key_3\":\"Value 3\",\"key_4\":\"Value 4\"}", "created_at": "2023-03-05T18:14:01.000000Z", "updated_at": "2023-03-07T19:15:01.000000Z" }, "3": { "name": "Save Slot 3", "save_data": "{\"key_5\":\"Value 5\",\"key_6\":\"Value 6\"}", "created_at": "2023-03-10T19:49:46.000000Z", "updated_at": "2023-04-10T11:40:41.000000Z" }, "4": { "name": "Save Slot 4", "save_data": "{\"key_7\":\"Value 7\",\"key_8\":\"Value 8\"}", "created_at": "2023-02-13T17:19:11.000000Z", "updated_at": "2023-02-13T17:19:11.000000Z" }, "5": { "name": "Save Slot 5", "save_data": "{\"key_9\":\"Value 9\",\"key_10\":\"Value 10\"}", "created_at": "2023-03-05T18:13:27.000000Z", "updated_at": "2023-03-12T10:11:02.000000Z" } } }, "user": { "loggedIn": true, "responseDelay": 1000, "username": "heyVRUser", "userBalance": 1250, "alias": "heyVRUserAlias" }, "config": { "arena.token": "YOUR API TOKEN", "game.slug": "sandbox-game", "debug.enabled": true } };
    start() {
        console.log('start() with param', this.param);
        heyVR.mock.importConfig(this.configData);
        heyVR.user.isLoggedIn().then(
            isLoggedIn => {
                if (isLoggedIn) {
                    heyVR.user.getName().then(
                        name => {
                            console.log(`Welcome ${name}!`);
                        }
                    ).catch(
                        error => {
                            // An unexpected error occurred
                            // Check error.debug to provide specific reactions.
                            console.log('Welcome stranger!');
                        }
                    );
                } else {
                    console.log('Welcome stranger!');
                }
            }
        );
        //Get the user's inventory
        heyVR.inventory.get().then((arr) => {
            console.log("Inventory fetch: ", arr)
            if (arr != null) {
                let i = 0;
                while (i < arr.length) {
                    if (arr[i].slug == 'black-drumstick' || arr[i].slug == 'my-item-1') {
                        console.log('Changing drumstick color to black');
                        this.stickMaterial.setDiffuseColor([0, 0, 0, 1.0]);
                    }
                    i++;
                }
            }
        });
    }

    update(dt) {
        /* Called every frame. */
    }
}
