import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import BarBox from './components/BarBox';
import GlobalStyles from './styles/global';
import { baseTheme } from './styles/theme';
import { SetBoxPositionContext } from './hooks/useSetBoxPosition';
import { Position } from './types';

function App() {
  const [position, setPosition] = useState<Position>('top');

  return (
    <div className="App">
      <ThemeProvider theme={baseTheme}>
        <SetBoxPositionContext.Provider value={{ position, setPosition }}>
          <BarBox />
        </SetBoxPositionContext.Provider>
        <GlobalStyles />
      </ThemeProvider>
    </div>
  );
}

export default App;
