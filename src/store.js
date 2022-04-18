import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { discountCreateReducer, discountListReducer, discountDetailReducer, discountDeleteReducer, discountUpdateReducer } from './reducers/discountReducers'
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderListAllReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer, 
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    cart: cartReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userList: userListReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
    orderListAll: orderListAllReducer,
    discountCreate: discountCreateReducer,
    discountList: discountListReducer,
    discountDetails: discountDetailReducer,
    discountDelete: discountDeleteReducer,
    discountUpdate: discountUpdateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
        JSON.parse(localStorage.getItem('shippingAddress')) : { }

const discountCodeFromStorage = localStorage.getItem('discountCode') ?
        JSON.parse(localStorage.getItem('discountCode')) : { }

const initialState = {
    cart:
    { 
        cartItems: cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage,
        discountCode: discountCodeFromStorage,
    },
    userLogin:{userInfo: userInfoFromStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store