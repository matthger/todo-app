import axios from "axios";

const API_URL = "http://localhost:8000/api/todos/";

export interface Todo {
    id?: number;
    title: string;
    description?: string;
    status: string;
}

export const getTodos = async () => (await axios.get(API_URL)).data;
export const createTodo = async (todo: Todo) => (await axios.post(API_URL, todo)).data;
export const updateTodo = async (id: number, todo: Todo) => (await axios.put(`${API_URL}${id}/`, todo)).data;
export const deleteTodo = async (id: number) => await axios.delete(`${API_URL}${id}/`);
