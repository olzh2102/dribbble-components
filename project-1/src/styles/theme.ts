export interface ITheme {
  fontFamily: string;

  colors: {
    bg: string;
    font: string;
  };
}

export const baseTheme: ITheme = {
  fontFamily: `'Roboto', sans-serif`,

  colors: {
    bg: '#e1e0ec',
    font: '#1a183e',
  },
};
