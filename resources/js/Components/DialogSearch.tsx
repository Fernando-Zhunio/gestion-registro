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
import DialogCustom from "./DialogCustom";
interface DialogSearchProps {
    isOpen: boolean;
    close: () => void;
    columns: { [key: string]: string };
    path: string;
    body?: any;
    placeholder?: string;
    onSelectRow: (row: any) => void;
}
export function DialogSearch({
    isOpen,
    close,
    columns,
    body,
    path,
    placeholder,
    onSelectRow,
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
                setData(data.data.data);
                // setRepresentatives(data)
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }

    function handlerSelectRow(row: any) {
        onSelectRow(row);
        close();
    }
    return (
        // <div className="dialog-custom">
        <div>
            {/* <div className="dialog-custom-container md:w-2/4"> */}
            <DialogCustom
                open={isOpen}  
            >
                <div className="bg-slate-200 rounded-md flex justify-between items-center px-3">
                    <input
                        placeholder={placeholder || "Buscador"}
                        className="grow px-0 border-none bg-transparent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                    />
                    <span>
                        <button onClick={fetchGetRepresentatives} className="border p-2">
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
                                </TableRow>
                            </TableHead>
                            {body || (
                                <TableBody>
                                    {data.map((row: any) => (
                                        <TableRow hover key={row["id"]} onClick={() => handlerSelectRow(row)}>
                                            {Object.keys(columns).map(
                                                (column, index) => (
                                                    <TableCell key={index}>
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
            </DialogCustom>
            {/* </div> */}
        </div>
    );
}

export default DialogSearch;
