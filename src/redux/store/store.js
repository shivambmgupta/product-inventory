import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer';

const LOCAL_STORAGE_NAME = "productsIvLocalData";

class PersistedStore {

    // Singleton property
    static DefaultStore = null;

    static getDefaultStore() {
        if (PersistedStore.DefaultStore === null) {
            PersistedStore.DefaultStore = new PersistedStore();
        }

        return PersistedStore.DefaultStore;
    }

    // Redux store
    _store = null;

    constructor() {
        this.initStore()
    }

    initStore() {
        this._store = createStore(rootReducer, compose(applyMiddleware(thunk)));
        this._store.subscribe(() => {
            PersistedStore.saveState(this._store.getState());
        });
    }

    // Getter to access the Redux store
    get store() {
        return this._store;
    }

    static loadState() {
        try {
            let serializedState = localStorage.getItem(LOCAL_STORAGE_NAME);

            if (serializedState === null) {
                return PersistedStore.initialState();
            }

            return JSON.parse(serializedState);
        } catch (err) {
            return PersistedStore.initialState();
        }
    }

    static saveState(state) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem(LOCAL_STORAGE_NAME, serializedState);
        } catch (err) { }
    }

    static clearState() {
        try {
            localStorage.removeItem(LOCAL_STORAGE_NAME);
        } catch (err) {} 
    }

    // Return whatever you want your initial state to be
    static initialState() {
        return { user: null, products: [] };
    }
}

export default PersistedStore;