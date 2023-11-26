import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';

export default function MBreadcrumb({ first, second, third }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Section link>{first}</Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section link>{second}</Breadcrumb.Section>
      {/* <Breadcrumb.Divider icon="right arrow" /> */}
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section active>{third}</Breadcrumb.Section>
    </Breadcrumb>
  );
}
