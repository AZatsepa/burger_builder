import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
  yield all([
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga),
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
