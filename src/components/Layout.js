import { Box, Grid, Paper } from '@mui/material'


export default function Layout ({children}) {
    return (
        <>
        <Box p={2}>
            <Grid container
                spacing={4}
                direction="column"
                px={{md: 40}}>
                
                <Grid item xs={12}>
                    <Paper variant="elevation">
                        <img src="/logoRegistroCivil2021.png" alt="logo registro civil"/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper variant="elevation">
                        {children}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}