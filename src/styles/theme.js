import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles'

// Turquoise blue: #30cdd7
// Dark blue: #0a73af
// Yellow: #f5cf48

let theme = createMuiTheme({
    palette: {
        primary: {
            main: '#0a73af',
            contrastText: '#fff'
        },
        secondary: {
            main: '#f5cf48',
        },
    }
})

export default responsiveFontSizes(theme)