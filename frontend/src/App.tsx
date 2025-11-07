import { AnimatePresence } from 'framer-motion';
import { Inbox, Plus } from 'lucide-react';
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
                setError(null);
            } catch (err) {
                console.error(err);
                setError('Fehler beim Laden der To-Dos.');
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
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Fehler beim Hinzufügen des To-Dos.');
        }
    };

    const handleEditTodo = async (updated: { title: string; description?: string; status: Todo['status'] }) => {
        if (!editTodo) return;
        try {
            const newTodo = await todoService.update(editTodo.id!, updated);
            setTodos(todos.map(t => t.id === newTodo.id ? newTodo : t));
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Fehler beim Bearbeiten des To-Dos.');
        } finally {
            setEditTodo(null);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await todoService.remove(id);
            setTodos(todos.filter((t) => t.id !== id));
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Fehler beim Löschen des To-Dos.');
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
            {error && !loading && (
                <div className="flex items-center gap-2 p-4 mb-4 text-red-700 bg-red-50 border border-red-300 rounded-xl shadow animate-fade-in">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
                    </svg>
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            <div className='flex flex-col gap-1'>
                {todos.length === 0 && !loading && !error && (
                    <div className="flex items-center gap-2 p-4 mb-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl shadow animate-fade-in">
                        <Inbox className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <span className="text-sm font-medium">
                          Keine To-Dos vorhanden. Füge welche hinzu, um zu beginnen!
                        </span>
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
