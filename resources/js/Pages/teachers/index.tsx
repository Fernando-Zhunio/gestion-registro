import SearchBarComponent from '@/Components/SearchBar'
import { Link } from '@inertiajs/react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { VscPersonAdd } from 'react-icons/vsc'
const Index = ({data}: any) => {
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
        >
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{
                                "&:last-child td, &:last-child th": {
                                    fontWeight: "bold",
                                    color: 'gray'
                                }
                            }}>
                                <TableCell>Descripción</TableCell>
                                <TableCell>Inicio</TableCell>
                                <TableCell>Finalización</TableCell>
                                <TableCell>Promoción</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row: any) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell>
                                        {row.description}
                                    </TableCell>
                                    <TableCell>
                                        {row.start_date}
                                    </TableCell>
                                    <TableCell>{row.end_date}</TableCell>
                                    <TableCell>{row.promotion}</TableCell>
                                    <TableCell>
                                        <button onClick={() => {}} className="btn-icon btn-c-edit">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        </SearchBarComponent>
        </>
    )
}

export default Index