import React from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PokeList from './components/PokemonList';
import Pokemon from './components/Pokemon';
import BerryList from './components/BerriesList';
import Berry from './components/Berries';
import MachinesList from './components/MachinesList';
import Machines from './components/Machines';
import ErrorNotFound from './components/ErrorNotFound';
import HomePage from './components/HomePage';



function App() {

  return (
      <Router>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Pokedex</h1>
        </header>
        <br />
        <br />
        <div className='App-body'>
            <div className='App-band'>
              <Link className='App-Button' to='/pokemon/page/0'>
                The Pokemon Listing
              </Link>
              
              <Link className='App-Button' to='/berries/page/0'>
                The Berries Listing
              </Link>
              
              <Link className='App-Button' to='/machines/page/0'>
                The Machine Listing
              </Link>
            </div>

            <Switch>

            <Route path='/' exact component={HomePage}></Route>  
            <Route path='/pokemon/page/:pageid' exact component={PokeList} />
            <Route path='/pokemon/:id' exact component={Pokemon} />

            <Route path='/berries/page/:pageid' exact component={BerryList} />
            <Route path='/berries/:id' exact component={Berry} />

            <Route path='/machines/page/:pageid' exact component={MachinesList} />
            <Route path='/machines/:id' exact component={Machines} />
            <Route component={ErrorNotFound}></Route>
            </Switch>

            
        </div>
      </div>

    </Router>

  );
}

export default App;
