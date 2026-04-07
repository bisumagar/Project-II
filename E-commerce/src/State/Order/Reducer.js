import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS } from './actionType';

const initialState = {
    orders: [],
    loading: false,
    order: null,
    error: null
}

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                error: null,

                loading: true,
            };

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                error: null,
                success: true,
                loading: false,
                order: action.payload,
            };

        case CREATE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case GET_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
            };

        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                order: action.payload
            };

        case GET_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case GET_ORDER_HISTORY_REQUEST:
            return { ...state, error: null, loading: true };
        case GET_ORDER_HISTORY_SUCCESS:
            return { ...state, error: null, loading: false, orders: action.payload };
        case GET_ORDER_HISTORY_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}