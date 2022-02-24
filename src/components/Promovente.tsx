import { useState, ChangeEvent, FormEvent } from "react";
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button, Grid, TextField, Typography } from "@mui/material";
import { Alert, Fade } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { dataControl, dataControlState } from '../types/util'
import { promoventeState } from '../types/aclaraciones'


export default function Promovente () {

    const [promovente, setPromovente] = useRecoilState(promoventeState);

    const navigate = useNavigate();

    const [messageAlert, setMessageAlert] = useState(false);

    const dataControl: dataControl = useRecoilValue(dataControlState);

    function handleInputChange (event: ChangeEvent<HTMLInputElement>): void {
        if (messageAlert) setMessageAlert(false);
        setPromovente({
            ...promovente,
            [event.target.name] : event.target.value
        });
    }

    function submitForm (event: FormEvent<HTMLFormElement>): void {
        
        event.preventDefault();

        if (promovente.nombre
            && promovente.apPaterno
            && promovente.email) {
    
            const url = dataControl.vistaPrevia ?
                '/aclaraciones/vista-previa' :
                '/aclaraciones/datos-registrales';

            navigate(url, {replace: true});
        }
        else {
            setMessageAlert(true);
        }
    }

    return (
        <form onSubmit={event => submitForm(event)}>
            <Grid container spacing={3} direction="column" px={1} pb={1}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="div" gutterBottom align="center">
                        Datos de Contacto
                    </Typography>
                    <Typography variant="body1" component="div" gutterBottom align="justify">
                        En ésta forma debes proporcionar tu nombre y tu correo electrónico
                        para ponernos en contacto contigo y poder enviarte las indicaciones
                        que deberás realizar para tramitar la aclaración del acta.
                    </Typography>
                    <Typography variant="caption" component="div" gutterBottom align="left">
                        Los campos marcados con * son obligatorios
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="nombre"
                        label="Nombre *"
                        value={promovente.nombre}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="apPaterno"
                        label="Apellido Paterno *"
                        value={promovente.apPaterno}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="apMaterno"
                        label="Apellido Materno"
                        value={promovente.apMaterno}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="telefono"
                        label="Teléfono"
                        value={promovente.telefono}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="email"
                        label="Correo electrónico *"
                        value={promovente.email}
                        onChange={handleInputChange}
                        variant="standard"
                        fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Fade in={messageAlert} timeout={600}>
                        <Alert variant="outlined" severity="error">
                            Los campos marcados con * son obligatorios.
                        </Alert>
                    </Fade>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit"
                        variant="contained"
                        color="success"
                        fullWidth>
                        
                        Siguiente 
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}