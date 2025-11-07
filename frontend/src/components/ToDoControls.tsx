import { ToDo } from '../interfaces/todo.interface';

interface ToDoControlsProps {
    searchQuery: string;
    setSearchQuery: (v: string) => void;
    filterStatus: ToDo['status'] | 'all';
    setFilterStatus: (v: ToDo['status'] | 'all') => void;
    sortBy: 'title' | 'status';
    setSortBy: (v: 'title' | 'status') => void;
}

export const ToDoControls: React.FC<ToDoControlsProps> = ({
                                                              searchQuery,
                                                              setSearchQuery,
                                                              filterStatus,
                                                              setFilterStatus,
                                                              sortBy,
                                                              setSortBy,
                                                          }) => {
    return (
        <div className='flex flex-col md:flex-row gap-2 mb-6'>
            <input
                type='text'
                placeholder='Suche...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='
                    flex-1 p-3 rounded-xl border border-gray-300 bg-gray-50
                    placeholder-gray-400 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400
                    transition-all duration-300 ease-in-out
                '
            />

            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as ToDo['status'] | 'all')}
                className='
                    p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400
                    transition-all duration-300 ease-in-out
                '
            >
                <option value='all'>Alle</option>
                <option value='open'>Offen</option>
                <option value='in_progress'>In Bearbeitung</option>
                <option value='done'>Erledigt</option>
            </select>

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'title' | 'status')}
                className='
                    p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400
                    transition-all duration-300 ease-in-out
                '
            >
                <option value='title'>Nach Titel</option>
                <option value='status'>Nach Status</option>
            </select>
        </div>
    );
};
