import React from 'react';
import testData from '../../cypress/mocks/testData';
import { render, screen } from '@testing-library/react';
import renderWithContext from '../tests/renderWithContext';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';

afterEach(() => jest.clearAllMocks());

describe('Teste App', () => {
  test('Testa se faz requisição a API, e os inputs são renderizados', async() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));

    await act(async () => {
      renderWithContext(<App />);
    });

    expect(global.fetch).toHaveBeenCalled();
    
    const nameFilter = screen.getByTestId('name-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    
    expect(nameFilter).toBeInTheDocument;
    expect(selectColumn).toBeInTheDocument;
    expect(btnFilter).toBeInTheDocument;
    
    userEvent.type(nameFilter, 'Ta');
    expect(await screen.findByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
    
    userEvent.selectOptions(selectColumn, ['population']);
    userEvent.selectOptions(comparisonFilter, ['maior que']);
    userEvent.type(valueFilter, "1000");
    
    userEvent.click(btnFilter);
    
    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
    
    userEvent.selectOptions(selectColumn, ['orbital_period']);
    userEvent.selectOptions(comparisonFilter, ['menor que']);
    userEvent.type(valueFilter, "402");
    
    userEvent.click(btnFilter);
    
    expect(await screen.findByText('Tatooine')).toBeInTheDocument();
  })
})
