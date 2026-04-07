import { api } from "../../../Config/apiConfig";
import { CONFIRMED_ORDER_FAILURE, CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType";



export const getOrders = () =>{
    console.log("get all orders");

    return async(dispatch) =>{
        dispatch({type:GET_ORDERS_REQUEST});

        try {
            // api already has baseURL = API_BASE_URL, so call relative admin endpoint
            const response=await  api.get(`/admin/orders/`);
            console.log("get all orders",response.data);
            dispatch({type:GET_ORDERS_SUCCESS,payload:response.data});

        } catch (error) {
            
            console.log("catch error",error);
            dispatch({type:GET_ORDERS_FAILURE,payload:error.message});
        }
    };
};

export const confirmOrder = (orderId) => async(dispatch) =>{
    dispatch({type:CONFIRMED_ORDER_REQUEST});

    

        try {
            const response=await  api.put(`/admin/orders/${orderId}/confirmed`);

            const data = response.data;
            console.log("confirmed order",data)
            dispatch({type:CONFIRMED_ORDER_SUCCESS,payload:data});
            dispatch(getOrders());

        } catch (error) {
            
            console.log("catch error",error);
            dispatch({type:CONFIRMED_ORDER_FAILURE,payload:error.message});
        }
    };


    export const shipOrder = (orderId) =>{

    return async(dispatch) =>{
        try {
           dispatch({type:SHIP_ORDER_REQUEST});
            const {data}=await  api.put(`/admin/orders/${orderId}/ship`);
            console.log("shipped order",data);
            dispatch({type:SHIP_ORDER_SUCCESS,payload:data});
            dispatch(getOrders());

        } catch (error) {
            
            
            dispatch({type:SHIP_ORDER_FAILURE,payload:error.message});
        }
    };
};


export const deliverOrder = (orderId) =>  async(dispatch) =>{
        dispatch({type:DELIVERED_ORDER_REQUEST});
    try {
           
            const response = await  api.put(`/admin/orders/${orderId}/deliver`);
            const data = response.data;
            console.log("delivered order",data);
            dispatch({type:DELIVERED_ORDER_SUCCESS,payload:data});
            dispatch(getOrders());

        } catch (error) {
            
            
            dispatch({type:DELETE_ORDER_FAILURE,payload:error.message});
        }
    };
    
    
// export const cancelOrder = (orderId) =>  async(dispatch) =>{
//         dispatch({type:CANCELED_ORDER_REQUEST});
//     try {
           
//             const response = await  api.put(`/api/admin/orders/${orderId}/cancel`);
//             const data = response.data;
//             console.log("canceled order",data);
//             dispatch({type:CANCELED_ORDER_SUCCESS,payload:data});

//         } catch (error) {
            
            
//             dispatch({type:CANCELED_ORDER_FAILURE,error:error.message});
//         }
//     };

    
export const deleteOrder = (orderId) =>  async(dispatch) =>{
        dispatch({type:DELETE_ORDER_REQUEST});
    try {
           
            const response = await  api.put(`/admin/orders/${orderId}/delete`);
            const data = response.data;
            console.log("delete order",data);
            dispatch({type:DELETE_ORDER_SUCCESS,payload:orderId});

        } catch (error) {
            
            
            dispatch({type:DELETE_ORDER_FAILURE,payload:error.message});
        }
    };