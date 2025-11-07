import { AxiosResponse } from 'axios';

import axiosClient from '../axios.client';
import { Todo } from '../../interfaces/todo.interface';

export class TodoService {
    private endpoint = 'todos/';

    async getAll(): Promise<Todo[]> {
        const res: AxiosResponse<Todo[]> = await axiosClient.get(this.endpoint);
        return res.data;
    }

    async get(id: number): Promise<Todo> {
        const res: AxiosResponse<Todo> = await axiosClient.get(`${this.endpoint}${id}/`);
        return res.data;
    }

    async create(todo: Partial<Todo>): Promise<Todo> {
        const res: AxiosResponse<Todo> = await axiosClient.post(this.endpoint, todo);
        return res.data;
    }

    async update(id: number, todo: Partial<Todo>): Promise<Todo> {
        const res: AxiosResponse<Todo> = await axiosClient.put(`${this.endpoint}${id}/`, todo);
        return res.data;
    }

    async remove(id: number): Promise<void> {
        await axiosClient.delete(`${this.endpoint}${id}/`);
    }
}

export const todoService = new TodoService();
