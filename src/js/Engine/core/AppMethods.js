import Gui from '../gui/Gui.js'
import Animation from './Animation.js'
import Listeners from './Listeners.js'
import StateManager from './StateManager.js'
import Tools from './Tools.js'

export default class AppMethods extends StateManager {
    tools = Tools;

    constructor(Game) {
        super()
        new Animation(this)
        new Listeners(this)
        this.looper = [
            new Gui(this),
            new Game(this)
        ]
    }

    init() {
        this.listeners.init()
        this.animation.start('LOAD_GAME')
    }
}