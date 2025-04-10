import React from "react";
import { Table, Button, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import { deletePendaftar } from "../services/api";
import PendaftarItem from "./PendaftarItem";

const PendaftarList = ({ pendaftarList, onDataChange }) => {
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Hapus",
        text: "Apakah Anda yakin ingin menghapus data pendaftar ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await deletePendaftar(id);
        await onDataChange();
        Swal.fire("Terhapus!", "Data pendaftar berhasil dihapus.", "success");
      }
    } catch (error) {
      Swal.fire("Error!", "Gagal menghapus data pendaftar.", "error");
      console.error("Error deleting pendaftar:", error);
    }
  };

  return (
    <div>
      <Table hover responsive className="data-table">
        <thead>
          <tr>
            <th style={{ width: "50px" }}>No</th>
            <th>Nama Pendaftar</th>
            <th>Jenis Kelamin</th>
            <th>No HP</th>
            <th>Asal Sekolah</th>
            <th>Jurusan</th>
            <th>NISN</th>
            <th style={{ width: "150px" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pendaftarList.map((pendaftar, index) => (
            <PendaftarItem
              key={pendaftar.id_pendaftar}
              pendaftar={pendaftar}
              index={index}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PendaftarList;
