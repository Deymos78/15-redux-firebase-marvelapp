import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"

import { spidermanColorTheme } from "./spidermanColorTheme"

// Como este componente sera un Hgher Order Component
export const AppTheme = ({children}) => {
  return (
    // El componente sirve para proporcionar un tema personalizado a los componentes de Material UI
    <ThemeProvider theme={spidermanColorTheme} >

        <CssBaseline />
        { children }

    </ThemeProvider>
  )
}
