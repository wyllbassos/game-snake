import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Game1 from './pages/Game1';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <AppProvider>
          <Route path="/" exact component={Game1} />
        </AppProvider>
        <Route path="/snake" exact component={() => <div>Hello snake</div>} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
