export default class Listeners {
    constructor(app) {
        this.app = app;
        this.listeners = [];
        app.listeners = this;
    }

    init() {
        for (let listener in this.listeners) {
            document.addEventListener(listener, (e) =>
                    this.listeners[listener].forEach(fn => fn(e))
                , {passive: false});
        }
    }

    pushListener(caller, event, fn) {
        this.listeners[event] = !this.listeners[event] ? [fn] : fn;
        return this;
    }
}
