import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";

const initialState = {
    cart: null,
    loading: false,
    error: null,
    cartItems: [],

}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_ITEM_TO_CART_SUCCESS:
            const payloadItems = action.payload?.cartItems ?? action.payload?.cart?.cartItems;
            const newItems = Array.isArray(payloadItems) ? payloadItems : (action.payload?.cartItem ? [...state.cartItems, action.payload.cartItem] : state.cartItems);
            return { ...state, cart: action.payload?.cart ?? action.payload, cartItems: newItems, loading: false };

        case ADD_ITEM_TO_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case GET_CART_REQUEST:
            return { ...state, loading: true, error: null };

        case GET_CART_SUCCESS:
            return { ...state, cartItems: action.payload.cartItems, cart: action.payload, loading: false };

        case GET_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case REMOVE_CART_ITEM_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }

        case REMOVE_CART_ITEM_SUCCESS:
            const removedId = action.payload?.id || action.payload?.cartItemId || action.payload;
            return {
                ...state, 
                cartItems: state.cartItems.filter(
                    (item) => {
                        const itemId = item.id || item._id;
                        return itemId && itemId.toString() !== removedId.toString();
                    }
                ), 
                loading: false
            };

        case UPDATE_CART_ITEM_SUCCESS:
            const updatedId = action.payload?.id || action.payload?._id;
            // Update the item optimistically - merge the updated data
            const updatedItems = state.cartItems.map((item) => {
                const itemId = item.id || item._id;
                if (itemId && itemId.toString() === updatedId.toString()) {
                    // Merge the updated payload with existing item data
                    return { ...item, ...action.payload };
                }
                return item;
            });
            return {
                ...state,
                cartItems: updatedItems,
                loading: false,
            };

        case REMOVE_CART_ITEM_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
            return { ...state, loading: false, error: action.payload };





        default:
            return state
    }
}