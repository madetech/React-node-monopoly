/**
 * Main routing file
 * В серверной части приложения веб-сервер express передаст URL запроса функции match из react-router.
 * Она либо вернет renderProps, которые мы сможем использовать для рендеринга запрошенного пользователем контента,
 * либо сообщит, что совпадений нет, и тогда мы вернем страницу с 404 ошибкой.
 *
 * В клиентскую часть приложения мы тоже внесем изменения, чтобы библиотека react-router смогла отслеживать изменения URL.
 * Если новый URL соответствует одному из настроенных путей,
 * то клиентский JavaScript обновит контент страницы без обращения к серверу.
 * Если же новый URL не соответствует ни одному из настроенных путей,
 * то браузером будет выполнен классический переход по ссылке.
 */

import React from 'react';
import { IndexRoute, Route }  from 'react-router';

import App from 'components/App';
import Game from 'components/Game';
import Setup from 'components/Game/Setup';


export default (
    <Route component={App} path='/'>
        <IndexRoute component={Setup} />
            <Route component={Game} path='monopoly'/>
        {/*<Route component={CounterPage} path='counters' />
            <Route component={TimePage} path='time' />*/}
            <Route component={Setup} path='setup' />
    </Route>
);
