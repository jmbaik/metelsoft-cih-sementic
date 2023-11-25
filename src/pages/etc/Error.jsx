import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Image } from 'semantic-ui-react';

export default function Error() {
  return (
    <Container fluid>
      <div>
        <Image src="./assets/not-found.svg" />
        <h3>OHH !! Page not found</h3>
        <p>We cant'g seem to find the page your'e looking for</p>
        <Link to="/">back home</Link>
      </div>
    </Container>
  );
}
