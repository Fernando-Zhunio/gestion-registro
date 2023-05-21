import { useEffect, useState } from "react"
import SearchBarComponent from "./SearchBar"
import { set } from "react-hook-form";

export default function SearchRepresentative() {
    const [representatives, setRepresentatives] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagesOption, setPagesOption] = useState({page: 1, pageSize: 10});
    const [search, setSearch] = useState('')
    useEffect(() => {
        fetchGetRepresentatives()
    }, [])



    function fetchGetRepresentatives() {
        setIsLoading(true)
        let url = `/representatives/index-api?search=${search}&page=${pagesOption.page}&pageSize=${pagesOption.pageSize}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setIsLoading(false)
                // setRepresentatives(data)
            }). catch(error => {
                setIsLoading(false)
            })
    }
    return (
        <div className="dialog-custom">
            <div className="dialog-custom-container md:w-2/4">
                <div className="bg-slate-200 rounded-md flex justify-between items-center px-3">
                    <input placeholder="Buscador de representantes" className="grow px-0 border-none bg-transparent" value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
                    <span>
                        <button className="border p-2"><i className="fa-solid fa-magnifying-glass"></i></button>
                        <span className="p-2"><i className="text-slate-500 fa-solid fa-spinner animate-spin"></i></span>
                        <button className="border p-2 text-red-700"><i className="fa-solid fa-xmark"></i></button>
                    </span>
                </div>
            </div>
        </div>
    )
}