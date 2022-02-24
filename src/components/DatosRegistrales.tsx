import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil'
import { Button, Grid, TextField, Typography } from "@mui/material";
import { FormControlLabel, FormControl, FormLabel } from "@mui/material";
import { RadioGroup, Radio } from "@mui/material";
import { Alert, Fade } from "@mui/material";
import { datosRegistralesState } from '../types/aclaraciones'
import { dataControl, dataControlState } from '../types/util'
import "react-datepicker/dist/react-datepicker.css"
import DatePicker, { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';


export default function DatosRegistrales () {

    registerLocale('es', es)
    const navigate = useNavigate();
    const [datosRegistrales, setDatosRegistrales] = useRecoilState(datosRegistralesState)
    const [messageAlert, setMessageAlert] = useState(false);
    const dataControl: dataControl = useRecoilValue(dataControlState);
    const [date, setDate] = useState<Date>(new Date())

    function handleDRInputChange (event: ChangeEvent<HTMLInputElement>): void {
        if (messageAlert) setMessageAlert(false);
        setDatosRegistrales({
            ...datosRegistrales,
            [event.target.name] : event.target.value
        });
    }

    function submitForm (event: FormEvent<HTMLFormElement>): void {

        event.preventDefault();
        
        const dr = datosRegistrales;

        if (dr.tipoActo && dr.juzgado && dr.numeroActa && dr.anio) {
            const url = dataControl.vistaPrevia ?
                '/aclaraciones/vista-previa' :
                '/aclaraciones/titular';
                
            navigate(url);
        }
        else setMessageAlert(true);
    }
    
    function handleDateChange (date: Date) {
        setDate(date)
        const dateStr = date.toLocaleString("es-MX")
        setDate(date)
        setDatosRegistrales({
            ...datosRegistrales,
            fechaRegistro: dateStr.substring(0, dateStr.length-9)
        })
    }

    return (
        <form onSubmit={event => submitForm(event)}>
            <Grid container spacing={3} direction="column" px={1} pb={1}>
                <Grid item xs={12}>
                    <Typography variant="h6" component="div" gutterBottom align="center">
                        Datos registrales
                    </Typography>
                    <Typography variant="subtitle1" component="div" gutterBottom>
                        Ingrese la siguiente información que se obtiene directamente del
                        acta que desea aclarar.
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo de Acto *</FormLabel>
                        <RadioGroup
                            aria-label="tipo de acto"
                            name="tipoActo"
                            value={datosRegistrales.tipoActo}
                            onChange={handleDRInputChange}>

                            <FormControlLabel value="NACIMIENTO" control={<Radio />} label="Nacimiento" />
                            <FormControlLabel value="MATRIMONIO" control={<Radio />} label="Matrimonio" />
                            <FormControlLabel value="DEFUNCION" control={<Radio />} label="Defunción" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="juzgado"
                        label="Número de Juzgado *"
                        variant="standard"
                        value={datosRegistrales.juzgado}
                        onChange={handleDRInputChange}
                        fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="libro"
                        label="Número de Libro"
                        variant="standard"
                        value={datosRegistrales.libro}
                        onChange={handleDRInputChange}
                        fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="numeroActa"
                        label="Número de Acta *"
                        variant="standard"
                        value={datosRegistrales.numeroActa}
                        onChange={handleDRInputChange}
                        fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField type="text" name="anio"
                        label="Número de Año *"
                        variant="standard"
                        value={datosRegistrales.anio}
                        onChange={handleDRInputChange}
                        fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" component="div" gutterBottom>
                        Fecha De Registro
                    </Typography>
                    <DatePicker
                        locale="es"
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        placeholderText="Fecha de Registro"
                        dropdownMode="select"
                        dateFormat="dd/MM/yyy"
                        openToDate={new Date("2000/01/01")}
                        minDate={new Date('01/01/1930')}
                        maxDate={new Date()}
                        selected={date}
                        onChange={(date) => handleDateChange(date || new Date())}/>
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