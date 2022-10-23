import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/Provider';
import FilterForm from './components/FilterForm';
// import FilterName from './components/FilterName';

function App() {
  return (
    <Provider>
      <FilterForm />
      <Table />
    </Provider>
  );
}

export default App;
