import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PendaftarItem = ({ pendaftar, index, onDelete }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div className="d-flex align-items-center">
          <div>
            <div className="fw-bold">{pendaftar.nm_pendaftar}</div>
            <div className="text-muted small">{pendaftar.nisn}</div>
          </div>
        </div>
      </td>
      <td>
        <i
          className={`fas ${
            pendaftar.jenis_kelamin === "Laki-laki"
              ? "fa-male text-primary"
              : "fa-female text-danger"
          } me-1`}
        ></i>
        {pendaftar.jenis_kelamin}
      </td>
      <td>{pendaftar.no_hp}</td>
      <td>{pendaftar.asal_sekolah}</td>
      <td>{pendaftar.jurusan}</td>
      <td>{pendaftar.nisn}</td>
      <td>
        <div className="d-flex">
          <Link to={`/edit/${pendaftar.id_pendaftar}`}>
            <Button
              variant="warning"
              size="sm"
              className="btn-action btn-icon me-2"
            >
              Edit
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            className="btn-icon"
            onClick={() => onDelete(pendaftar.id_pendaftar)}
          >
            Hapus
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default PendaftarItem;
