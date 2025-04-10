import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Row,
  Col,
  Spinner,
  Badge,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  createPendaftar,
  getPendaftarById,
  updatePendaftar,
} from "../services/api";

const FormPendaftar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    nm_pendaftar: "",
    alamat: "",
    jenis_kelamin: "",
    no_hp: "",
    asal_sekolah: "",
    jurusan: "",
    tgl_lahir: "",
    nisn: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const jurusanOptions = [
    "Teknik Komputer dan Jaringan",
    "Rekayasa Perangkat Lunak",
    "Multimedia",
    "Teknik Elektronika Industri",
    "Teknik Kendaraan Ringan",
  ];

  useEffect(() => {
    const fetchPendaftar = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const response = await getPendaftarById(id);
          if (response.data) {
            const formattedData = {
              ...response.data,
              tgl_lahir: response.data.tgl_lahir
                ? response.data.tgl_lahir.substring(0, 10)
                : "",
            };
            setFormData(formattedData);
          }
        } catch (err) {
          setError("Gagal memuat data pendaftar. Silakan coba lagi.");
          console.error("Error fetching pendaftar:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPendaftar();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditMode) {
        await updatePendaftar(id, formData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data pendaftar berhasil diperbarui.",
          confirmButtonColor: "#0d6efd",
          background: "#fff",
          confirmButtonText: "Lanjutkan",
        });
      } else {
        await createPendaftar(formData);
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Pendaftar baru berhasil ditambahkan.",
          confirmButtonColor: "#0d6efd",
          background: "#fff",
          confirmButtonText: "Lanjutkan",
        });
      }

      navigate("/");
    } catch (err) {
      setError("Gagal menyimpan data. Silakan coba lagi.");
      console.error("Error saving pendaftar:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Memuat data pendaftar...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Header className="bg-primary bg-gradient text-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  {isEditMode
                    ? "Edit Data Pendaftar"
                    : "Formulir Pendaftaran Baru"}
                </h4>
                <Badge
                  bg={isEditMode ? "warning" : "info"}
                  className="py-2 px-3"
                >
                  {isEditMode ? "Mode Edit" : "Mode Tambah"}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert
                  variant="danger"
                  className="mb-4 d-flex align-items-center"
                >
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Nama Pendaftar
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-person-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="nm_pendaftar"
                          value={formData.nm_pendaftar}
                          onChange={handleChange}
                          placeholder="Masukkan nama lengkap"
                          required
                          className="border-start-0"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">NISN</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-card-heading"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="nisn"
                          value={formData.nisn}
                          onChange={handleChange}
                          placeholder="Masukkan NISN"
                          required
                          className="border-start-0"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Alamat</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-geo-alt-fill"></i>
                    </InputGroup.Text>
                    <Form.Control
                      as="textarea"
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      rows={2}
                      placeholder="Masukkan alamat lengkap"
                      required
                      className="border-start-0"
                    />
                  </InputGroup>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Jenis Kelamin
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-gender-ambiguous"></i>
                        </InputGroup.Text>
                        <Form.Select
                          name="jenis_kelamin"
                          value={formData.jenis_kelamin}
                          onChange={handleChange}
                          required
                          className="border-start-0"
                        >
                          <option value="">Pilih Jenis Kelamin</option>
                          <option value="Laki-laki">Laki-laki</option>
                          <option value="Perempuan">Perempuan</option>
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Tanggal Lahir
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-calendar-date"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="date"
                          name="tgl_lahir"
                          value={formData.tgl_lahir}
                          onChange={handleChange}
                          required
                          className="border-start-0"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">Nomor HP</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-phone-fill"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="no_hp"
                          value={formData.no_hp}
                          onChange={handleChange}
                          placeholder="Masukkan nomor HP aktif"
                          required
                          className="border-start-0"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold">
                        Asal Sekolah
                      </Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <i className="bi bi-building"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="text"
                          name="asal_sekolah"
                          value={formData.asal_sekolah}
                          onChange={handleChange}
                          placeholder="Masukkan asal sekolah"
                          required
                          className="border-start-0"
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Jurusan</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <i className="bi bi-book-fill"></i>
                    </InputGroup.Text>
                    <Form.Select
                      name="jurusan"
                      value={formData.jurusan}
                      onChange={handleChange}
                      required
                      className="border-start-0"
                    >
                      <option value="">Pilih Jurusan</option>
                      {jurusanOptions.map((jurusan, index) => (
                        <option key={index} value={jurusan}>
                          {jurusan}
                        </option>
                      ))}
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <Button
                    variant="outline-secondary"
                    onClick={() => navigate("/")}
                    className="px-4"
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Kembali
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                    className="px-4"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check2-circle me-2"></i>
                        {isEditMode ? "Perbarui Data" : "Simpan Data"}
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FormPendaftar;
