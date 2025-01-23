import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';

import { MantineProvider } from '@mantine/core';
import GeneTable from './GeneTable';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Gene Table
      </h1>
      <GeneTable />
    </MantineProvider>
  );
}
