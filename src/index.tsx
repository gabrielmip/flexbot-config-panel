import 'typeface-roboto';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import ConfigPanelPage from './pages/ConfigPanelPage';


ReactDOM.render(
  <HashRouter>
    <Route path='/configPanel/:token' component={ConfigPanelPage} />
  </HashRouter>,
  document.getElementById('root')
);