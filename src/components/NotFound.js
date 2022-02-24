import {Link} from 'react-router-dom';


export default function NotFound (props) {
    return (
        <>
            <div>{props.msg}</div>
            <Link to="/aclaraciones">Regresar.</Link>
        </>
    )
}