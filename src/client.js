/**
 * Created by avv123avv on 03.01.17.
 */
'use strict';

import React      from 'react';
import ReactDOM   from 'react-dom';
import App        from 'components/App';

// import routes libraries
import { browserHistory, Router } from 'react-router';
import routes from './routes';

// connect Redux
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

const component = (
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>
);
ReactDOM.render(component, document.getElementById('react-view'));