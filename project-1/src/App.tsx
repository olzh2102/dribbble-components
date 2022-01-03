import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={baseTheme}>
        <h1>Hello, World!</h1>
        <GlobalStyles />
      </ThemeProvider>
    </div>
  );
}

export default App;
