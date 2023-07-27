import SearchBarComponent from "@/Components/SearchBar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { IPeriod } from "./types/period.types";
import {  ResponsePaginator } from "@/types/global";
import { CreateOrEditPeriod } from "./CreateOrEditPeriod";

const PeriodsIndex = ({data}: ResponsePaginator<IPeriod>) => {
    // const [data, setData] = useState<Period[]>(_data.data);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [dataEdit, setDataEdit] = useState<IPeriod | undefined>(undefined);
    function openPeriod(row: IPeriod | undefined): void {
        setDataEdit(row);
        setIsOpen(true);
    }

    return (
        <div className="container">
            <SearchBarComponent
                path="/periods"
                title="Periodos"
                withPaginator={true}
                notLoadDataOnInit={true}
                buttons={<>
                    <button onClick={() => openPeriod(undefined)} className="btn-custom btn-create">Crear periodo</button>
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
                                <TableCell>Descripción</TableCell>
                                <TableCell>Inicio</TableCell>
                                <TableCell>Finalización</TableCell>
                                <TableCell>Promoción</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    // sx={{
                                    //     "&:last-child td, &:last-child th": {
                                    //         border: 0,
                                    //     },
                                    // }}
                                >
                                    <TableCell>
                                        {row.observation}
                                    </TableCell>
                                    <TableCell>
                                        {row.start_date}
                                    </TableCell>
                                    <TableCell>{row.end_date}</TableCell>
                                    <TableCell>{row.promotion}</TableCell>
                                    <TableCell>
                                        <button onClick={() => openPeriod(row)} className="btn-icon btn-c-edit">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </SearchBarComponent>

            {isOpen && <CreateOrEditPeriod setIsOpen={setIsOpen}  isOpen={isOpen} period={dataEdit || undefined}/>}
        </div>
    );
};

export default PeriodsIndex;
