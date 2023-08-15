import Screen from "./Screen.js";

export default class Game {
    constructor(app) {
        this.app = app;
        app.game = this;
        this.screen = new Screen(app);
    }

    update = () => {

    }
}