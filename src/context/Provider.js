import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import MyContext from './MyContext';
import Fetch from '../helpers/Fetch';

function Provider(props) {
  const { children } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      setData(await Fetch());
    };
    requestApi();
  }, []);

  const contexto = data;

  // const context = {
  //   data,
  // };

  return (
    <MyContext.Provider value={ contexto }>
      <div>
        {children}

      </div>
    </MyContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.func,
}.isRequired;
