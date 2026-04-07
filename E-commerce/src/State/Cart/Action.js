import { api } from "../../Config/apiConfig";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";



export const get = () => async (dispatch) => {
    dispatch({ type: GET_CART_REQUEST })

    try {
        const { data } = await api.get(`/cart`)
        dispatch({ type: GET_CART_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: GET_CART_FAILURE, payload: error.response.data.message })
    }
}

export const addItemToCart = (reqData) => async (dispatch) => {
    dispatch({ type: ADD_ITEM_TO_CART_REQUEST })

    try {
        // Backend may expect flat body: { productId, quantity, size }
        const body = reqData?.data || reqData;
        const { data } = await api.put("/cart/add", body)
        dispatch({ type: ADD_ITEM_TO_CART_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ADD_ITEM_TO_CART_FAILURE, payload: error.response?.data?.message || error.message })
    }
}


export const removeCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: REMOVE_CART_ITEM_REQUEST })

    try {
        const cartItemId = reqData.cartItemId;
        const { data } = await api.delete(`/cart_items/${cartItemId}`)
        // Backend might return the deleted item ID or the full response
        dispatch({ type: REMOVE_CART_ITEM_SUCCESS, payload: data?.id || data || cartItemId })
        // Refetch cart to ensure sync
        dispatch(get())
    } catch (error) {
        console.error("Remove cart item error:", error);
        dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: error.response?.data?.message || error.message })
    }
}


export const updateCartItem = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_CART_ITEM_REQUEST })

    try {
        const { data } = await api.put(`/cart_items/${reqData.cartItemId}`, reqData.data)
        // Update with the response data (includes updated quantity)
        dispatch({ type: UPDATE_CART_ITEM_SUCCESS, payload: data })
        // Refetch cart after a short delay to ensure backend sync
        setTimeout(() => {
            dispatch(get())
        }, 300)
    } catch (error) {
        console.error("Update cart item error:", error);
        dispatch({ type: UPDATE_CART_ITEM_FAILURE, payload: error.response?.data?.message || error.message })
        // Refetch on error to restore correct state
        dispatch(get())
    }
}