import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default function TextIcon(props) {
  const style = {
    alignSelf: 'center',
    paddingLeft: '6px',
  };

  return (
    <div style={{ whiteSpace: 'nowrap', display: 'inline-flex' }}>
      <Icon size="small" color={props.color} name={props.name} />
      <div style={style} hidden={props.hideText}>
        <Header as="h5">{props.children}</Header>
      </div>
    </div>
  );
}
