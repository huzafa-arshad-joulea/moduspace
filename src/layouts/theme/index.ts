import { createTheme } from '@mui/material/styles';
import breakpoints from './base/breakpoints';
import colors from './base/colors';
import typography from './base/typography';

const theme = createTheme({
  breakpoints: { ...breakpoints },
  palette: {
    primary: {
      ...colors.primary,
    },
    secondary: {
      ...colors.secondary,
    },
    info: {
      ...colors.info,
    },
    success: {
      ...colors.success,
    },
    warning: {
      ...colors.warning,
    },
    error: {
      ...colors.error,
    },
    background: {
      ...colors.background,
    },
  },
  typography: { ...typography },
});

export default theme;