import { api } from "../../Config/apiConfig";
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAILURE, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {
    // dispatch request with the incoming filter data
    dispatch({ type: FIND_PRODUCTS_REQUEST, payload: reqData });

    // match the shape built in Product.jsx - avoid sending "undefined" in URL
    const { color, size, minPrice, maxPrice, discount, category, stock, sort, page, pageSize } = reqData;
    const params = new URLSearchParams();
    const add = (key, val) => { if (val != null && val !== '' && val !== 0 && !(Array.isArray(val) && val.length === 0)) params.set(key, Array.isArray(val) ? val.join(',') : val); };
    add('color', color);
    add('size', size);
    params.set('minPrice', minPrice ?? 0);
    params.set('maxPrice', maxPrice ?? 10000);
    add('minDiscount', discount);
    add('category', category);
    add('stock', stock);
    params.set('sort', sort ?? 'price_low');
    params.set('pageNumber', page ?? 0);
    params.set('pageSize', pageSize ?? 10);

    try {
        const { data } = await api.get(`/products?${params.toString()}`);

        console.log("products data",data);

        dispatch({type: FIND_PRODUCTS_SUCCESS, payload:data})

    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.response.data.message })
    }
}

export const findProductsById = (productId) => async (dispatch) => {
    // dispatch request with the incoming id
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST, payload: productId });
    try {
        const { data } = await api.get(`/products/id/${productId}`);
        dispatch({type: FIND_PRODUCT_BY_ID_SUCCESS, payload:data})

    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.response.data.message })
    }
}

export const createProduct=(product)=>async(dispatch)=>{
    try {
        dispatch({type:CREATE_PRODUCT_REQUEST})

        // api already has baseURL = API_BASE_URL, so use a relative path
        // Map frontend fields to backend-required shape.
        const payload = {
            ...product,
            discountPercent: product.discountedPersent,
            sizes: product.sizes ?? product.size ?? [],
        };
        // Keep a single source of truth for backend contract.
        delete payload.size;

        const { data } = await api.post('/admin/products', payload);
        console.log("created products", data);
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data });
        return data;
    } catch (error) {
        console.error("Create product error:", error.response?.data || error.message);
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.response?.data?.message || error.message });
        throw error;
    }
}

export const deleteProduct=(productId)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_PRODUCT_REQUEST})

        // Typical REST pattern: DELETE /admin/products/{id}
        const {data}= await api.delete(`/admin/products/${productId}`);

        console.log("delete product",data)
        dispatch({
            type:DELETE_PRODUCT_SUCCESS,
            payload:productId,
        })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.response.data.message })
    
        
    }
}