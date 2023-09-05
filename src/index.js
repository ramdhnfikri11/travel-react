import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import store from './handler/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/template/home';
import HomeLayout from './component/page/homeLayout';
import Login from './component/page/login';

import Dashboard from './component/page/dashboard';
import Layout from './component/page/layout';
import NotFound from './component/page/errorPage/404';

import TravelEmployee from './component/page/travelEmployee';
import TravelManager from './component/page/travelManager';
import TravelHR from './component/page/travelHR';

import PosttravelEmployee from './component/page/posttravelEmploye';
import PosttravelManager from './component/page/posttravelManager';
import PosttravelHR from './component/page/posttravelHR';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='travelEmployee' element={<TravelEmployee />} />
            <Route path='travelManager' element={<TravelManager />} />
            <Route path='travelHR' element={<TravelHR />} />
            <Route path='posttravelEmployee' element={<PosttravelEmployee />} />
            <Route path='posttravelManager' element={<PosttravelManager />} />
            <Route path='posttravelHR' element={<PosttravelHR />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
          </Route>
          <Route path='/' element={<Layout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='travelEmployee' element={<TravelEmployee />} />
            <Route path='travelManager' element={<TravelManager />} />
            <Route path='travelHR' element={<TravelHR />} />
            <Route path='posttravelEmployee' element={<PosttravelEmployee />} />
            <Route path='posttravelManager' element={<PosttravelManager />} />
            <Route path='posttravelHR' element={<PosttravelHR />} />
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
