import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import password from '../../redux/reducers/password';

const rootReducer = combineReducers({ password });

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store,
});

export default renderWithRedux;
