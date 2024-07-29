import { useRef } from 'react';
import { apic_set_file, apic_get_file } from 'src/svc/api'

export function Gastos () {

    // No usar el parser para esto; ahora parseo de forma distinta
    // // Los keywords que voy a detectar, y las funciones que ejecutan:
    // const comandos = {
    //     'gastos': (arg) => {output(JSON.stringify(obtenerArrayGastos(arg)))},
    // };

    function obtenerArrayGastos(input) {
        const regex = /([a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+)\s(\d+)(?:\scon\s(\d+))?/g;
        const result = [];
        let match;
    
        while ((match = regex.exec(input)) !== null) {
            console.log(match);
            const item = match[1].trim().toLowerCase();
            let value = parseInt(match[2], 10);
            const decimal = match[3] ? parseInt(match[3], 10) : null;
            if (decimal) {
                value += decimal/100;
            }
            result.push({item, value, timestamp: new Date()})
        }
        
        return result;
    }

    //-----

    const inputRef = useRef(null);
    const outputRef = useRef(null);

    function output(texto) {
        outputRef.current.append(texto);
        outputRef.current.append('\n');
        console.log(outputRef);
    }

    function clear() {
        inputRef.current.value = '';
    }

    const handleSubmit = async () => {
        outputRef.current.innerText = '';
        const resultado = obtenerArrayGastos(inputRef.current.value);
        console.log(resultado);
        output(JSON.stringify(resultado));
        let gastosAcumulados, arrGastosAcumulados;
        try {
            gastosAcumulados = await apic_get_file('/gastos.json');
            arrGastosAcumulados = JSON.parse(gastosAcumulados);
        }
        catch {
            arrGastosAcumulados = [];
        }
        console.log("arrGastosAcumulados", arrGastosAcumulados);
        arrGastosAcumulados.push(...resultado);
        await apic_set_file('/gastos.json', JSON.stringify(arrGastosAcumulados));
        clear();
    }

    const handleKey = (e) => {
        console.log(e);
        if (e.key === "Enter") {
            handleSubmit();
        }
    }

    return (
    <div>
        <h1>Registrar gastos por dictado</h1>
        <p>Ingresar cada item seguido de su precio, por ejemplo: "fideos 1000 fotocopia 100 con 50".</p>
        <p>La palabra "con", si viene justo después del primer número de un precio, es reconocida como un punto decimal.</p>
        <p>Los gastos ingresados se guardan en el archivo gastos.json.</p>
        <div style={{display:'flex', flexDirection:'column', gap:"1rem"}}>
            <input onKeyDown={handleKey} ref={inputRef} type="text" id="texto" defaultValue="Aceite 1500 computadora 3 con 50" style={{height:'3rem'}}/>
            <button onClick={clear} style={{width:'100%', height:'4rem', backgroundColor:"#400"}}>X</button>
            <button onClick={handleSubmit} style={{width:'100%', height:'4rem', backgroundColor:"#060"}}>Parse</button>
        </div>
        <p>Output:</p>
        <div ref={outputRef}></div>
    </div>
    )

}