import React from 'react';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';

export default function NotServicePage() {
  return (
    <Container fluid>
      <Breadcrumb>
        <Breadcrumb.Section link>Home</Breadcrumb.Section>
        <Breadcrumb.Divider icon="right chevron" />
        <Breadcrumb.Section active>작업중</Breadcrumb.Section>
      </Breadcrumb>
      <Segment>작업중입니다...</Segment>
    </Container>
  );
}
