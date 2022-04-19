import { useState } from "react";
import { useEffect } from "react";
import axios, { Axios } from "axios";
import { Modal, Toast } from "bootstrap";

export default function Siswa() {
    let [siswa, setSiswa] = useState([])
    let [idSiswa, setIdSiswa] = useState(0)
    let [nis, setNis] = useState(0)
    let [name, setName] = useState("")
    let [kelas, setKelas] = useState("")
    let [image, setImage] = useState(null)
    let [poin, setPoin] = useState(0)
    let [action, setAction] = useState("")
    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)
    let [uploadImage, setUploadImage] = useState(true)

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

    let addSiswa = () => {
        /** open modal */
        modal.show()
        /** Mengosongkan inputan form */
        setIdSiswa(0)
        setName("")
        setKelas("")
        setNis(0)
        setImage(null)
        setPoin(0)
        setAction("insert")
        setUploadImage(true)
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

    let editSiswa = item => {
        /** show modal */
        modal.show()

        /** mengisi inputan sesuai yang dipilih */
        setIdSiswa(item.id_siswa)
        setName(item.name)
        setNis(item.nis)
        setKelas(item.kelas)
        setPoin(item.poin)
        setAction("edit")
        setImage(null)
        setUploadImage(false)
    }

    useEffect(() => {
        let myModal = new Modal(document.getElementById("formSiswa")
        )
        setModal(myModal)
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
                    style={{ background: `salmon` }}>
                    <h4 className="text-white">
                        Data Siswa
                    </h4>
                </div>
                <div className="card-body">
                    <ul className="list-group"
                        style={{ background: `mintcream` }}>
                        {siswa.map(item => (
                            <li className="list-group-item"
                                key={`key${item.id_siswa}`}>
                                <div className="row">
                                    {/** Image Section */}
                                    <div className="col-4">
                                        <img src={`http://localhost:8080/image/${item.image}`}
                                            alt="Gambar Siswa"
                                            style={{ width: `250px`, height: `250px`, borderRadius: `50%` }}></img>
                                    </div>

                                    {/** Description */}
                                    <div className="col-8">
                                        <small className="text-primary">Nama</small>
                                        <h5>{item.name}</h5>
                                        <small className="text-primary">NIS</small>
                                        <h5>{item.nis}</h5>
                                        <small className="text-primary">Kelas</small>
                                        <h5>{item.kelas}</h5>
                                        <small className="text-primary">Point</small>
                                        <h5>{item.poin}</h5>
                                        {/** Edit Button */}
                                        <button className="btn btn-success m-2"
                                        onClick={() => editSiswa(item)}>
                                            <span className="fa fa-edit"></span>
                                        </button>
                                        <button className="btn btn-danger m-2">
                                            <span className="fa fa-trash"></span>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {/** Button add siswa */}
                    <button className="btn btn-primary"
                    onClick={() => addSiswa()}
                    >
                        <span className="fa fa-plus"></span>
                    </button>
                    {/** Modal Form siswa */}
                    <div className="modal" id="formSiswa">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-white">
                                    <h4 className="text-black">
                                        Form Siswa
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        {/** input for NIS */}
                                        NIS
                                        <input type="number" className="form-control mb-2"
                                            required
                                            value={nis}
                                            onChange={ev => setNis(ev.target.value)}></input>

                                        {/** Name Input */}
                                        Name
                                        <input type="text" className="form-control mb-2"
                                            required
                                            value={name}
                                            onChange={ev => setName(ev.target.value)}></input>

                                        {/** Class Input */}
                                        Class
                                        <input type="text" className="form-control mb-2"
                                            required
                                            value={kelas}
                                            onChange={ev => setKelas(ev.target.value)}></input>

                                        {/** Poin Input */}
                                        Poin
                                        <input type="number" className="form-control mb-2"
                                            required
                                            value={poin}
                                            onChange={ev => setPoin(ev.target.value)}></input>

                                        {/** Image Input */}
                                        Image
                                        <input type="file" className="form-control mb-2"
                                            required= {uploadImage} accept="image/*"
                                            onChange={ev => setImage(ev.target.files[0])}></input>

                                        {/** Button for Submit */}
                                        <button className="btn btn-success" type="submit">
                                            Save
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}