import SearchBarComponent from '@/Components/SearchBar'
import { Link } from '@inertiajs/react'
import React from 'react'
import { VscPersonAdd } from 'react-icons/vsc'
const Index = ({teachers}: any) => {
    function Buttons() {
        return (
            <>
             <Link href='/teachers/create' className='btn-create btn-custom'>
                <VscPersonAdd/> Agregar
             </Link>
             {/* <button>

             </button> */}
            </>
        )
    }
    return (
        <>
        <SearchBarComponent
        path='/teachers'
        title='Profesores'
        placeholder='Buscar profesor'
        buttons={<Buttons/>}
        ></SearchBarComponent>
        </>
    )
}

export default Index