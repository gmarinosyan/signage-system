import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import MediaPage from './pages/mediaPage';
import NewsPage from './pages/newsPage';
import SettingsPage from './pages/settingsPage';
import './index.css';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

const router = (
	<Router history={browserHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={MediaPage}></IndexRoute>
			<Route path="/news" component={NewsPage}></Route>
			<Route path="/settings" component={SettingsPage}></Route>
		</Route>		
	</Router>
)

ReactDOM.render(
  router,
  document.getElementById('root')
);
