import axios from 'axios'

const URL = 'http://localhost:3000/actividad';

export async function getActividades() {
    const response = await axios.get(URL);
    return response.data;
}
  // Por si agregan las func que comentaron
  
// export async function nuevaActividad(actividad) {
//     return await axios.post(URL, actividad);
// }

// export async function borrarActividad(id) {
//     return await axios.delete(`${URL}/${id}`);
// }