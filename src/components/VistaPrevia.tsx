import { useState, useEffect, FormEvent } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box, Button, Chip, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { dataControlState } from '../types/util'
import { fechaStr } from '../lib/util'
import {
    promoventeState,
    datosAclararState,
    datosRegistralesState,
    nombrePromoventeSelector,
    nombreTitularSelector } from '../types/aclaraciones'


export default function VistaPrevia () {
    
    const navigate = useNavigate()

    const setDataControl = useSetRecoilState(dataControlState)

    const [solicitudAceptada, setSolicitudAceptada] = useState(false);

    const promovente = useRecoilValue(promoventeState)

    const datosRegistrales = useRecoilValue(datosRegistralesState);

    const nombreCompletoTitular = useRecoilValue(nombreTitularSelector)

    const nombreCompletoPromovente = useRecoilValue(nombrePromoventeSelector)

    const datosAclarar = useRecoilValue(datosAclararState)

    useEffect(() => {
        setDataControl({
            vistaPrevia: true,
        })
    })
    
    function submitForm (event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        setSolicitudAceptada(true);

        const url = '/acuse/aclaracion'

        navigate(url)
    }

    function DatosAclararTable () {

        return (
            <TableContainer>
                <Table sx={{maxWidth : 650}} arial-label="simple-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dato</TableCell>
                            <TableCell align="left">Dice</TableCell>
                            <TableCell align="left">Debe decir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            datosAclarar.map(dato =>
                                <TableRow key={dato.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{dato.dato}</TableCell>
                                    <TableCell align="left">{dato.dice}</TableCell>
                                    <TableCell align="left">{dato.debeDecir}</TableCell>
                                </TableRow>
                            )
                        }
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Chip size="small"
                                    label="Corregir"
                                    color="success"
                                    variant="outlined"
                                    onClick={() => navigate('/aclaraciones/datos-aclarar')}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }

    function PromoventeTable () {

        return (
            <TableContainer>
                <Table sx={{maxWidth : 650}} arial-label="simple-table">
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Promovente</TableCell>
                            <TableCell align="left">{nombreCompletoPromovente}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Telefono</TableCell>
                            <TableCell align="left">{promovente.telefono}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Correo E.</TableCell>
                            <TableCell align="left">{promovente.email}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Chip size="small"
                                    label="Corregir"
                                    color="success"
                                    variant="outlined"
                                    onClick={() => navigate('/aclaraciones/promovente')}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
       );
    }

    function TitularTable () {

        return (
            <TableContainer>
                <Table sx={{maxWidth : 650}} arial-label="simple-table">
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Titular</TableCell>
                            <TableCell align="left">{nombreCompletoTitular}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Chip size="small"
                                    label="Corregir"
                                    color="success"
                                    variant="outlined"
                                    onClick={() => navigate('/aclaraciones/titular')}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
       );
    }

    function DatosRegistralesTable () {
     
        return (
            <TableContainer>
                <Table sx={{maxWidth : 650}} arial-label="simple-table">
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Acto</TableCell>
                            <TableCell align="left">{datosRegistrales.tipoActo}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Juzgado</TableCell>
                            <TableCell align="left">{datosRegistrales.juzgado}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Libro</TableCell>
                            <TableCell align="left">{datosRegistrales.libro}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Acta</TableCell>
                            <TableCell align="left">{datosRegistrales.numeroActa}</TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Año</TableCell>
                            <TableCell align="left">{datosRegistrales.anio}</TableCell>
                        </TableRow>
                        {
                        ! datosRegistrales.fechaRegistro ? null :
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Fecha de Registro</TableCell>
                            <TableCell align="left">
                                {fechaStr(datosRegistrales.fechaRegistro)}
                            </TableCell>
                        </TableRow>
                        }
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                <Chip size="small"
                                    label="Corregir"
                                    color="success"
                                    variant="outlined"
                                    onClick={() => navigate('/aclaraciones/datos-registrales')}/>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
       );
    }

    return (
        <>
            <Box mb={3} mx={2}>
                <Typography variant="h6" component="div" gutterBottom align="center">
                    Vista Previa
                </Typography>
                <Typography variant="body1" component="div" gutterBottom align="justify">
                    Por favor revise que la información capturada sea correcta, en caso
                    contrario haga clic en el boton Corregir correspondiente.
                </Typography>
            </Box>
            <Box my={2}>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    PROMOVENTE
                </Typography>
                <PromoventeTable/>
            </Box>
            <Box my={2}>
                <Typography variant="subtitle1" align="center" gutterBottom mt={5}>
                    DATOS REGISTRALES
                </Typography>
                <DatosRegistralesTable/>
            </Box>
            <Box my={2}>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    TITULAR DEL ACTA
                </Typography>
                <TitularTable/>
            </Box>
            <Box my={2}>
                <Typography variant="subtitle1" align="center" gutterBottom mt={5}>
                    DATOS A MODIFICAR
                </Typography>
                <DatosAclararTable/>
            </Box>
            <Box my={2} mx={2}>
                <Typography variant="body1" component="div" gutterBottom align="justify">
                    Si todos los datos capturados son correctos proceda hacer clic en el
                    boton siguiente para solicitar al Registro Civil de la CDMX la
                    corrección de datos en su acta.
                </Typography>
                <form onSubmit={event => submitForm(event)}>
                    <Button type="submit"
                        variant="contained"
                        color="success"
                        fullWidth
                        disabled={solicitudAceptada}>

                        SOLICITAR ACLARACIÓN
                    </Button>
                </form>
            </Box>
        </>
    );
}