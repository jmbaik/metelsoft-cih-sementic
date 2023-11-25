import React, { useState } from 'react';
import { Header, Icon, Image, Input, Label, Menu } from 'semantic-ui-react';
import Notification from './Notification';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { searchTextState, smallMenuState } from '../atoms/GlobalState';
import { adminUserState } from '../atoms/adminUserState';
import { RxAvatar } from 'react-icons/rx';

export default function TopMenu() {
  const user = useRecoilValue(adminUserState);
  const setSearchText = useSetRecoilState(searchTextState);
  const [smallMenu, setSmallMenu] = useRecoilState(smallMenuState);
  const doSearch = (e) => {
    setSearchText(e.target.value);
  };
  const toggleSideMenu = () => {
    setSmallMenu(!smallMenu);
  };

  return (
    <Menu fixed="top" className="top-menu">
      <Menu.Item className="logo-space-menu-item">
        <div className="display-inline-logo logo-space">
          <div>
            <Image src="./assets/cross.png" />
          </div>
          <div>
            <Header as="h3">내손안의 교회</Header>
          </div>
        </div>
      </Menu.Item>

      <Menu.Item className="no-border" onClick={toggleSideMenu}>
        <Icon name="bars" />
      </Menu.Item>

      <Menu.Item className="no-border drop-left-padding">
        <Input
          className="icon"
          icon="search"
          placeholder="Search..."
          onChange={doSearch}
        />
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item className="no-border" position="right">
          <Notification />
          <Label
            className="label-on-corner"
            color="teal"
            size={'mini'}
            floating
            circular
          >
            22
          </Label>
        </Menu.Item>
        <Menu.Item className="no-border" position="right">
          <div className="display-inline">
            {/* <Image
              circular
              size={'mini'}
              src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
            /> */}
            <RxAvatar size="40" />
            {user?.name}님
          </div>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
