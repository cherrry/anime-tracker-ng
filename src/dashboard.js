import React from 'react';
import {render} from 'react-dom';

import {LocaleProvider} from 'antd';
import EnUS from 'antd/lib/locale-provider/en_US';

import Main from 'dashboard/main';

function App() {
  return (
    <LocaleProvider locale={EnUS}>
      <Main />
    </LocaleProvider>
  );
}

render(<App />, document.getElementById('app-root'));
