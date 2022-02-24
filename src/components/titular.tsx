import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { Button, Grid, TextField, Typography } from "@mui/material";
import { FormControlLabel, FormControl } from "@mui/material";
import { RadioGroup, Radio } from "@mui/material";
import { Alert, Fade } from "@mui/material";
import { promoventeState, titularState, datosRegistralesState } from '../types/aclaraciones'
import { dataControl, dataControlState } from '../types/util'


export default function Titular () {

    const navigate = useNavigate();
    const [titular, setTitular] = useRecoilState(titularState)
    const datosRegistrales = useRecoilValue(datosRegistralesState)
    const promovente = useRecoilValue(promoventeState)
    const [messageAlert, setMessageAlert] = useState(false);
    const dataControl: dataControl = useRecoilValue(dataControlState);
    const resetTitular = useResetRecoilState(titularState)

    function handleTitularInputChange (event: ChangeEvent<HTMLInputElement>): void {
        if (messageAlert) setMessageAlert(false);
        setTitular({
            ...titular,
            [event.target.name] : event.target.value
        });
    }

    function submitForm (event: FormEvent<HTMLFormElement>): void {

        event.preventDefault();
        
        const ti = titular;

        if (ti.nombre && ti.apPaterno) {
            const url = dataControl.vistaPrevia ?
                '/aclaraciones/vista-previa' :
                '/aclaraciones/datos-aclarar';
            navigate(url);
        }
        else setMessageAlert(true);
    }
    
    function handleTitularIsPromovente (event: ChangeEvent<HTMLInputElement>): void {
        if (event.target.value === 'si') {
            setTitular({
                nombre : promovente.nombre,
                apPaterno : promovente.apPaterno,
                apMaterno : promovente.apMaterno
            })
        }
        else resetTitular()
    }

    return (
        <form onSubmit={event => submitForm(event)}>
            <Grid container spacing={3} direction="column" px={1} pb={1}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="div" gutterBottom align="center">
                        Titular del Acta de {datosRegistrales.tipoActo}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" component="div" gutterBottom>
                        Es usted el titular del acta?
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="es titular"
                            name="esTitular"
                            onChange={handleTitularIsPromovente}>

                            <FormControlLabel value="si" control={<Radio />} label="Si" />
                            <FormControlLabel value="no" control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                    <Grid item xs={12}>
                        <TextField type="text" name="nombre"
                            label="Nombre del Titular del Acta *"
                            variant="standard"
                            value={titular.nombre}
                            onChange={handleTitularInputChange}
                            fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="text" name="apPaterno"
                            label="Apellido Paterno del Titular *"
                            variant="standard"
                            value={titular.apPaterno}
                            onChange={handleTitularInputChange}
                            fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="text" name="apMaterno"
                            label="Apellido Materno del Titular"
                            variant="standard"
                            value={titular.apMaterno}
                            onChange={handleTitularInputChange}
                            fullWidth/>
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