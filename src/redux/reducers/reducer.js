import PersistedStore from '../store/store';
import ActionTypes from '../../constants/action';
import Consts from '../../constants/consts'

export default function reducer(state = PersistedStore.loadState(), action) {
    switch (action.type) {
        case ActionTypes.USER_LOGIN: {
            return { ...state, user: action.payload }
        }
        case ActionTypes.USER_LOGOUT: {
            PersistedStore.clearState();
            return { ...state, user: null, products: [] }
        }
        case ActionTypes.PRODUCT_ADDED: {
            let products = [...state.products, action.payload]
            return { ...state, products }
        }
        case ActionTypes.FILTER_APPLIED: {
            const { comparator, parameter } = action.payload;
            if (!parameter) return state;
            else {
                let products = state.products;
                let temp;
                if (parameter === Consts.PRICE && comparator === Consts.LOW_TO_HIGH) {
                    temp = products.sort((left, right) => {
                        return left.price - right.price;
                    })
                } else
                    if (parameter === Consts.PRICE && comparator === Consts.HIGH_TO_LOW) {
                        temp = products.sort((left, right) => {
                            return right.price - left.price;
                        })
                    } else
                        if (parameter === Consts.QUANTITY && comparator === Consts.LOW_TO_HIGH) {
                            temp = products.sort((left, right) => {
                                return left.quantity - right.quantity;
                            })
                        } else
                            if (parameter === Consts.QUANTITY && comparator === Consts.HIGH_TO_LOW) {
                                temp = products.sort((left, right) => {
                                    return right.quantity - left.quantity;
                                })
                            }
                return { ...state, products: temp }
            }
        }
        default: return state
    }
}