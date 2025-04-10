import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Alert,
  Row,
  Col,
  Container,
  Form,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import PendaftarList from "./PendaftarList";
import { getAllPendaftar } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
// Import React Icons
import {
  FaUsers,
  FaMale,
  FaFemale,
  FaSchool,
  FaUserPlus,
  FaSearch,
  FaFilter,
  FaInbox,
  FaSpinner,
} from "react-icons/fa";

const Dashboard = () => {
  const [pendaftarList, setPendaftarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterJurusan, setFilterJurusan] = useState("");

  const fetchPendaftar = async () => {
    try {
      setLoading(true);
      const response = await getAllPendaftar();
      setPendaftarList(response.data);
      setError(null);
    } catch (err) {
      setError("Gagal memuat data pendaftar. Silakan coba lagi.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendaftar();
  }, []);

  const totalPendaftar = pendaftarList.length;
  const totalLakiLaki = pendaftarList.filter(
    (p) => p.jenis_kelamin === "Laki-laki"
  ).length;
  const totalPerempuan = pendaftarList.filter(
    (p) => p.jenis_kelamin === "Perempuan"
  ).length;

  const totalAsalSekolah = new Set(pendaftarList.map((p) => p.asal_sekolah))
    .size;

  const filteredPendaftarList = pendaftarList.filter((pendaftar) => {
    const matchesSearch =
      pendaftar.nm_pendaftar
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      pendaftar.nisn.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilterJurusan =
      filterJurusan === "" || pendaftar.jurusan === filterJurusan;

    return matchesSearch && matchesFilterJurusan;
  });

  const jurusanOptions = [
    { value: "", label: "Semua Jurusan" },
    { value: "Teknik Komputer dan Jaringan", label: "TKJ" },
    { value: "Rekayasa Perangkat Lunak", label: "RPL" },
    { value: "Multimedia", label: "MM" },
    { value: "Teknik Elektronika Industri", label: "TEI" },
    { value: "Teknik Kendaraan Ringan", label: "TKR" },
  ];

  return (
    <Container fluid className="px-4 py-4">
      <div className="dashboard-header mb-4">
        <h1 className="fw-bold text-primary">Dashboard</h1>
        <p className="text-secondary fs-5">Sistem Pendaftaran Siswa Baru</p>
        <div className="border-bottom border-2 mb-4"></div>
      </div>

      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="shadow-sm border-0 h-100 bg-primary text-white">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-light mb-1">Total Pendaftar</h6>
                  <h2 className="fw-bold mb-0">{totalPendaftar}</h2>
                </div>
                <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                  <FaUsers size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 h-100 bg-success text-white">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-light mb-1">Laki-Laki</h6>
                  <h2 className="fw-bold mb-0">{totalLakiLaki}</h2>
                </div>
                <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                  <FaMale size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 h-100 bg-info text-white">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-light mb-1">Perempuan</h6>
                  <h2 className="fw-bold mb-0">{totalPerempuan}</h2>
                </div>
                <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                  <FaFemale size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm border-0 h-100 bg-warning text-white">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="fw-light mb-1">Asal Sekolah</h6>
                  <h2 className="fw-bold mb-0">{totalAsalSekolah}</h2>
                </div>
                <div className="bg-white bg-opacity-25 p-3 rounded-circle">
                  <FaSchool size={24} />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Tindakan</h5>

            <Link to="/tambah">
              <Button
                variant="primary"
                className="d-flex align-items-center gap-2"
              >
                <FaUserPlus />
                <span>Tambah Pendaftar</span>
              </Button>
            </Link>
          </div>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="shadow-sm">
          {error}
        </Alert>
      )}

      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
            <h5 className="fw-bold mb-0">Daftar Pendaftar</h5>

            <div className="d-flex flex-wrap gap-3 mt-3 mt-md-0">
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Cari..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ps-4"
                />
              </div>

              <div className="position-relative">
                <Form.Select
                  value={filterJurusan}
                  onChange={(e) => setFilterJurusan(e.target.value)}
                  className="ps-4"
                >
                  {jurusanOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center p-5">
              <FaSpinner className="text-primary fa-spin mb-3" size={30} />
              <p className="text-secondary">Memuat data pendaftar...</p>
            </div>
          ) : pendaftarList.length === 0 ? (
            <div className="text-center p-5">
              <FaInbox className="text-secondary mb-3" size={40} />
              <h6 className="fw-bold mb-2">Belum Ada Data</h6>
              <p className="text-secondary mb-4">
                Belum ada data pendaftar saat ini.
              </p>
              <Link to="/tambah">
                <Button
                  variant="primary"
                  className="d-flex align-items-center gap-2 mx-auto"
                >
                  <FaUserPlus />
                  <span>Tambah Pendaftar Baru</span>
                </Button>
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <PendaftarList
                pendaftarList={filteredPendaftarList}
                onDataChange={fetchPendaftar}
              />
            </div>
          )}

          {!loading && filteredPendaftarList.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3 text-secondary">
              <div>
                <small>
                  Menampilkan {filteredPendaftarList.length} dari{" "}
                  {pendaftarList.length} pendaftar
                </small>
              </div>
              {filterJurusan && (
                <Badge
                  bg="light"
                  text="dark"
                  className="d-flex align-items-center gap-2 p-2"
                >
                  <FaFilter size={10} />
                  <span>
                    Filter:{" "}
                    {
                      jurusanOptions.find((opt) => opt.value === filterJurusan)
                        ?.label
                    }
                  </span>
                </Badge>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
