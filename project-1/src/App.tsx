import React from 'react';
import { ThemeProvider } from 'styled-components';

import BarBox from './components/BarBox';
import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={baseTheme}>
        <BarBox />
        <GlobalStyles />
      </ThemeProvider>
    </div>
  );
}

export default App;
