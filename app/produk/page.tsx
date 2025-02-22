"use client";

// PRODUK: nama, harga, stok, deskripsi

import {
  Card,
  Button,
  Form,
  InputGroup,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import {
  BsPenFill,
  BsFillTrashFill,
  BsPlusCircleFill,
  BsFilterCircleFill,
  BsSearch,
} from "react-icons/bs";
import { PRODUK } from "../../src/mock-data";
import { useState } from "react";

// type
type produkType = {
  id: number;
  nama: string;
  stok: number;
  harga: number;
  deskripsi: string;
};

const Produk = () => {
  // init state
  const [produks, setProduks] = useState(PRODUK);
  const [modalAdd, setModalAdd] = useState(false);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [formValidated, setFormValidated] = useState(false);

  const [submit, setSubmit] = useState(0);
  const [selectedProduk, setSelectedProduk] = useState(0);

  const [modalDelete, setModalDelete] = useState(false);

  // add
  const submitProduk = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (harga == 0) {
      setHarga(Number("-"));
    }
    if (stok == 0) {
      setStok(Number("-"));
    }

    setFormValidated(true);

    // validasi
    if (form.checkValidity() === true) {
      // NEW
      if (submit == 0) {
        const newProduk = {
          id: Math.random(),
          nama: nama,
          harga: harga,
          stok: stok,
          deskripsi: deskripsi,
        };

        setProduks([newProduk, ...produks]);
      } else if (submit == 1) {
        // UPDATE
        const idx = produks.findIndex((p) => p.id == selectedProduk);
        produks[idx].nama = nama;
        produks[idx].harga = harga;
        produks[idx].stok = stok;
        produks[idx].deskripsi = deskripsi;

        // console.log(produkUpdate);
      }

      setModalAdd(false);
      setFormValidated(false);
      resetSubmit();
    }
  };
  const resetSubmit = () => {
    setNama("");
    setHarga(0);
    setStok(0);
    setDeskripsi("");

    setModalAdd(false);
    setFormValidated(false);
  };

  // edit
  const editProduk = (p: produkType) => {
    setSubmit(1);

    setNama(p.nama);
    setHarga(p.harga);
    setStok(p.stok);
    setDeskripsi(p.deskripsi);
    setSelectedProduk(p.id);
    setModalAdd(true);
  };

  // delete
  const delProduk = () => {
    setProduks((p) => p.filter((c) => c.id !== selectedProduk));
    setModalDelete(false);
  };

  // cari
  // const searchProduk = (k: string) => {
  //   if (k == "Enter" && search.length > 2) {
  //     const sp = copyProduk.filter(
  //       (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
  //     );
  //     // console.log(sp);
  //     setProduks([...sp]);
  //   }
  // };

  // sorting

  return (
    <div>
      <h2 className="mx-8 my-4">Manajemen Produk</h2>
      {/* top menu: cari, sort, add */}
      <div className="mx-8 flex justify-between">
        <div className="w-1/2 sm:w-1/4">
          <InputGroup className="mb-3">
            <Form.Control placeholder="nama produk" />
            <Button variant="outline-secondary" id="button-addon2">
              <BsSearch />
            </Button>
          </InputGroup>
        </div>

        <div className="!space-x-2">
          <Button
            variant="primary"
            className="p-2 !rounded-full"
            onClick={() => {
              setSubmit(0);
              setModalAdd(true);
            }}
          >
            <BsPlusCircleFill />
          </Button>
          <Button variant="primary" className="p-2 !rounded-full">
            <BsFilterCircleFill />
          </Button>
        </div>
      </div>

      {/* data: card */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:flex-wrap mx-4">
        {produks.map((produk, i) => (
          //CardProduct COMPONENT
          <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2">
            <Card className="">
              <Card.Img variant="top" src="produk.jpg" />
              <Card.Body>
                <Card.Title className="mb-2 !font-bold">
                  {produk.nama}
                </Card.Title>

                <div className="!space-y-1">
                  <Card.Text className="min-h-20">{produk.deskripsi}</Card.Text>
                  <Card.Text className="!font-bold !text-gray-400">
                    Rp {produk.harga}
                  </Card.Text>
                  <Card.Text className="!font-bold !text-gray-400">
                    {produk.stok} pcs
                  </Card.Text>
                </div>

                <div className="text-right !space-x-2 mt-2">
                  <Button
                    variant="primary"
                    className="p-2 !rounded-full"
                    onClick={() => editProduk(produk)}
                  >
                    <BsPenFill />
                  </Button>
                  <Button
                    variant="primary"
                    className="p-2 !rounded-full"
                    onClick={() => {
                      setModalDelete(true);
                      setSelectedProduk(produk.id);
                    }}
                  >
                    <BsFillTrashFill />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* MODAL SUBMIT */}
      <Modal
        show={modalAdd}
        onHide={resetSubmit}
        backdrop="static"
        keyboard={false}
      >
        <Form noValidate validated={formValidated} onSubmit={submitProduk}>
          <Modal.Header closeButton>
            <Modal.Title>
              {submit == 0 ? "Add Product" : "Update Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="space-y-4">
            {/* form add*/}
            <FloatingLabel label="Nama" className="">
              <Form.Control
                value={nama}
                required
                type="text"
                placeholder=""
                onChange={(e) => setNama(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Nama Wajib diisi.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Harga" className="">
              <Form.Control
                value={harga}
                required
                type="number"
                placeholder=""
                onChange={(e) => setHarga(Number(e.target.value))}
              />
              <Form.Control.Feedback type="invalid">
                Harga Wajib diisi.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Stok" className="">
              <Form.Control
                value={stok}
                required
                type="number"
                placeholder=""
                onChange={(e) => setStok(Number(e.target.value))}
              />
              <Form.Control.Feedback type="invalid">
                Stok Wajib diisi.
              </Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label="Deskripsi" className="">
              <Form.Control
                value={deskripsi}
                required
                as="textarea"
                type="text"
                placeholder="deskripsi produk"
                className="!h-40"
                onChange={(e) => setDeskripsi(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Deskripsi Wajib diisi.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetSubmit}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {submit == 0 ? "Submit" : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* MODAL DELETE */}
      <Modal
        show={modalDelete}
        onHide={() => setModalDelete(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-4">
          <p>Apakah yakin ingin menghapus produk ini ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalDelete(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => delProduk()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Produk;
