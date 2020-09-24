import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import { HashRouter, Route , Switch } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import AdminLoginPage from './components/AdminLoginPage/AdminLoginPage';
import CategoryPage from './components/CategoryPage/CategoryPage';
import AdministratorDashboard from './components/AdministratorDashboard/AdministratorDashboard';
import AdministratorDashboardCategory from './components/AdministratorDashboardCategory/AdministratorDashboardCategory';
import { AdminLogoutPage } from './components/AdminLogoutPage/AdminLogoutPage';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route exact path="/" component= { HomePage } />
        <Route path ="/contact" component = { ContactPage } />
        <Route path ="/administrator/login" component = { AdminLoginPage } />
        <Route path ="/administrator/logout" component = { AdminLogoutPage } />
        <Route path ="/category/:cId" component= { CategoryPage } />
        <Route exact path ="/administrator/dashboard" component = { AdministratorDashboard } />
        <Route path ="/administrator/dashboard/category" component = { AdministratorDashboardCategory } />
        {/* <Route path ="/administrator/dashboard/product" component = { AdministratorDashboardProduct } /> */}
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
