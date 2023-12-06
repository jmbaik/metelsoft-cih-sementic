import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeSideItemState, smallMenuState } from '../atoms/GlobalState';
import { Sidebar, Menu as PMenu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { RiAdminLine } from 'react-icons/ri';
import { IoCodeWorkingSharp } from 'react-icons/io5';
import { TfiYoutube } from 'react-icons/tfi';
import { IoIosPersonAdd } from 'react-icons/io';
import { MdOutlineChurch } from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { GrChannel } from 'react-icons/gr';
import { RiUserStarLine } from 'react-icons/ri';
import { FaYoutube } from 'react-icons/fa';
import { GiPublicSpeaker } from 'react-icons/gi';
import { GiWinterGloves } from 'react-icons/gi';
import { SiYoutubeshorts } from 'react-icons/si';
import { BsDatabaseDown } from 'react-icons/bs';
import { MdOutlineYoutubeSearchedFor } from 'react-icons/md';
import { MdOutlinePlaylistPlay } from 'react-icons/md';
import { GiLifeBar } from 'react-icons/gi';

export default function SideMenu(props) {
  const [activeItem, setActiveItem] = useRecoilState(activeSideItemState);
  const smallMenu = useRecoilValue(smallMenuState);
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };
  return (
    <div className="parent">
      <div className={(smallMenu ? 'small-side ' : '') + 'side'}>
        <MenuItems
          activeItem={activeItem}
          handleItemClick={handleItemClick}
          smallMenu={smallMenu}
          setActiveItem={setActiveItem}
        />
      </div>
      <div className={(smallMenu ? 'small-content ' : '') + 'content'}>
        {props.children}
      </div>
    </div>
  );
}

function SideMenuItem({ title, to, selected, setSelected, smallMenu, icon }) {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <div style={{ whiteSpace: 'nowrap', display: 'inline-flex' }}>
        <div
          style={{ alignSelf: 'center', paddingLeft: '6px' }}
          hidden={smallMenu}
        >
          {/* <Header as="h6>{title}</Header> */}
          <div
            style={
              selected === title
                ? { fontWeight: 'bold', fontSize: '13px' }
                : { fontSize: '12px' }
            }
          >
            {title}
          </div>
        </div>
      </div>
    </MenuItem>
  );
}

function SideSubMenu({ smallMenu, title, icon, children }) {
  return (
    <SubMenu
      label={smallMenu ? '' : title}
      {...(smallMenu ? { icon: icon } : {})}
      defaultOpen={true}
    >
      {children}
    </SubMenu>
  );
}

function MenuItems(props) {
  return (
    <Menu
      fixed={'left'}
      borderless
      className={(props.smallMenu ? 'small-side' : '') + ' side'}
      vertical
    >
      <Sidebar>
        <PMenu>
          <SideSubMenu
            title="관리자"
            smallMenu={props.smallMenu}
            icon={<RiAdminLine size={20} />}
          >
            <SideMenuItem
              title="지역코드"
              to="/area-code"
              icon={<IoCodeWorkingSharp size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="교회코드관리"
              to="/church-code"
              icon={<MdOutlineChurch size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="목사님 등록"
              to="/pastor-code"
              icon={<IoIosPersonAdd size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="사용자 관리"
              to="/not-work"
              icon={<FiUsers size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
          </SideSubMenu>
        </PMenu>
        <PMenu>
          <SideSubMenu
            title="Youtube Data"
            smallMenu={props.smallMenu}
            icon={<BsDatabaseDown size={20} />}
          >
            <SideMenuItem
              title="채널영상자동등록"
              to="/youtube-channel"
              icon={<GrChannel size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="Search 자동등록"
              to="/youtube-data-search"
              icon={<MdOutlineYoutubeSearchedFor size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="재생목록 자동등록"
              to="/youtube-data-playlist"
              icon={<MdOutlinePlaylistPlay size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
          </SideSubMenu>
        </PMenu>
        <PMenu>
          <SideSubMenu
            title="Youtube 영상관리"
            smallMenu={props.smallMenu}
            icon={<TfiYoutube size={20} />}
          >
            <SideMenuItem
              title="목사님 영상"
              to="/youtube-pastor"
              icon={<IoIosPersonAdd size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="삶과 신앙"
              to="/youtube-faith"
              icon={<GiLifeBar size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="유명인 간증영상"
              to="/youtube-celeb"
              icon={<RiUserStarLine size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="강해 설교영상"
              to="/youtube-sermon"
              icon={<GiPublicSpeaker size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="긍휼 사역영상"
              to="/youtube-mercy"
              icon={<GiWinterGloves size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
          </SideSubMenu>
        </PMenu>
        <PMenu>
          <SideSubMenu
            title="나의 성장"
            smallMenu={props.smallMenu}
            icon={<FaYoutube size={20} />}
          >
            <SideMenuItem
              title="Youtube CCM Shorts"
              to="/youtube-ccm"
              icon={<SiYoutubeshorts size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="Form Test"
              to="/form-test"
              icon={<IoCodeWorkingSharp size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
            <SideMenuItem
              title="Tab Test"
              to="/tab-test"
              icon={<IoCodeWorkingSharp size={20} />}
              selected={props.activeItem}
              setSelected={props.setActiveItem}
              smallMenu={props.smallMenu}
            />
          </SideSubMenu>
        </PMenu>
      </Sidebar>
    </Menu>
  );
}
