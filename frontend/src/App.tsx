import { AnimatePresence } from 'framer-motion';
import { ClipboardList, Inbox, Plus, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { todoService } from './api/services/todo.service';
import { ToDoCard } from './components/ToDoCard';
import { ToDoAlert } from './components/ToDoAlert';
import { ToDoControls } from './components/ToDoControls';
import { ToDoMessage } from './components/ToDoMessage';
import { ToDo } from './interfaces/todo.interface';

function App() {
    const [todos, setTodos] = useState<ToDo[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAdd, setShowAdd] = useState(false);
    const [editTodo, setEditTodo] = useState<ToDo | null>(null);
    const [filterStatus, setFilterStatus] = useState<ToDo['status'] | 'all'>('all');
    const [sortBy, setSortBy] = useState<'title' | 'status'>('title');
    const [searchQuery, setSearchQuery] = useState('');

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

    const handleAddTodo = async (todo: { title: string; description?: string; status: ToDo['status'] }) => {
        try {
            const newTodo = await todoService.create(todo);
            setTodos([newTodo, ...todos]);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Fehler beim Hinzufügen des To-Dos.');
        }
    };

    const handleEditTodo = async (updated: { title: string; description?: string; status: ToDo['status'] }) => {
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

    const filteredTodos = todos
        .filter(todo =>
            (filterStatus === 'all' || todo.status === filterStatus) &&
            todo.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => sortBy === 'title' ? a.title.localeCompare(b.title) : a.status.localeCompare(b.status));

    return (
        <div className="min-h-screen bg-blue-50 p-6">
            <div className='max-w-xl mx-auto'>
                <div className='flex items-center justify-between mb-4'>
                    <h1 className='flex items-center text-2xl font-bold gap-2'>
                        <ClipboardList className='w-6 h-6 text-sky-600' />
                        To-Do Liste
                    </h1>
                    <button
                        onClick={() => setShowAdd(true)}
                        className='
                            w-10 h-10 flex items-center justify-center
                            bg-green-500 text-white rounded-full
                            hover:scale-110
                            transition duration-300 ease-out
                            shadow-md hover:shadow-lg
                            cursor-pointer
                        '
                    >
                        <Plus className='w-5 h-5' />
                    </button>
                </div>

                <ToDoControls
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {loading && <p>Lade...</p>}
                {error && !loading && (
                    <ToDoMessage
                        icon={<AlertCircle className='w-5 h-5 text-red-700' />}
                        text={error}
                        type='error'
                    />
                )}
                {filteredTodos.length === 0 && !loading && !error && (
                    <ToDoMessage
                        icon={<Inbox className='w-5 h-5 text-gray-400' />}
                        text={searchQuery || filterStatus !== 'all'
                            ? 'Keine To-Dos entsprechen der Suche/Filter.'
                            : 'Keine To-Dos vorhanden. Füge welche hinzu, um zu beginnen!'
                        }
                    />
                )}

                <div className='flex flex-col gap-1'>
                    <AnimatePresence>
                        {filteredTodos.map((todo) => (
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
        </div>
    );
}

export default App;
