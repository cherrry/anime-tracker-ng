import React from 'react';
import { render } from 'react-dom';
import { Button } from 'antd';

function App() {
  return (
    <Button>Hello World</Button>
  );
}

render(<App />, document.getElementById('app-root'));
