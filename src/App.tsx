import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GlobalStyle from './styles/global';

import Game1 from './pages/Game1';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Game1} />
        <Route path="/snake" exact component={() => <div>Hello snake</div>} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
};

export default App;
