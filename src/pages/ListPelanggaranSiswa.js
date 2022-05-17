import { useState,useEffect } from "react";
import axios from "axios";

export default function ListPelanggaranSiswa(){
    let [list, setList] = useState([])

    let token = localStorage.getItem("token-pelanggaran")
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8080/pelanggaran_siswa`
        /** Sending data */
        axios.get(endpoint, authorization)
    .then(result => {
        setList(result.data)
    })
        .catch(error => console.log(error))        
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header"
                style={{background : 'salmon'}}>
                    <h4 className="text-white" >
                        List Pelanggaran Siswa
                    </h4>
                </div>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {list.map(item => (
                        <li className="list-group-item"
                        key={`idPelanggaran${item.id_pelanggaran_siswa}`}>
                            <div className="row">
                                <div className="col-4">
                                    <small>Nama Siswa</small>
                                    <h5>{item.siswa.nama}</h5>
                                </div>
                                <div className="col-2">
                                    <small>Poin Siswa</small>
                                    <h5>{item.siswa.poin}</h5>
                                </div>
                                <div className="col-4">
                                    <small>Waktu Pelanggaran</small>
                                    <h5>{item.waktu}</h5>
                                </div>
                            </div>
                            <div>
                                <small>
                                    Detail Pelanggaran
                                </small>
                                {item.detail_pelanggaran_siswa.map(detail => (
                                    <h6
                                    key={`idDetail${detail.id_pelanggaran}`}>
                                        {detail.pelanggaran.nama_pelanggaran}
                                    </h6>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}