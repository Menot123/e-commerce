// import { useState } from 'react'
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import AdminHome from './components/Admin/AdminHome'
import UserHeader from './components/Header/UserHeader';
import UserFooter from './components/Footer/UserFooter';
import AdminHeader from './components/Header/AdminHeader';
import AdminFooter from './components/Footer/AdminFooter';
import { message } from 'antd';

const UserLayout: React.FC = () => (
  <div>
    <UserHeader />
    <Outlet />
    <UserFooter />
  </div>
);

const AdminLayout: React.FC = () => (
  <div>
    <AdminHeader />
    <Outlet />
    <AdminFooter />
  </div>
);

const App: React.FC = () => {
  const originalPath: string = import.meta.env.VITE_ORIGINAL_PATH as string;

  const [messageApi, contextHolder] = message.useMessage();

  const toastAlert = (type: any, content: any) => {
    messageApi.open({
      type: type,
      content: content,
    });
  };

  return (
    <>
      {contextHolder}
      <Routes>
        {/* Login */}
        <Route path={`${originalPath}/login`} element={<Login toastAlert={toastAlert} />} />

        {/* User Route */}
        <Route path={`${originalPath}/`} element={<UserLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin Route */}
        <Route path={`${originalPath}/admin`} element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
        </Route>

        {/* <Route path={`${originalPath}/`} element={<Home />} />
        <Route path={`${originalPath}/admin`} element={<AdminHome />} /> */}
      </Routes>
    </>
  )
}

export default App
