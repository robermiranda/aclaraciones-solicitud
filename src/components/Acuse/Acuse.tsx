import { Grid, Typography} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ImprimirPdfButton from './AcusePdf'
import { fechaStr } from '../../lib/util'
import {
    Tpromovente,
    Ttitular,
    TdatosRegistrales,
    TdatoAclarar } from '../../types/aclaraciones'

type Taclaracion = {
    promovente: Tpromovente;
    titular: Ttitular;
    datosRegistrales: TdatosRegistrales;
    datosAclarar: Array<TdatoAclarar>;
    numeroFolio: number;
    fecha: string;
    statusAclaracionMsg: string;
    vistaPrevia: boolean
}

export default function Acuse ({
    promovente,
    titular,
    datosRegistrales,
    datosAclarar,
    numeroFolio,
    fecha,
    statusAclaracionMsg,
    vistaPrevia} : Taclaracion) {

    return (
        <Grid container px={1} pb={1}>
        {
            ( ! vistaPrevia) ? null :
                <Grid item xs={12}>
                <Typography variant="h6" component="div" gutterBottom align="center">
                    Comprobante de Solicitud
                </Typography>
                <Typography variant="body1" component="div" gutterBottom align="justify">
                    Su petición de aclaración de acta ha sido registrada en nuestro
                    sistema de información y será revisada lo antes posible; nosotros nos comunicaremos
                    con usted vía correo electrónico para pedirle la documentación 
                    necesaria para continuar su tramite.
                </Typography>
                <Typography variant="body1" component="div" gutterBottom align="justify">
                    Por favor imprima este comprobante que deberá anexar a la documentación
                    que le será solicitada.
                </Typography>
                </Grid>
        }
        <Grid item xs={12}>
            <TableContainer component="div">
                <Table sx={{maxWidth : 650}} arial-label="simple-table">
                    <TableBody>
                        <TableRow>
                            <TableCell>Folio</TableCell>
                            <TableCell>{numeroFolio}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Fecha de solicitud</TableCell>
                            <TableCell>{fechaStr(fecha)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Estatus</TableCell>
                            <TableCell>{statusAclaracionMsg}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Promovente</TableCell>
                            <TableCell>
                                {
                                    promovente.nombre + ' ' +
                                    promovente.apPaterno + ' ' +
                                    promovente.apMaterno
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Titular</TableCell>
                            <TableCell>
                                {
                                    titular.nombre + ' ' +
                                    titular.apPaterno + ' ' +
                                    titular.apMaterno
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Clase de Acta</TableCell>
                            <TableCell>{datosRegistrales.tipoActo}</TableCell>
                        </TableRow>
                        {
                        ! datosRegistrales.fechaRegistro ? null :
                        <TableRow>
                            <TableCell>Fecha de Registro</TableCell>
                            <TableCell>
                                {fechaStr(datosRegistrales.fechaRegistro)}
                            </TableCell>
                        </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
        <Grid item xs={12} my={2}>
            <Typography variant="body1" component="div" gutterBottom align="center">
                        Datos registrales
            </Typography>
            <TableContainer component="div">
                <Table sx={{maxWidth : 650}} arial-label="simple-table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Juzgado</TableCell>
                            <TableCell>Libro</TableCell>
                            <TableCell>Acta</TableCell>
                            <TableCell>Año</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{datosRegistrales.juzgado}</TableCell>
                            <TableCell>{datosRegistrales.libro}</TableCell>
                            <TableCell>{datosRegistrales.numeroActa}</TableCell>
                            <TableCell>{datosRegistrales.anio}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
        <Grid item xs={12} my={1}>
            <Typography variant="body1" component="div" gutterBottom align="center">
                Datos a aclarar
            </Typography>
            <TableContainer component="div">
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
            <Grid item xs={12}>
                <ImprimirPdfButton 
                    fechaSolicitud={fechaStr(fecha)}
                    numeroFolio={numeroFolio}
                    promovente={promovente}
                    titular={titular}
                    datosRegistrales={datosRegistrales}
                    datosAclarar={datosAclarar}
                    fechaRegistro={
                        ! datosRegistrales.fechaRegistro ? null: 
                        fechaStr(datosRegistrales.fechaRegistro)
                    }/>
            </Grid>
    </Grid>)
}