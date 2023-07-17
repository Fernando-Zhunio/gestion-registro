import SearchBarComponent from '@/Components/SearchBar'
import { type ITeacher } from '@/Models/teacher'
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
const IndexTeacher = ({data}: {data: {data:ITeacher[]}}) => {
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
                                <TableCell>ID</TableCell>
                                <TableCell>TITULO</TableCell>
                                <TableCell>DIRECCIÓN</TableCell>
                                <TableCell>NACIMIENTO</TableCell>
                                <TableCell>DOCUMENTO</TableCell>
                                <TableCell>EMAIL</TableCell>
                                <TableCell>PERIODO</TableCell>
                                <TableCell>TELÉFONO</TableCell>
                                <TableCell>PRIMER DIA</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    <TableCell>
                                        {row.id}
                                    </TableCell>
                                    <TableCell>
                                        {row.academic_title}
                                    </TableCell>
                                    <TableCell>
                                        {row.address}
                                    </TableCell>
                                    <TableCell>{row.birthday}</TableCell>
                                    <TableCell>{row.doc_type} - {row.doc_number}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.period_id}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>{row.working_day}</TableCell>
                                    <TableCell>
                                        <Link href={`/teachers/${row.id}`} onClick={() => {}} className="btn-icon btn-c-edit">
                                            <i className="fas fa-edit"></i>
                                        </Link>
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

export default IndexTeacher