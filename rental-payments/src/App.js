import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import GetStart from './GetStart.js';
import SearchPage from './SearchPage.js';
import LeasePayment from './LeasePayment.js';

import './App.css';

function App() {
    return (
      <main>
        <BrowserRouter>
            <Switch>
              <Route exact path="/search" component={SearchPage}/>
              <Route exact path="/leases.html" component={LeasePayment}/>
              <Route path="/" render={()=><GetStart />}/>
            </Switch>
        </BrowserRouter>
      </main> 
    );
}

export default App;
