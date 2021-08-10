import { createTheme } from '@material-ui/core/styles'
const arcGreen = '#37A794'
const arcBlue = '#7B7FCF'
const arcGrey='#E7F1F2'
const arcBlack='#4B4B4B'
export default createTheme({
    palette: {
        common: {
            green: `${arcGreen}`,
            blue: `${arcBlue}`,
            white: '#fff',
            black:  `${arcBlack}`,
            grey: `${arcGrey}`
        },
        primary: {
            main: `${arcGreen}`,
        },
        secondary: {
            main: `${arcBlue}`
        }
    },
    typography: {
        fontFamily: ['Roboto'],
        textField: {
            fontFamily: 'Roboto',
            fontWeight: 400,
            marginTop: '0.5rem',
        },
        logintxt: {
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '1.9rem',
            color: '#000000',
            marginBottom: '1.9rem'
        },
    },
})