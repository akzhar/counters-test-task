import React from 'react';

import Layout from '@components/Layout';
import Statistics from '@components/Statistics';
import NewCounterButton from '@components/NewCounterButton';
import Counters from '@components/Counters';

const App: React.FC = () => (
  <Layout>
    <Statistics/>
    <NewCounterButton/>
    <Counters/>
  </Layout>
);

export default App;
