import { ReactNode } from 'react';

interface ToDoMessageProps {
    icon: ReactNode;
    text: string;
    type?: 'error' | 'info';
}

export const ToDoMessage: React.FC<ToDoMessageProps> = ({ icon, text, type = 'info' }) => {
    const colors =
        type === 'error'
            ? 'text-red-700 bg-red-50 border-red-300'
            : 'text-gray-700 bg-gray-50 border-gray-200';

    return (
        <div className={`flex items-center gap-2 p-4 mb-4 ${colors} border rounded-xl shadow animate-fade-in`}>
            {icon}
            <span className='text-sm font-medium'>{text}</span>
        </div>
    );
};
