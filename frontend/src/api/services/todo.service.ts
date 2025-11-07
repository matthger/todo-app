import { AxiosResponse } from 'axios';

import axiosClient from '../axios.client';
import { ToDo } from '../../interfaces/todo.interface';

export class TodoService {
    private endpoint = 'todos/';

    async getAll(): Promise<ToDo[]> {
        const res: AxiosResponse<ToDo[]> = await axiosClient.get(this.endpoint);
        return res.data;
    }

    async get(id: number): Promise<ToDo> {
        const res: AxiosResponse<ToDo> = await axiosClient.get(`${this.endpoint}${id}/`);
        return res.data;
    }

    async create(todo: Partial<ToDo>): Promise<ToDo> {
        const res: AxiosResponse<ToDo> = await axiosClient.post(this.endpoint, todo);
        return res.data;
    }

    async update(id: number, todo: Partial<ToDo>): Promise<ToDo> {
        const res: AxiosResponse<ToDo> = await axiosClient.put(`${this.endpoint}${id}/`, todo);
        return res.data;
    }

    async remove(id: number): Promise<void> {
        await axiosClient.delete(`${this.endpoint}${id}/`);
    }
}

export const todoService = new TodoService();
