import React from 'react';
import {render} from 'react-dom';

import {LocaleProvider} from 'antd';
import EnUS from 'antd/lib/locale-provider/en_US';

import MainLayout from '@/main-layout';

function App() {
  return (
    <LocaleProvider locale={EnUS}>
      <MainLayout />
    </LocaleProvider>
  );
}

render(<App />, document.getElementById('app-root'));
