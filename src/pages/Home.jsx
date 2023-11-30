import React from 'react';
import { Container, Header, List, Segment } from 'semantic-ui-react';
import MBreadcrumb from '../components/MBreadcrumb';

export default function Home() {
  return (
    <Container fluid>
      <MBreadcrumb
        first={'Home'}
        second={'Church In Hand'}
        third={'Initial Screen'}
      />
      <Header as="h2" dividing>
        내손안의 교회
      </Header>
      <Segment secondary>
        <p>- 내손안의 교회 관리자 화면입니다. -</p>
        <p>
          <br />
          개발 완료 23년 12월 31일 <br />
          App 등록 23년 1월 첫번째 , 두번째주 (통상 2주 소요) <br />
          Grand Open : 24.01 두번째주
        </p>
        <p></p>
      </Segment>

      <Segment color="red">
        <List divided>
          <List.Item>
            <List.Header>V0.1</List.Header>
            <List.Description>11.24 mateial ui version</List.Description>
          </List.Item>
          <List.Item>
            <List.Header>V0.2</List.Header>
            <List.Description>
              11.30 semantic ui version change
            </List.Description>
          </List.Item>
        </List>
      </Segment>
    </Container>
  );
}
