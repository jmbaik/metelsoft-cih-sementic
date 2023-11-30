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
import AreaCode from '../pages/admin/AreaCode';
import GridTest from '../pages/etc/GridTest';
import ChurchList from '../pages/admin/ChurchList';
import FromTest from '../pages/etc/FromTest';
import PastorList from '../pages/admin/PastorList';
import ChannelList from '../pages/youtube/ChannelList';

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
          <Route path="/home" element={<Home />} />
          <Route path="/youtube" element={<YoutubeMain />} />
          <Route path="/admin" element={<AdminMain />} />
          <Route path="/common-code" element={<CommonCode />} />
          <Route path="/not-work" element={<NotServicePage />} />
          <Route path="/youtube-pastor" element={<YoutubePastor cr="r" />} />
          <Route path="/area-code" element={<AreaCode />} />
          <Route path="/church-code" element={<ChurchList cr="r" />} />
          <Route path="/pastor-code" element={<PastorList cr="r" />} />
          <Route path="/youtube-channel" element={<ChannelList cr="r" />} />
          <Route path="/grid-test" element={<GridTest />} />
          <Route path="/form-test" element={<FromTest />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
