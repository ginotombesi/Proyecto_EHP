import axios from 'axios'

const URL = 'http://localhost:3000/inscripcion';

export async function crearInscripcion(inscripcion) {
    return await axios.post(URL, inscripcion);
}

export async function getInscripciones() {
    const response = await axios.get(URL);
    return response.data;
}

export async function getInscripcion(id) {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
}

export async function modificarInscripcion(id, inscripcion) {
    return await axios.put(`${URL}/${id}`, inscripcion);
}

export async function borrarInscripcion(id) {
    return await axios.delete(`${URL}/${id}`);
}