import React from 'react';
import ChurchRegister from '../admin/ChurchRegister';
import { Breadcrumb, Container, Divider, Header, Tab } from 'semantic-ui-react';
import AreaCode from '../admin/AreaCode';

export default function TabTest() {
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
