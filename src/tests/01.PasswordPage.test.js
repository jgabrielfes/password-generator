import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRedux from './helpers/renderWithRedux';

describe('1. Testa a página do Password Generator', () => {
  test('Se possui o texto "CLICK GENERATE" inicialmente.', () => {
    renderWithRedux(<App />);
    expect(screen.getByText('CLICK GENERATE')).toBeInTheDocument();
  });
  test('Se o tamanho inicial é 16.', () => {
    renderWithRedux(<App />);
    const length = screen.getByRole('slider');
    expect(length).toHaveValue('16');
  });
  test('Os limites do tamanho da senha.', () => {
    renderWithRedux(<App />);
    const length = screen.getByRole('slider');
    fireEvent.change(length, { target: { value: '3' } });
    expect(length).toHaveValue('4');
    fireEvent.change(length, { target: { value: '33' } });
    expect(length).toHaveValue('32');
  });
  test('Se inicialmente não inclui símbolos', () => {
    renderWithRedux(<App />);
    const uppercase = screen.getByLabelText('Include Uppercase');
    expect(uppercase).toBeChecked();
    const lowercase = screen.getByLabelText('Include Lowercase');
    expect(lowercase).toBeChecked();
    const numbers = screen.getByLabelText('Include Numbers');
    expect(numbers).toBeChecked();
    const symbols = screen.getByLabelText('Include Symbols');
    expect(symbols).not.toBeChecked();
  });
  test('Se a página possui os botões para copiar e para gerar a senha', () => {
    renderWithRedux(<App />);
    const copyBtn = screen.getByRole('button', { name: 'CLICK GENERATE' });
    const generateBtn = screen.getByRole('button', { name: 'Generate Password' });
    expect(copyBtn).toBeInTheDocument();
    expect(generateBtn).toBeInTheDocument();
  });
});
