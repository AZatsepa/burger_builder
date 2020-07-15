import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import * as actions from '../actions';

export function* purchaseBurgerSaga({ token, orderData }) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(`/orders.json?auth=${token}`, orderData);
    yield put(actions.purchaseBurgerSuccess(response.data.name, orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({ token, userId }) {
  yield put(actions.fetchOrdersStart());
  const queryParams = yield `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  try {
    const response = yield axios.get(`/orders.json${queryParams}`);
    const fetchedOrders = yield [];
    for (const key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
