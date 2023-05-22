import { useEffect, useState } from "react";
import SearchBarComponent from "./SearchBar";
// import { set } from "react-hook-form";
import { createPortal } from "react-dom";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
// import { TableBody, TableCell } from "@mui/material";
import EmptyState from "../Components/EmptyState";
interface DialogSearchProps {
    isOpen: boolean;
    close: () => void;
    columns: { [key: string]: string };
    path: string;
    body?: any;
    placeholder?: string;
}
export function DialogSearch({
    isOpen,
    close,
    columns,
    body,
    path,
    placeholder,
}: DialogSearchProps) {
    if (!isOpen) return null;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagesOption, setPagesOption] = useState({ page: 1, pageSize: 10 });
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetchGetRepresentatives();
    }, []);

    function fetchGetRepresentatives() {
        setIsLoading(true);
        let url = `${path}?search=${search}&page=${pagesOption.page}&pageSize=${pagesOption.pageSize}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setIsLoading(false);
                // setRepresentatives(data)
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }
    return (
        <div className="dialog-custom">
            <div className="dialog-custom-container md:w-2/4">
                <div className="bg-slate-200 rounded-md flex justify-between items-center px-3">
                    <input
                        placeholder={placeholder || "Buscador"}
                        className="grow px-0 border-none bg-transparent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                    />
                    <span>
                        <button className="border p-2">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        {isLoading && (
                            <span className="p-2">
                                <i className="text-slate-500 fa-solid fa-spinner animate-spin"></i>
                            </span>
                        )}
                        <button
                            onClick={close}
                            className="border p-2 text-red-700"
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </span>
                </div>
                <div>
                    {isLoading === false && data.length < 1 && <EmptyState />}
                    {data.length > 0 && (
                        <Table>
                            <TableHead>
                                <TableRow
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            fontWeight: "bold",
                                            color: "gray",
                                        },
                                    }}
                                >
                                    {Object.values(columns).map(
                                        (column, index) => (
                                            <TableCell key={index}>
                                                {column}
                                            </TableCell>
                                        )
                                    )}
                                    {/* <TableCell>#</TableCell>
                                <TableCell>Nombres</TableCell>
                                <TableCell>Apellidos</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Tipo Doc</TableCell>
                                <TableCell>Numero Doc</TableCell>
                                <TableCell>Sexo</TableCell>
                                <TableCell>Curso</TableCell>
                                <TableCell>Periodo</TableCell> */}
                                </TableRow>
                            </TableHead>
                            {body || (
                                <TableBody>
                                    {data.map((row: any) => (
                                        <TableRow>
                                            {Object.keys(columns).map(
                                                (column, index) => (
                                                    <TableCell key={row["id"]}>
                                                        {row[column]}
                                                    </TableCell>
                                                )
                                            )}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            )}
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DialogSearch;
