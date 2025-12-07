import { useEffect, useState } from "react";
import api from "../config/axios";


export default function VisitasCounter() {


    //Porque useState devuelve un array de 2 posiciones: [ valorActual , funcionParaActualizar ]
    const [visitas, setVisitas] = useState(0);
    useEffect(() => {
        api.get('/')
            .then(res => setVisitas(res.data.total))
            .catch(() => setVisitas(0));
    }, []);

    return (
        <p className="text-white text-sm uppercase font-bold"
            style={{ textShadow: "2px 2px 4px red" }}>

            Visitas Totales: {visitas}
        </p>
    )
}