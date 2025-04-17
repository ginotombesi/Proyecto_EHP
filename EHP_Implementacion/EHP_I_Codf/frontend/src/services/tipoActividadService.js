import axios from 'axios'

const URL = 'http://localhost:3000/tipoActividad';

export async function crearTipoActividad(tipoActividad) {
    return await axios.post(URL, tipoActividad);
}

export async function getActividades() {
    const response = await axios.get(URL);
    return response.data;
}

export async function getActividad(id) {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
}

export async function actualizarTipoActividad(id, tipoActividad) {
    return await axios.put(`${URL}/${id}`, tipoActividad);
}

export async function borrarTipoActividad(id) {
    return await axios.delete(`${URL}/${id}`);
}