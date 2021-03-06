'use strict';
import axios from 'axios';


const RECEIVE_CART = "RECEIVE_CART";
const ADD_ITEM = "ADD_ITEM";
const CREATE_ORDER = "CREATE_ORDER";


export const receiveCart = order => ({
  type: RECEIVE_CART, order
});

export const createOrder = order => ({
  type: CREATE_ORDER, order
});

export const addItem = items => ({
  type: ADD_ITEM, items
});

export const deleteItem = (orderId, itemId) =>{
  return (dispatch) => {
    axios.delete(`/api/order/${orderId}/items/${itemId}`)
      .then(response => {
        dispatch(remove(response.data));
      })
  }
}

export const saveItem = order => {
  return (dispatch) => {
    axios.post(`/api/order/${order.id}/items`, order)
    .then(response => {
      dispatch(addItem(response.data));
    });
  };
};

export const saveOrder = (cart) => {
  return (dispatch) => {
    axios.post(`/api/user/${cart.userId}/orders`, cart)
    .then(response => {
      dispatch(createOrder(cart));
    })
  };
};


export const loadCart = userId => {
  return (dispatch) => {
    axios.get(`/api/user/${userId}/orders/inCart`)
      .then(response => {
        dispatch(receiveCart(response.data));
      });
  };
};

export const updateItem = (itemId, order, update) => {
  return (dispatch) => {
    axios.put(`/api/order/${order.id}/items/${itemId}`, update)
    .then(() => {
      dispatch(loadCart(order.user_id));
    })
  };
};

export const updateOrder = (order, update) => {
  return (dispatch) => {
    axios.put(`/api/orders/${order.id}`, update)
    .then(() => {
      dispatch(loadCart(order.user_id));
    })
  };
}

const reducer = (state = {}, action) => {
  const newState = Object.assign({}, state);

  switch(action.type){

    case RECEIVE_CART:
      return Object.assign({}, state, action.order);

    case CREATE_ORDER:
      return Object.assign({}, state, action.order);

    case ADD_ITEM:
      return Object.assign({}, state, action.items);

    default:
      return state;
  }
};

export default reducer;
