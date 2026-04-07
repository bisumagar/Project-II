
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { thunk } from "redux-thunk"
import adminOrderReducer from "./Admin/Order/Reducer"
import { authReducer } from "./Auth/Reducer"
import { cartReducer } from "./Cart/Reducer"
import { orderReducer } from "./Order/Reducer"
import { customerProductReducer } from "./Products/Reducer"
const rootReducers = combineReducers({
    auth:authReducer,
    product:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
    adminOrder:adminOrderReducer,



})
export const store= legacy_createStore(rootReducers,applyMiddleware(thunk))