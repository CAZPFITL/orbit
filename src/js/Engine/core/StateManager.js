export default class StateManager {
    state = 'LOAD_ENGINE'
    setState = (state) => this.state = state
}