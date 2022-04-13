import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";

export default function Siswa() {
    let [siswa, setSiswa] = useState ([])

    /** preparing token taken from local storage */
    let token = localStorage.getItem(`token-pelanggaran`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    /** create function to get data siswa  */
    let getData = () => {
        let endpoint = `http://localhost:8080/siswa`

        /** send data */
        axios.get(endpoint, authorization)
        .then(response => {
            //saving the data in state
            setSiswa(response.data)
        })
        .catch(error => console.log(error))
    }
    useEffect(() => {
        getData()
    }, [])

    return(
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                style={{background:`salmon`}}>
                    <h4 className="text-white">
                        Data Siswa
                    </h4>
                </div>
                <div className="card-body">
            
                </div>
            </div>
        </div>
    )
}