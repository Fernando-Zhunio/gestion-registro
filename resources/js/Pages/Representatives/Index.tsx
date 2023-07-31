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
import { ConstDocTypes, ConstGender } from "@/Classes/Consts";
import { useState } from "react";
import FormRepresentative from "@/Shared/FormRepresentative";

export default function Index({ data }: ResponsePaginator<IRepresentative>) {
    const [isOpen, setIsOpen] = useState(false);
    const [representative, setRepresentative] = useState<IRepresentative | null>(null);
    function openDialogCreateOrEditRepresentative(_representative: IRepresentative | null) {
        setRepresentative(_representative);
        setIsOpen(true);
    }
    return (
        <div>
            <SearchBarComponent
                path="/representatives"
                title="Representantes"
                withPaginator={true}
                notLoadDataOnInit={true}
                buttons={
                    <>
                        <button
                            onClick={() => openDialogCreateOrEditRepresentative(null)}
                            className="btn-custom btn-create"
                        >
                            Crear representante
                        </button>
                    </>
                }
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        fontWeight: "bold",
                                        color: "gray",
                                    },
                                }}
                            >
                                <TableCell>id</TableCell>
                                <TableCell>Nombres</TableCell>
                                <TableCell>Apellidos</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Tipo Doc</TableCell>
                                <TableCell>Numero Doc</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell>Ocupacion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.first_name}</TableCell>
                                    <TableCell>{row.last_name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.address}</TableCell>
                                    <TableCell>{row.phone}</TableCell>
                                    <TableCell>
                                        {
                                            (ConstDocTypes() as any)[
                                                row.doc_type as any
                                            ]
                                        }
                                    </TableCell>
                                    <TableCell>{row.doc_number}</TableCell>
                                    <TableCell>{(ConstGender() as any)[row.gender]}</TableCell>
                                    <TableCell>{row.occupation}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <button
                                                onClick={() => openDialogCreateOrEditRepresentative(row)}
                                                className="btn-icon"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SearchBarComponent>
            {isOpen && <FormRepresentative representative={representative} isOpen={isOpen} setOpen={setIsOpen} />}
        </div>
    );
}
