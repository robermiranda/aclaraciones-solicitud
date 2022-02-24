import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Home () {

    const navigate = useNavigate();
    
    const [numeroFolio, setNumeroFolio] = useState('');

    function handleInputChange (event) {
        setNumeroFolio(event.target.value);
    }

    function submitForm(event) {

        event.preventDefault();

        if (parseInt(numeroFolio)) {
            navigate(`/acuse/folio/${numeroFolio}`, { replace: true });
        }
    }

    return (
        <form onSubmit={submitForm}>
        <Grid container spacing={2} direction="column" px={1} pb={1}>
            <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom align="center">
                    Registro Civil. CDMX
                </Typography>
                <Typography variant="subtitle2" component="div" gutterBottom align="center">
                    Área de Aclaraciones
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" gutterBottom align="justify">
                    Bienvenido al sistema para la solicitud de aclaración de acta.
                    Este trámite lo realiza la persona física que tenga un error en su acta
                    o cuando desea hacer alguna modificación
                    para adecuar su realidad jurídica y social.
                    Esta es una aclaración por enmienda y tiene un costo de $638.00 MXN
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" gutterBottom align="justify">
                Si ya has realizado una solicitud de aclaración y tienes el número de folio
                entonces escribelo en el siguiente campo y has clic en el boton Revisar
                para obtener el estatus de tu trámite.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                    <Grid container
                        spacing={4}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">

                        <Grid item xs={6} md={3}>
                            <TextField type="text" name="folio"
                                label="Folio"
                                value={numeroFolio}
                                onChange={handleInputChange}
                                variant="standard"
                                fullWidth />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Button type="submit"
                                variant="contained"
                                color="success"
                                fullWidth>
                                
                                Revisar 
                            </Button>
                        </Grid>
                    </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" gutterBottom align="justify" mt={3}>
                    Si no cuentas con un número de folio y mas bien necesitas
                    realizar una aclaración en tu acta entonces es necesario
                    que llenes las formas de registro siguientes:
                </Typography>
                    <List>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <HorizontalRuleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Datos de contacto de la persona que realiza el trámite" />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <HorizontalRuleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Datos registrales del acta a modificar" />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemIcon>
                                <HorizontalRuleIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Lista de datos a rectificar" />
                        </ListItem>
                    </List>
            </Grid>
            <Grid item xs={8} md={6}>
                <Button fullWidth
                    variant="contained"
                    color="success"
                    onClick={() => navigate('/aclaraciones/promovente')}>

                    Siguiente
                </Button>
            </Grid>
        </Grid>
        </form>
    );
}