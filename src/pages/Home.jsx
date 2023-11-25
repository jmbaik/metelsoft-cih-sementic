import React from 'react';
import {
  Breadcrumb,
  Container,
  Divider,
  Header,
  Segment,
  Tab,
} from 'semantic-ui-react';
import { MenuItem } from 'react-pro-sidebar';
import AreaCode from './admin/AreaCode';
import ChurchRegister from './admin/ChurchRegister';

export default function Home() {
  const panes = [
    {
      menuItem: '지역코드등록',
      render: () => (
        <Tab.Pane>
          <AreaCode />
        </Tab.Pane>
      ),
    },
    {
      menuItem: '교회코드등록',
      render: () => (
        <Tab.Pane>
          <ChurchRegister />
        </Tab.Pane>
      ),
    },
    {
      menuItem: '목사님 등록',
      render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>,
    },
  ];
  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Section link>Home</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section link>Registration</Breadcrumb.Section>
        {/* <Breadcrumb.Divider icon="right arrow" /> */}
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>Personal Information</Breadcrumb.Section>
      </Breadcrumb>
      <Header as="h2">코드 등록</Header>
      <Divider />
      <Tab panes={panes}></Tab>
    </Container>
  );
}
