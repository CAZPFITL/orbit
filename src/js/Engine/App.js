import AppMethods from './core/AppMethods.js'

class App extends AppMethods {
    constructor(Game) {
        super(Game, false);
        window.app = this;
    }
}

export default App