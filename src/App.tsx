import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DataProvider } from './DataContext';
import './App.css';
import ModelList from './ModelList';
import ModelEdit from './ModelEdit';
import NewModelForm from './NewModel';

//Envolvemos la aplicacion en Router para poder asignar rutas a nuestros componentes
//Envolvemos el componente DataProvider para poder acceder a los datos de los modelos de toda la aplicacion
//En el caso de Edit se le asigna como ruta el numero id correspondiente

function App() {
  return (
    <Router>
      <DataProvider>
        <div className='App'>
          <Routes>
            <Route path='/' Component={ModelList} />
            <Route path='/edit/:id' Component={ModelEdit} />
            <Route path='/new' Component={NewModelForm} />
          </Routes>
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
