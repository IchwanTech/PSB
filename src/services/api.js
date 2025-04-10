import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Konfigurasi axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Mendapatkan semua data pendaftar
export const getAllPendaftar = async () => {
  try {
    const response = await api.get("/pendaftar");
    return response.data;
  } catch (error) {
    console.error("Error fetching pendaftar:", error);
    throw error;
  }
};

// Mendapatkan data pendaftar berdasarkan ID
export const getPendaftarById = async (id) => {
  try {
    const response = await api.get(`/pendaftar/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pendaftar with id ${id}:`, error);
    throw error;
  }
};

// Menambahkan pendaftar baru
export const createPendaftar = async (pendaftarData) => {
  try {
    const response = await api.post("/pendaftar", pendaftarData);
    return response.data;
  } catch (error) {
    console.error("Error creating pendaftar:", error);
    throw error;
  }
};

// Mengupdate data pendaftar
export const updatePendaftar = async (id, pendaftarData) => {
  try {
    const response = await api.put(`/pendaftar/${id}`, pendaftarData);
    return response.data;
  } catch (error) {
    console.error(`Error updating pendaftar with id ${id}:`, error);
    throw error;
  }
};

// Menghapus data pendaftar
export const deletePendaftar = async (id) => {
  try {
    const response = await api.delete(`/pendaftar/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting pendaftar with id ${id}:`, error);
    throw error;
  }
};
