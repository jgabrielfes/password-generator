import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRedux from './helpers/renderWithRedux';

const GENERATE_TEXT = 'Generate Password';
const UPPERCASE_TEXT = 'Include Uppercase';
const LOWERCASE_TEXT = 'Include Lowercase';
const NUMBERS_TEXT = 'Include Numbers';
const LENGTH_TEST = 32;
// eslint-disable-next-line max-len
const REGEX_ALL = /(?=(.*[A-Z]))(?=(.*[a-z]))(?=(.*[0-9]))(?=(.*[ !"#$%&'()*+,-./:;<=>?@[\]\\^_`{|}~]))/;

describe('2. Testa as senhas geradas', () => {
  test('Se a senha foi gerada e guardada.', () => {
    renderWithRedux(<App />);
    const generateBtn = screen.getByRole('button', { name: GENERATE_TEXT });
    fireEvent.click(generateBtn);
    expect(localStorage.password).not.toBeUndefined();
  });
  test('Se a senha não é gerada quando nenhuma configuração é selecionada.', () => {
    renderWithRedux(<App />);
    localStorage.clear();
    const uppercase = screen.getByLabelText(UPPERCASE_TEXT);
    fireEvent.click(uppercase);
    const lowercase = screen.getByLabelText(LOWERCASE_TEXT);
    fireEvent.click(lowercase);
    const numbers = screen.getByLabelText(NUMBERS_TEXT);
    fireEvent.click(numbers);
    const generateBtn = screen.getByRole('button', { name: GENERATE_TEXT });
    fireEvent.click(generateBtn);
    expect(localStorage.password).toBeUndefined();
  });
  test('Se é gerada com o tamanho correto.', () => {
    renderWithRedux(<App />);
    const length = screen.getByRole('slider');
    fireEvent.change(length, { target: { value: '32' } });
    const generateBtn = screen.getByRole('button', { name: GENERATE_TEXT });
    fireEvent.click(generateBtn);
    expect(localStorage.password.length).toBe(LENGTH_TEST);
  });
  test('Se é gerada somente com maiúsculas.', () => {
    renderWithRedux(<App />);
    const lowercase = screen.getByLabelText(LOWERCASE_TEXT);
    fireEvent.click(lowercase);
    const numbers = screen.getByLabelText(NUMBERS_TEXT);
    fireEvent.click(numbers);
    const generateBtn = screen.getByRole('button', { name: GENERATE_TEXT });
    fireEvent.click(generateBtn);
    expect(/^[A-Z]+$/.test(localStorage.password)).toBe(true);
  });
  test('Se é gerada somente com minúsculas.', () => {
    renderWithRedux(<App />);
    const length = screen.getByRole('slider');
    fireEvent.change(length, { target: { value: '32' } });
    const uppercase = screen.getByLabelText(UPPERCASE_TEXT);
    fireEvent.click(uppercase);
    const numbers = screen.getByLabelText(NUMBERS_TEXT);
    fireEvent.click(numbers);
    const generateBtn = screen.getByRole('button', { name: GENERATE_TEXT });
    fireEvent.click(generateBtn);
    expect(/^[a-z]+$/.test(localStorage.password)).toBe(true);
  });
  test('Se é gerada somente com números.', () => {
    renderWithRedux(<App />);
    const uppercase = screen.getByLabelText(UPPERCASE_TEXT);
    fireEvent.click(uppercase);
    const lowercase = screen.getByLabelText(LOWERCASE_TEXT);
    fireEvent.click(lowercase);
    const generateBtn = screen.getByRole('button', { name: GENERATE_TEXT });
    fireEvent.click(generateBtn);
    expect(/^[0-9]+$/.test(localStorage.password)).toBe(true);
  });
  test('Se é gerada somente com símbolos.', () => {
    renderWithRedux(<App />);
    const uppercase = screen.getByLabelText(UPPERCASE_TEXT);
    fireEvent.click(uppercase);
    const lowercase = screen.getByLabelText(LOWERCASE_TEXT);
    fireEvent.click(lowercase);
    const numbers = screen.getByLabelText(NUMBERS_TEXT);
    fireEvent.click(numbers);
    const symbols = screen.getByLabelText('Include Symbols');
    fireEvent.click(symbols);
    const generateBtn = screen.getByRole('button', { name: GENERATE_TEXT });
    fireEvent.click(generateBtn);
    expect(/^[A-Z]+$/.test(localStorage.password)).toBe(false);
    expect(/^[a-z]+$/.test(localStorage.password)).toBe(false);
    expect(/^[0-9]+$/.test(localStorage.password)).toBe(false);
  });
  test('Se é gerada todos com os tipos.', () => {
    renderWithRedux(<App />);
    const symbols = screen.getByLabelText('Include Symbols');
    fireEvent.click(symbols);
    const generateBtn = screen.getByRole('button', { name: GENERATE_TEXT });
    fireEvent.click(generateBtn);
    expect(REGEX_ALL.test(localStorage.password)).toBe(true);
  });
});
