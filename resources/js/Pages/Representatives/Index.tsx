import SearchBarComponent from "@/Components/SearchBar";
import { type ResponsePaginator } from "@/types/global";
import { Link } from "@inertiajs/react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { type IRepresentative } from "./types/representatives";

export default function Index({data}: ResponsePaginator<IRepresentative>) {
    return (
        <div className="container">
        <SearchBarComponent
            path="/representatives"
            title="representatives"
            withPaginator={true}
            notLoadDataOnInit={true}
            buttons={<>
                <Link href="/representatives/create" className="btn-custom btn-create">Crear representante</Link>
            </>}
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
                            <TableCell>id</TableCell>
                            <TableCell>Nombres</TableCell>
                            <TableCell>Apellidos</TableCell>
                            <TableCell>Correo</TableCell>
                            <TableCell>Dirección</TableCell>
                            <TableCell>Tipo Doc</TableCell>
                            <TableCell>Numero Doc</TableCell>
                            <TableCell>Sexo</TableCell>
                            <TableCell>Ocupacion</TableCell>
                        
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
                                    {row.first_name}
                                </TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.doc_type}</TableCell>
                                <TableCell>{row.doc_number}</TableCell>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{row.occupation}</TableCell>
                                <TableCell>
                                   <div className="flex gap-1">
                                     <Link href={"/representatives/"+ row.id}  className="btn-icon btn-c-edit">
                                         <i className="fas fa-edit"></i>
                                     </Link>
                                     {/* <button onClick={() => deleteCourse(row.id)} className="btn-icon btn-c-edit">
                                     <i className="fa-solid fa-trash text-red-600"></i>
                                     </button> */}
                                   </div>
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </SearchBarComponent>

        {/* <CreateOrEditCourse setIsOpen={setIsOpen}  isOpen={isOpen} data={dataEdit || undefined} state="create"/> */}
    </div>
    )
}