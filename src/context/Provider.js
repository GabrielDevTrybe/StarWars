import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MyContext from './MyContext';
import Fetch from '../helpers/Fetch';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [nameFilter, setName] = useState('');
  const [columFilter, setColumFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [initial, setInitial] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const handleChangeName = ({ target }) => {
    const { value } = target;
    setName(value);
  };

  const handleChangeColumFilter = ({ target }) => {
    const { value } = target;

    setColumFilter(value);
  };

  const handleComparisonFilter = ({ target }) => {
    const { value } = target;

    setComparisonFilter(value);
  };

  const handleNumberFilter = ({ target }) => {
    const { value } = target;

    setNumberFilter(value);
  };

  const filterSelect = useCallback(() => {
    if (comparisonFilter === 'maior que') {
      setData(data.filter((e) => Number(e[columFilter]) > Number(numberFilter)));
    } else if (comparisonFilter === 'menor que') {
      setData(data.filter((e) => Number(e[columFilter]) < Number(numberFilter)));
    } else {
      setData(data.filter((e) => Number(e[columFilter]) === Number(numberFilter)));
    }
    const filter = initial.filter((element) => element !== columFilter);
    setInitial(filter);
    setColumFilter(filter[0]);
  }, [comparisonFilter, data, numberFilter, columFilter, initial]);

  useEffect(() => {
    const requestApi = async () => {
      setData(await Fetch());
    };
    requestApi();
  }, []);

  const value = useMemo(() => ({
    data,
    nameFilter,
    columFilter,
    comparisonFilter,
    numberFilter,
    initial,
    handleChangeName,
    handleChangeColumFilter,
    handleComparisonFilter,
    handleNumberFilter,
    filterSelect,
  }), [
    data,
    nameFilter,
    columFilter,
    comparisonFilter,
    numberFilter,
    initial,
    handleChangeName,
    handleChangeColumFilter,
    handleComparisonFilter,
    handleNumberFilter,
    filterSelect,
  ]);

  // const contexto = data;

  // const context = {
  //   data,
  // };

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.func,
}.isRequired;
