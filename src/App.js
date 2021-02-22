import './main.scss';
import React from 'react';
import { Container } from '@material-ui/core';
import Post from './Post';

function App() {
  return (
    <div className="App">
      <Container>
        <Post />
      </Container>
    </div>
  );
}

export default App;