import React from 'react';

import { Game1Provider } from './game1';

// import { Container } from './styles';

const Hooks: React.FC = ({ children }) => {
  return <Game1Provider>{children}</Game1Provider>;
};

export default Hooks;
