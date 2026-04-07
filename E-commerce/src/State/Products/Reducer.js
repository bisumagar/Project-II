import { DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType"

const initialState ={
    products:[],
    product : null,
    totalPages: 0,
    loading:false,
    error:null
} 
 export const customerProductReducer = (state= initialState,action ) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
            case FIND_PRODUCT_BY_ID_REQUEST:
                return {...state, loading:true,error:null}

        case FIND_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: action.payload?.content ?? action.payload ?? [],
                totalPages: action.payload?.totalPages ?? 0,
            }

        case FIND_PRODUCT_BY_ID_SUCCESS: {
            const payload = action.payload;
            const singleProduct = Array.isArray(payload?.content) && payload.content.length
                ? payload.content[0]
                : payload;
            return {...state, loading:false, error:null, product: singleProduct};
        }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading:false,
                error:null,
                // remove the deleted product from the current list so UI updates without refresh
                products: state.products.filter(
                    (item) => item._id !== action.payload && item.id !== action.payload
                ),
                deletedProduct: action.payload,
            }

        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:    
            return {...state, loading:false, error:action.payload}
               


            default:
                return state;
    }
}