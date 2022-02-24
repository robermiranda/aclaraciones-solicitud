export function getDateTime (t: number = Date.now()): string {
    return new Intl.DateTimeFormat('es-MX', {
        year : 'numeric',
        month : '2-digit',
        day : '2-digit',
        hour : 'numeric',
        minute : 'numeric',
        second : 'numeric',
        hour12 : false
    }).format(t);
}

export function fechaStr(date: string): string {
    
    function getMonth (n: number): string {
        switch (n) {
            case 1: return 'Enero';
            case 2: return 'Febrero';
            case 3: return 'Marzo';
            case 4: return 'Abril';
            case 5: return 'Mayo';
            case 6: return 'Junio';
            case 7: return 'Julio';
            case 8: return 'Agosto';
            case 9: return 'Septiembre';
            case 10: return 'Octubre';
            case 11: return 'Noviembre';
            case 12: return 'Diciembre';
            default: return '';
        }
    }

    const dateArr = date.split('/')
    const dia = parseInt(dateArr[0])
    const mes = getMonth(parseInt(dateArr[1]))
    const anio = parseInt(dateArr[2])
    
    return `${dia} de ${mes} de ${anio}`
}
