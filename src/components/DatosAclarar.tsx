import { useState, useEffect, FormEvent, ChangeEvent, } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil'
import { Grid, TextField, Typography } from "@mui/material";
import { Button, Fade, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { InputLabel, MenuItem, Select } from "@mui/material"
import { TdatoAclarar,
    datosAclararState,
    datosRegistralesState,
    TtipoActo,
    isDatosAclararList } from "../types/aclaraciones";
import { getNombreDatosAclarar } from '../lib/net'

const datoAclarar0: TdatoAclarar = {
    id: 0,
    dato: '',
    dice: '',
    debeDecir: ''
}

export default function DatosAclarar (props: {solicitudAceptada?: boolean}) {

    const navigate = useNavigate();

    const [datoAclarar, setDatoAclarar] = useState(datoAclarar0);
    const [datosAclarar, setDatosAclarar] = useRecoilState(datosAclararState);
    const initCount = datosAclarar.length === 0 ? 1 : Math.max(...datosAclarar.map(x => x.id)) + 1;
    const [count, setCount] = useState(initCount);
    const [nombreDatosAclarar, setNombreDatosAclarar] = useState<Array<string>>([])
    const datosRegistrales = useRecoilValue(datosRegistralesState)
    const tipoActo: TtipoActo = datosRegistrales.tipoActo

    useEffect(() => {
        getNombreDatosAclarar()
        .then(res => {
            if (res.status === 'ok' && isDatosAclararList(res.data)) {
                if (tipoActo === 'NACIMIENTO') setNombreDatosAclarar(res.data.nacimiento)
                else if (tipoActo === 'MATRIMONIO') setNombreDatosAclarar(res.data.matrimonio)
                else if (tipoActo === 'DEFUNCION') setNombreDatosAclarar(res.data.defuncion)
            }
        })
    }, [tipoActo])

    function handleInputChange (event: ChangeEvent<HTMLInputElement>): void {  
        event.preventDefault();
        setDatoAclarar({
            ...datoAclarar,
            [event.target.name] : event.target.value
        });
    }

    function handleDatoAclararSelectChange (event: any) {
        event.preventDefault();
        setDatoAclarar({
            ...datoAclarar,
            dato: event.target.value
        });
    }

    function descartarDato (id: number): void {
        setDatosAclarar(
            [...datosAclarar]
            .filter(dato => dato.id !== id)
        );
    }

    function submitDato (event: FormEvent<HTMLFormElement>): void {
        
        event.preventDefault();

        if ( !(datoAclarar.dato && datoAclarar.dice && datoAclarar.debeDecir) ) return;

        setCount(count + 1);
        const list = [...datosAclarar];

        list.push({
            ...datoAclarar,
            id : count,
        });

        setDatosAclarar(list);
        setDatoAclarar(datoAclarar0);
    }

    function submitForm (event: FormEvent<HTMLFormElement>): void {

        event.preventDefault();

        if (datosAclarar.length === 0) return;

        setDatosAclarar(datosAclarar);

        navigate('/aclaraciones/vista-previa')
    }


    return (
        <>
        <Grid container item spacing={3} direction="column" px={1} pb={1}>
            <Grid item xs={12}>
            <form onSubmit={event => submitDato(event)}>
                <Grid container item spacing={3} direction="column">
                    <Grid item xs={12}>
                        <Typography variant="h6" component="div" gutterBottom align="center">
                            Campos a corregir
                        </Typography>
                        <Typography variant="body1" component="div" gutterBottom align="justify">
                            A continuación proporciona la lista de datos que deseas rectificar.
                            Para cada dato deberás llenar tres campos: 1. Dato a rectificar,
                            aquí debes escribir el nombre del dato que deseas cambiar o corregir.
                            2. Actualmente dice, aqui debes escribir el valor del dato
                            así como aparece actualmente en el acta. 3. Debe decir, aqui escribe
                            el valor que deseas que tenga el dato.
                            Después has clic en el boton: AGREGAR DATO. Si te has equivocado
                            en la captura de algún dato lo puedes eliminar
                            de la lista haciendo clic en el boton de bote de basura. 
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="label-dato-aclarar">Dato a rectificar</InputLabel>
                        <Select label="------------->"
                            value={datoAclarar.dato}
                            onChange={handleDatoAclararSelectChange}>

                            {
                                nombreDatosAclarar.map(dato =>
                                    <MenuItem key={dato} value={dato}>
                                        {dato}
                                    </MenuItem>
                                )
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="text" name="dice"
                            label="Actualmente dice"
                            variant="standard"
                            value={datoAclarar.dice}
                            onChange={handleInputChange}
                            fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="text" name="debeDecir"
                            label="Debe decir"
                            variant="standard"
                            value={datoAclarar.debeDecir}
                            onChange={handleInputChange}
                            fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit"
                            variant="contained"
                            color="success"
                            fullWidth
                            disabled={props.solicitudAceptada}>

                            AGREGAR DATO
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Grid>
            <Grid container item>
                <TableContainer component={Grid}>
                    <Table sx={{maxWidth : 650}} arial-label="simple-table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dato</TableCell>
                                <TableCell align="right">Dice</TableCell>
                                <TableCell align="right">Debe decir</TableCell>
                                <TableCell align="right">-</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                datosAclarar.map(dato =>
                                    <TableRow key={dato.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell component="th" scope="row">{dato.dato}</TableCell>
                                        <TableCell align="right">{dato.dice}</TableCell>
                                        <TableCell align="right">{dato.debeDecir}</TableCell>
                                        <TableCell align="right">
                                            <IconButton color="success"
                                                arial-label="borrar"
                                                onClick={() => descartarDato(dato.id)}
                                                disabled={props.solicitudAceptada}>
                                                
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
            <Fade in={datosAclarar.length !== 0}>
                <Typography variant="body1" component="div" gutterBottom align="justify">
                    Si has terminado de capturar todos los datos a corregir has clic en 
                    el boton SIGUIENTE.
                </Typography>
            </Fade>
            </Grid>
            <Grid item xs={12}>
            <Fade in={datosAclarar.length !== 0}>
                <form onSubmit={event => submitForm(event)}>
                    <Button type="submit"
                        variant="contained" color="success" fullWidth
                        disabled={props.solicitudAceptada}>

                        SIGUIENTE
                    </Button>
                </form>
                </Fade>
            </Grid>
        </Grid>
        </>
    );
}