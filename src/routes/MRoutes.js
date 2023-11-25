import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import YoutubeMain from '../pages/youtube/YoutubeMain';
import AdminMain from '../pages/admin/AdminMain';
import CommonCode from '../pages/admin/CommonCode';
import NotServicePage from '../pages/etc/NotService';
import YoutubePastor from '../pages/youtube/YoutubePastor';
import Login from '../pages/logon/Login';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import Error from '../pages/etc/Error';

export default function MRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Home />} />
          <Route path="/youtube" element={<YoutubeMain />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/common-code" element={<CommonCode />} />
          <Route path="/not-work" element={<NotServicePage />} />
          <Route path="/youtube-pastor" element={<YoutubePastor />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
