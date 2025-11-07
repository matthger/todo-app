import { useState } from 'react';

import { ToDo } from '../interfaces/todo.interface';

interface ToDoAlertProps {
    onAddOrEdit: (todo: { title: string; description?: string; status: ToDo['status'] }) => void;
    onClose: () => void;
    todo?: ToDo;
}

export const ToDoAlert: React.FC<ToDoAlertProps> = ({ onAddOrEdit, onClose, todo }) => {
    const [title, setTitle] = useState(todo?.title || '');
    const [description, setDescription] = useState(todo?.description || '');
    const [status, setStatus] = useState<ToDo['status']>(todo?.status || 'open');

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAddOrEdit({ title, description, status });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-2xl p-6 w-150 mx-2 shadow-lg animate-fade-in">
                <h2 className="text-lg font-semibold mb-4">
                    {todo ? 'To-Do bearbeiten' : 'Neues To-Do hinzufügen'}
                </h2>

                <input
                    className="
                        w-full p-3 mb-3 rounded-xl
                        border border-gray-300 bg-gray-50
                        placeholder-gray-400 text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400
                        transition-all duration-300 ease-in-out
                      "
                    placeholder="Titel"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="
                        w-full p-3 mb-3 rounded-xl
                        border border-gray-300 bg-gray-50
                        placeholder-gray-400 text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400
                        transition-all duration-300 ease-in-out
                      "
                    placeholder="Beschreibung (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <select
                    className="
                        w-full p-3 mb-4 rounded-xl
                        border border-gray-300 bg-gray-50 text-gray-900
                        focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400
                        transition-all duration-300 ease-in-out
                      "
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ToDo['status'])}
                >
                    <option value="open">Offen</option>
                    <option value="in_progress">In Bearbeitung</option>
                    <option value="done">Erledigt</option>
                </select>


                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 rounded transition bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        onClick={onClose}
                    >
                        Abbrechen
                    </button>
                    <button
                        className={`
                            px-4 py-2 rounded transition 
                            bg-blue-500 text-white 
                            ${!title.trim() ? 'opacity-50 cursor-default' : 'hover:bg-blue-600 cursor-pointer'}
                          `}
                        onClick={handleSubmit}
                        disabled={!title.trim()}
                    >
                        {todo ? 'Speichern' : 'Hinzufügen'}
                    </button>
                </div>
            </div>
        </div>
    );
};
