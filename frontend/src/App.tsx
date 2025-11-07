import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { todoService } from './api/services/todo.service';
import { ToDoCard } from './components/ToDoCard';
import { Todo } from './interfaces/todo.interface';
import { ToDoAlert } from './components/ToDoAlert';

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAdd, setShowAdd] = useState(false);
    const [editTodo, setEditTodo] = useState<Todo | null>(null);

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

    const handleAddTodo = async (todo: { title: string; description?: string; status: Todo['status'] }) => {
        try {
            const newTodo = await todoService.create(todo);
            setTodos([newTodo, ...todos]);
        } catch (err) {
            console.error(err);
            setError('Failed to add todo');
        }
    };

    const handleEditTodo = async (updated: { title: string; description?: string; status: Todo['status'] }) => {
        if (!editTodo) return;
        try {
            const newTodo = await todoService.update(editTodo.id!, updated);
            setTodos(todos.map(t => t.id === newTodo.id ? newTodo : t));
        } catch (err) {
            console.error(err);
            setError('Failed to edit todo');
        } finally {
            setEditTodo(null);
        }
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
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">To-Do Liste</h1>
                <button
                    onClick={() => setShowAdd(true)}
                    className="
                        w-10 h-10 flex items-center justify-center
                        bg-green-500 text-white rounded-full
                        hover:scale-110
                        transition duration-300 ease-out
                        shadow-md hover:shadow-lg
                        cursor-pointer
                    "
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            {loading && <p>Lade...</p>}
            {error && <p className='text-red-500'>{error}</p>}

            <div className='flex flex-col gap-1'>
                {todos.length === 0 && !loading && !error && (
                    <div className="p-4 text-center text-gray-700 bg-gray-100 rounded-xl shadow-sm border border-gray-200 animate-fade-in">
                        Keine To-Dos vorhanden. Füge welche hinzu, um zu beginnen!
                    </div>
                )}

                <AnimatePresence>
                    {todos.map((todo) => (
                        <ToDoCard
                            key={todo.id}
                            todo={todo}
                            onEdit={(t) => setEditTodo(t)}
                            onDelete={() => handleDelete(todo.id!)}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {editTodo && (
                <ToDoAlert
                    todo={editTodo}
                    onAddOrEdit={handleEditTodo}
                    onClose={() => setEditTodo(null)}
                />
            )}

            {showAdd && (
                <ToDoAlert
                    onAddOrEdit={handleAddTodo}
                    onClose={() => setShowAdd(false)}
                />
            )}
        </div>
    );
}

export default App;
