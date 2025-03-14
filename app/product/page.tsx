"use client";

// MODULE ALIAS  import Tes from "@/components/tes";
import {
  Card,
  Button,
  Form,
  InputGroup,
  Modal,
  FloatingLabel,
  Pagination,
  FormCheck,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import {
  BsPenFill,
  BsTrashFill,
  BsPlusCircleFill,
  BsFilter,
  BsSearch,
  BsFunnelFill,
  BsBellFill,
} from "react-icons/bs";
import { PRODUK } from "../../lib/mock-data";
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
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [produks, setProduks] = useState(PRODUK);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [nama, setNama] = useState("");
  const [harga, setHarga] = useState(0);
  const [stok, setStok] = useState(0);
  const [deskripsi, setDeskripsi] = useState("");
  const [formValidated, setFormValidated] = useState(false);

  const [submit, setSubmit] = useState(0);
  const [selectedProduk, setSelectedProduk] = useState(0);

  const [modalDelete, setModalDelete] = useState(false);
  const [modalDeletes, setModalDeletes] = useState(false);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // add
  const submitProduk = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    setFormValidated(true);

    // validasi inputs with schema
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
        setToastMessage("Successfully add product");
      } else if (submit == 1) {
        // UPDATE
        const idx = produks.findIndex((p) => p.id == selectedProduk);
        produks[idx].nama = nama;
        produks[idx].harga = harga;
        produks[idx].stok = stok;
        produks[idx].deskripsi = deskripsi;

        setToastMessage("Successfully updated product");
      }

      setModalSubmit(false);
      setFormValidated(false);
      setToast(true);
    }
  };
  const resetFormSubmit = () => {
    setNama("");
    setHarga(0);
    setStok(0);
    setDeskripsi("");

    // setModalSubmit(false);
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
    setModalSubmit(true);
  };

  // delete
  const delProduk = () => {
    setProduks((p) => p.filter((c) => c.id !== selectedProduk));
    setModalDelete(false);
    setToast(true);
    setToastMessage("Successfully deleted product");
  };

  const _selectProducts = (
    id: number,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    const checked = e.currentTarget.checked;
    if (checked) {
      setSelectedProducts([id, ...selectedProducts]); //add
    } else {
      // remove
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    }
  };

  const _deleteProducts = () => {
    console.log(selectedProducts);
    setProduks(produks.filter((x) => !selectedProducts.includes(x.id)));
    setModalDeletes(false);
    setToast(true);
    setToastMessage("Successfully deleted these Products");
  };

  // search product
  // const searchProduct = (k: string) => {
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
    <div className="2xl:max-w-3/4 mx-auto">
      <h2 className="mx-8 my-4">Manajemen Produk</h2>
      {/* add, table filter: cari, sort, selection,  */}
      <div className="mx-8 flex! flex-col-reverse sm:flex-row justify-between sm:items-center mb-3 ">
        <div className="w-full sm:w-1/3">
          <InputGroup className="">
            <Form.Control placeholder="nama produk" />
            <Button variant="outline-secondary" id="button-addon2">
              <BsSearch />
            </Button>
          </InputGroup>
        </div>

        <div className="!space-x-2 ">
          <Button
            title="add new product"
            variant="link"
            className="p-0 !m-0 !rounded-full"
            onClick={() => {
              setSubmit(0);
              setModalSubmit(true);
              resetFormSubmit();
            }}
          >
            <BsPlusCircleFill className="text-[48px] sm:text-[54px] p-2" />
          </Button>
          {/* deletes */}
          <Button
            disabled={selectedProducts.length >= 1 ? false : true}
            variant="primary"
            className="p-0 !rounded-full"
            onClick={() => setModalDeletes(true)}
          >
            <BsTrashFill className="text-3xl sm:text-4xl p-2" />
          </Button>
          {/* sorting */}
          <Button variant="primary" className="p-0 !rounded-full">
            <BsFilter className="text-3xl sm:text-4xl p-1" />
          </Button>
          {/* filter */}
          <Button variant="primary" className="p-0 !rounded-full">
            <BsFunnelFill className="text-3xl sm:text-4xl p-2" />
          </Button>
        </div>
      </div>

      {/* list products */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:flex-wrap mx-4">
        {produks.map((produk) => (
          //COMPONENT CardProduct, multy select data
          <div
            key={produk.id}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 "
          >
            <Card className="hover:shadow-lg hover:cursor-pointer">
              <FormCheck className="absolute left-2 top-1">
                <FormCheck.Input
                  type="checkbox"
                  className="shadow-sm"
                  onChange={(e) => _selectProducts(produk.id, e)}
                />
              </FormCheck>
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
                    <BsPenFill className="text-base" />
                  </Button>
                  <Button
                    variant="primary"
                    className="p-2 !rounded-full"
                    onClick={() => {
                      setModalDelete(true);
                      setSelectedProduk(produk.id);
                    }}
                  >
                    <BsTrashFill className="text-base" />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* pagination */}
      <div className="mx-8 mt-4 sm:mt-2! justify-items-center">
        <Pagination>
          <Pagination.Prev />
          <Pagination.Item>x</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </div>

      {/* action notification with TOAST */}

      {/* MODAL SUBMIT */}
      <Modal
        show={modalSubmit}
        onHide={() => setModalSubmit(false)}
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
                min={1}
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
                min={1}
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
            <Button variant="secondary" onClick={() => setModalSubmit(false)}>
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

      {/* MODAL DELETEs PRODUCTS */}
      <Modal
        show={modalDeletes}
        onHide={() => setModalDeletes(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Products</Modal.Title>
        </Modal.Header>
        <Modal.Body className="space-y-4">
          <p>Are you sure want to delete these selected products?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalDeletes(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => _deleteProducts()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* NOTIF TOAST */}
      <ToastContainer className="z-10 mb-4" position="bottom-center">
        <Toast
          bg="primary"
          onClose={() => setToast(false)}
          show={toast}
          delay={3000}
          autohide
        >
          <Toast.Header closeButton={false} className="justify-end">
            <BsBellFill className="text-xl text-orange-600" />
          </Toast.Header>
          <Toast.Body className="font-bold text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Produk;
