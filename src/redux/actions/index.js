import ActionTypes from '../../constants/action';
export default class Action {
    static userLogin = (user) => { 
        return { type: ActionTypes.USER_LOGIN, payload: user };
    }
    static userLogout = () => {
        return { type: ActionTypes.USER_LOGOUT };
    }
    static addProduct = (product) => {
        return { type: ActionTypes.PRODUCT_ADDED, payload: product };
    }
    static filterApplied = (filterParam) => {
        return {type: ActionTypes.FILTER_APPLIED, payload: filterParam };
    }
}