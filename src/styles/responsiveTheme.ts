import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();
const responsiveTheme = responsiveFontSizes(defaultTheme);
export default responsiveTheme;