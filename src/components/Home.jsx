import { Button } from 'primereact/button';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';

export function Home() {

    const loadBlankProjectForm = () => {
        console.log('cargar form de proyecto nuevo');
    }

    const loadBlankPublicationForm = () => {
        console.log('cargar form de publicación nueva');
    }

    const loadContent = (item)  => {
        console.log(`cargar formulario ya completo con datos de ${item}`)
    }

    return (
    <div>
    <div className="flex flex-column align-items-center justify-content-start w-full min-h-full">
        <p>Crear nueva ficha:</p>
        <div className="flex gap-2">
            <Button onClick={loadBlankProjectForm}>Nuevo proyecto</Button>
            <Button onClick={loadBlankPublicationForm}>Nueva publicación</Button>
        </div>
        <p>O trabajar en una ficha existente:</p>
        <div>
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText id="search-terms" aria-describedby="search-terms-help" className="p-inputtext-sm w-full" placeholder="Buscar fichas..." />
        </IconField>
        <small id="search-terms-help">
            Los términos son buscados en títulos, contenidos, etiquetas, etc.
        </small>
        </div>
    </div>
    <div>
        <p>[mostrar lo siguiente solo al hacer una búsqueda:]</p>
        <h2>Resultados de la búsqueda:</h2>
        <div className='listado flex flex-column gap-2'>
            {['Publicación 1', 'Proyecto 1', 'Título más largo de una publicación que se va a mostrar en varias líneas en anchos de pantalla demasiado chicos']
                .map((p, idx) => <div onClick={() => loadContent('id_contenido')} className='ficha border-1 border-100 hover:surface-50 border-round cursor-pointer p-3' key={idx}>{p}</div>)
            }
        </div>
    </div>
    </div>
    
)
}