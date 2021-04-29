
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers/index'
import rootSaga from './sagas/rootSaga'

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  },
  employeeSignin: {
    employeeInfo: localStorage.getItem('employeeInfo')
    ? JSON.parse(localStorage.getItem('employeeInfo'))
    : null,
  }
}
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      })
    : compose

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const enhancers = composeEnhancers(
  applyMiddleware(...middleware),
)

const store = createStore(reducers, initialState, enhancers)

sagaMiddleware.run(rootSaga)

export default store
