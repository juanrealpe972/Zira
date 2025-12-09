import axios from 'axios';

// Define el tipo de datos que esperas del backend
export interface Task {
  id: number;
  nombre: string;
  title: string
  descripcion: string;
  // Agrega más campos si tu modelo Django tiene otros
}

const API_URL = 'http://127.0.0.1:8000/tasks/api/v1/tasks/';

export async function getTasks(): Promise<Task[]> {
  try {
    const response = await axios.get<Task[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener tareas:', error);
    return [];
  }
}
