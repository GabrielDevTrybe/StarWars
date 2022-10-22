import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';
// import FilterName from './components/FilterName';

function App() {
  return (
    <Provider>
      {/* <FilterName /> */}
      <Table />
    </Provider>
  );
}

export default App;
