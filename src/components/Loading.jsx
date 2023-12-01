import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export default function Loading({ active }) {
  return (
    <Dimmer active={active} inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
}
