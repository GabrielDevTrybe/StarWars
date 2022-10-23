import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function FilterForm() {
  const {
    nameFilter,
    columFilter,
    comparisonFilter,
    numberFilter,
    handleChangeName,
    handleChangeColumFilter,
    handleComparisonFilter,
    handleNumberFilter,
    filterSelect,
    initial,
  } = useContext(MyContext);
  return (

    <section>
      <label htmlFor="name">
        Name:
        <input
          data-testid="name-filter"
          type="text"
          name="name"
          onChange={ handleChangeName }
          value={ nameFilter }
        />
      </label>

      <select
        data-testid="column-filter"
        onChange={ handleChangeColumFilter }
        value={ columFilter }
      >
        {
          initial.map((elem, index) => (
            <option key={ index }>{elem}</option>

          ))

        }

      </select>

      <select
        data-testid="comparison-filter"
        onChange={ handleComparisonFilter }
        value={ comparisonFilter }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>

      </select>

      <label htmlFor="number-filter">
        Number:
        <input
          value={ numberFilter }
          data-testid="value-filter"
          name="number-filter"
          type="number"
          onChange={ handleNumberFilter }
        />
      </label>

      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterSelect }
      >
        Filtrar
      </button>

    </section>
  );
}

export default FilterForm;
