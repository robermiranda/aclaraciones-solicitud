import {jsPDF} from 'jspdf';
import { Button } from "@mui/material";

const _const = {
    DATOS_MODIFICAR_HEADER : 75,
    DATOS_REGISTRALES_HEADER : 45,
    X0 : 20
};

const headers = {
    datosRegistrales : [
        {name : 'Acto', width : _const.DATOS_REGISTRALES_HEADER},
        {name : 'Juzgado', width : _const.DATOS_REGISTRALES_HEADER},
        {name : 'Libro', width : _const.DATOS_REGISTRALES_HEADER},
        {name : 'Acta', width : _const.DATOS_REGISTRALES_HEADER},
        {name : 'Año', width : _const.DATOS_REGISTRALES_HEADER},
    ],
    datosAclarar : [
        { name : 'Dato', width : _const.DATOS_MODIFICAR_HEADER },
        { name : 'Dice', width : _const.DATOS_MODIFICAR_HEADER },
        { name : 'Debe_Decir', width : _const.DATOS_MODIFICAR_HEADER }
    ]
};

function nextY(y0, step) {

    if (!y0) y0 = 1;
    if (!step) step = 1;

    let counter = -1;

    return function (n) {
        if (n) counter = counter + n;
        else counter++ ;
        return  y0 + counter * step;
    };
}

export default function AcusePdf (props) {

    const MIDDLE_X = 105;
    const RIGHT_X = 190;

    const ny = nextY(15, 5);

    const doc = new jsPDF();

    const Y0 = ny();

    // image dim: 300 * 51
    // scale factor : 3.5
    // image redim : 85.71 * 14.57
    doc.addImage('/logoRegistroCivil2021.png', 'JPEG', _const.X0, Y0, 85.71, 14.57);
    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor('#707070');
    doc.text('CONSEJERÍA JURÍDICA Y DE SERVICIOS LEGALES', RIGHT_X, Y0 + 5, 'right');
    doc.text('DIRECCIÓN GENERAL DEL REGISTRO CIVIL', RIGHT_X, Y0 + 9, 'right');

    doc.setTextColor(0.00);
    doc.setFontSize(13);
	const titleText1 = 'SOLICITUD PARA RECTIFICACIÓN DE ACTA DE';
	const titleText2 = 'NACIMIENTO, MATRIMONIO O DEFUNCIÓN';
	doc.text(titleText1, MIDDLE_X, ny(5), "center");
	doc.text(titleText2, MIDDLE_X, ny(), "center");

    doc.setFont('times', 'normal');
    doc.setFontSize(12);

    const fecha = props.fechaSolicitud
    if (fecha) {
	    const dateText = `Ciudad de México, ${fecha.dia} de ${fecha.mes} de ${fecha.anio}`;
        doc.text(dateText, RIGHT_X, ny(2), 'right');
    }

    const promovente = props.promovente.nombre + ' ' +
        props.promovente.apPaterno + ' ' +
        props.promovente.apMaterno;

    const titular = props.titular.nombre + ' ' +
        props.titular.apPaterno + ' ' +
        props.titular.apMaterno

    const datosAclarar = props.datosAclarar.map(x => {
        return {
            Dato : x.dato,
            Dice : x.dice,
            Debe_Decir : x.debeDecir
        };
    });

    const dr = props.datosRegistrales;

    const fechaRegistro = props.fechaRegistro ?
        `. Fecha de registro ${props.fechaRegistro}` : '';

    doc.setFont('times', 'bold');
    doc.text('LIC. MANUEL BECERRA GARCÍA', _const.X0, ny(2));
    doc.text('DIRECTOR GENERAL DEL REGISTRO CIVIL DE LA CIUDAD DE MÉXICO', _const.X0, ny());
    doc.text('PRESENTE', _const.X0, ny());

    const mainText = 'Por medio del presente yo. C. ' + promovente.toUpperCase() + 
	' solicito que realice la corrección del acta que a continuación se describe, para ' +
	'que con fundamento en los articulos 134, 135, 136, 137, 138 Bis del Código Civil para el Distrito Federal, ' +
	'97, 98, 98 Bis, 99, 100 y 101 del Reglamento del Registro Civil del Distrito Federal, referente al ' +
	'trámite administrativo de Rectificación, Modificación y Aclaración de las Actas del Estado Civil de las ' +
	'personas, realice las acciones necesarias para poder aclarar el acta de ' + titular.toUpperCase() +
    '. Clase de acta ' + dr.tipoActo + ' con los siguientes datos registrales: Juzgado ' + dr.juzgado +
    (dr.libro ? '. Libro ' + dr.libro : '') + '. Número de Acta ' + dr.numeroActa + '. Año ' + dr.anio +
    fechaRegistro + ' y Número de Folio ' + props.numeroFolio + '.';

    doc.setFont('times', 'normal');
    doc.text(mainText, _const.X0, ny(2), {maxWidth : 170, align : 'justify'});

    const text3 = 'Especificando que el dato a corregir o agregar, consiste en lo siguiente:';
    doc.text(text3, _const.X0, ny(8));

    doc.table(_const.X0, ny(2), datosAclarar, headers.datosAclarar, {
        autoSize : false,
        headerBackgroundColor:'#f8f8ff',
        fontSize : 11,
        padding : 1
    });

    const BOTTOM_Y = 270 + 5;
    const LINE_Y = BOTTOM_Y - 40 - 5;
    doc.line(MIDDLE_X-MIDDLE_X/2, LINE_Y, MIDDLE_X+MIDDLE_X/2,LINE_Y);
    doc.text("Nombre y firma del interesado o apoderado", MIDDLE_X, LINE_Y + 5, {align : "center"});

    if (props.promovente.telefono) {
        doc.text(`Telefono: ${props.promovente.telefono}`, _const.X0, LINE_Y + 15);
    }

    doc.text(`Correo electrónico: ${props.promovente.email}`, _const.X0, LINE_Y + 20);

    const finalText = 'Las firmas deberán ser autógrafas y anexar copia de identificación oficial ' +
        'vigente con fotografía y firma de cada una de las personas que intervienen en la misma. ' +
        'Favor de firmar con tinta azul.';
    
    doc.setFontSize(10);
    doc.text(finalText, _const.X0, LINE_Y + 30, {maxWidth : 170});

    doc.setFontSize(8);
    doc.text('Arcos de Belén s/n. Esquina Dr. Andrade', _const.X0, BOTTOM_Y);
    doc.text('Col. Doctores, Alcaldia Cuauhtemoc', _const.X0, BOTTOM_Y + 4);
    doc.text('C.P. 06720, Ciudad de México', _const.X0, BOTTOM_Y + 8);
    doc.text('Tel. 91 7967 00 ext. 2031', _const.X0, BOTTOM_Y + 12);

    doc.setFontSize(10);
    doc.text('CIUDAD INNOVADORA', RIGHT_X, BOTTOM_Y + 4, 'right');
    doc.text('Y DE DERECHOS', RIGHT_X, BOTTOM_Y + 8, 'right');

    function getPdfFile (event) {
        doc.save('aclaraciones.pdf');
    }

    return (
        <Button type="button" onClick={event => getPdfFile(event)}
            variant="contained"
            color="success"
            fullWidth>

            Imprimir
        </Button>
    );
}