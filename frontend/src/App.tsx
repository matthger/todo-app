import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

import { todoService } from './api/services/todo.service';
import { TodoCard } from './components/TodoCard';
import { Todo } from './interfaces/todo.interface';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setLoading(true);
                const data = await todoService.getAll();
                setTodos(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load todos');
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const handleAdd = async () => {
        if (!title.trim()) return;
        const newTodo = await todoService.create({ title, status: 'open' });
        setTodos([newTodo, ...todos]);
        setTitle('');
    };

    const handleDelete = async (id: number) => {
        try {
            await todoService.remove(id);
            setTodos(todos.filter((t) => t.id !== id));
        } catch (err) {
            console.error(err);
            setError('Failed to delete todo');
        }
    };

    return (
        <div className='max-w-xl mx-auto p-6'>
            <h1 className='text-2xl font-bold mb-4'>To-Do Liste</h1>

            <div className='flex gap-2 mb-6'>
                <input
                    className='border rounded p-2 flex-1'
                    placeholder='Neues To-Do...'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={handleAdd}
                    className='bg-blue-500 text-white px-4 rounded hover:bg-blue-600'
                >
                    Hinzufügen
                </button>
            </div>

            {loading && <p>Lade...</p>}
            {error && <p className='text-red-500'>{error}</p>}

            <div className='flex flex-col gap-3'>
                <AnimatePresence>
                    {todos.map(todo => (
                        <TodoCard
                            key={todo.id}
                            todo={todo}
                            onEdit={() => {}}
                            onDelete={() => handleDelete(todo.id!)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
