"use client";

// PRODUK: nama, harga, stok, deskripsi

import { Card, Button, Form, InputGroup } from "react-bootstrap";
import {
  BsPenFill,
  BsFillTrashFill,
  BsPlusCircleFill,
  BsFilterCircleFill,
  BsSearch,
} from "react-icons/bs";
import { PRODUK } from "../../src/mock-data";
import { useState } from "react";

const Produk = () => {
  // init state
  const [produks, setProduk] = useState(PRODUK);

  // edit

  // delete

  // cari

  // add

  // sorting

  return (
    <div>
      <h2>Manajemen Produk</h2>
      {/* top menu: cari, sort, add */}
      <div className="mx-8 flex justify-between">
        <div className="w-1/2 sm:w-1/4">
          <InputGroup className="mb-3">
            <Form.Control placeholder="search produk" />
            <Button variant="outline-secondary" id="button-addon2">
              <BsSearch />
            </Button>
          </InputGroup>
        </div>

        <div className="!space-x-2">
          <Button variant="primary" className="p-2 !rounded-full">
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
                  <Card.Text>{produk.deskripsi}</Card.Text>
                  <Card.Text className="!font-bold !text-gray-400">
                    Rp {produk.harga}
                  </Card.Text>
                  <Card.Text className="!font-bold !text-gray-400">
                    {produk.stok} pcs
                  </Card.Text>
                </div>

                <div className="text-right !space-x-2 mt-2">
                  <Button variant="primary" className="p-2 !rounded-full">
                    <BsPenFill />
                  </Button>
                  <Button variant="primary" className="p-2 !rounded-full">
                    <BsFillTrashFill />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produk;
