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

import LayoutHR from './component/page/layoutHR';
import LayoutManager from './component/page/layoutManager';
import LayoutEmployee from './component/page/layoutEmployee';

import TravelEmployee from './component/page/travelEmployee';
import TravelManager from './component/page/travelManager';
import TravelHR from './component/page/travelHR';

import PosttravelEmployee from './component/page/posttravelEmploye';
import PosttravelManager from './component/page/posttravelManager';
import PosttravelHR from './component/page/posttravelHR';

import NotFound from './component/page/errorPage/404';
import DashboardHR from './component/page/dashboardH';
import DashboardManager from './component/page/dashboardM';
import DashboardEmployee from './component/page/dashboardE';






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

          {/* hr */}
          <Route path='/' element={<LayoutHR />}>
            <Route path='dashboardH' element={<DashboardHR/>} />
            <Route path='travelHR' element={<TravelHR />} />
            <Route path='posttravelHR' element={<PosttravelHR />} />
          </Route>

          {/* manager */}
          <Route path='/' element={<LayoutManager />}>
            <Route path='dashboardM' element={<DashboardManager />} />
            <Route path='travelManager' element={<TravelManager />} />
            <Route path='posttravelManager' element={<PosttravelManager />} />
          </Route>
          
          {/* employee */}
          <Route path='/' element={<LayoutEmployee />}>
            <Route path='dashboardE' element={<DashboardEmployee/>} />
            <Route path='travelEmployee' element={<TravelEmployee />} />
            <Route path='posttravelEmployee' element={<PosttravelEmployee />} />
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
