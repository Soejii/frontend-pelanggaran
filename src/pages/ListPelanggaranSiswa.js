import { useState, useEffect } from "react";
import axios from "axios";
import { Toast } from "bootstrap";

export default function ListPelanggaranSiswa() {
    let [list, setList] = useState([])
    let [message, setMessage] = useState("")

    let token = localStorage.getItem("token-pelanggaran")
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    {/** create function to show Toast */ }
    let showToast = message => {
        let roti = new Toast(document.getElementById(`roti`), {
            autohide: true
        }
        )
        /** prenitah untuk mengisi state 'message' */
        setMessage(message)

        /** showing the Toast */
        roti.show()
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

    let deleteData = item => {
        if (window.confirm('Are you sure want to delete this data?')) {
            let endpoint = `http://localhost:8080/pelanggaran_siswa/${item.id_pelanggaran_siswa}`
            /** sending data to delete */
            axios.delete(endpoint, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh data pelanggaran */
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    let editData =

        useEffect(() => {
            getData()
        }, [])
    return (
        <div className="container-fluid">
            {/* Component Toast*/}
            <div className="position-fixed top-0 end-0 p-3"
                style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="roti">
                    <div className="toast-header bg-primary text-white">
                        <strong className="text-white">Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/** end component toast */}
            <div className="card">
                <div className="card-header"
                    style={{ background: 'salmon' }}>
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
                                {/**Edit Button */}
                                <div className="col-2">
                                    <button className="btn btn-success m-2"
                                        onClick={() => editData(item)}>
                                        <span className="fa fa-edit"></span>
                                    </button>
                                    <button className="btn btn-danger m-2"
                                        onClick={() => deleteData(item)}>
                                        <span className="fa fa-trash"></span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <small>
                                    Detail Pelanggaran
                                </small>
                                {item.detail_pelanggaran_siswa.map(detail => (
                                    <h6
                                        key={`idDetail${detail.id_pelanggaran}`}>
                                        -{detail.pelanggaran.nama_pelanggaran} ({detail.pelanggaran.poin})
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