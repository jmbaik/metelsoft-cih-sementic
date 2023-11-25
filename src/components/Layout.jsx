import React from 'react';
import TopMenu from './TopMenu';
import SideMenu from './SideMenu';
import { Menu } from 'semantic-ui-react';
import TextIcon from '../bundle/TextIcon';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="grid">
      <div className="menu">
        <TopMenu />
      </div>
      <div className="main-content">
        <SideMenu>
          <Outlet />
        </SideMenu>
      </div>
    </div>
  );
}
