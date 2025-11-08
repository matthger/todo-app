import { motion } from 'framer-motion';
import { Edit, Trash2 } from 'lucide-react';

import { ToDo } from '../interfaces/todo.interface';
import { TooltipButton } from './TooltipButton';
import { StatusIcon } from './StatusIcon';

interface ToDoCardProps {
    todo: ToDo;
    onEdit?: (todo: ToDo) => void;
    onDelete?: (id: number) => void;
}

export const ToDoCard: React.FC<ToDoCardProps> = ({ todo, onEdit, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            layout
            className='
                flex items-center justify-between
                p-5 mb-3
                bg-gradient-to-br from-white to-gray-50
                rounded-2xl border border-gray-200
                shadow-sm hover:shadow-md
                transition-all duration-200 ease-in-out
                hover:-translate-y-0.5
            '
        >
            <div className='flex items-center gap-4'>
                <StatusIcon status={todo.status} />
                <div>
                    <h2 className='font-semibold text-gray-900 text-base leading-tight'>{todo.title}</h2>
                    {todo.description && (
                        <p className='text-sm text-gray-500 mt-1 leading-snug'>{todo.description}</p>
                    )}
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <TooltipButton tooltip='Bearbeiten' onClick={() => onEdit?.(todo)} className='hover:bg-sky-50 cursor-pointer'>
                    <Edit className='w-5 h-5 text-sky-600' />
                </TooltipButton>
                <TooltipButton tooltip='Löschen' onClick={() => onDelete?.(todo.id!)} className='hover:bg-red-50 cursor-pointer'>
                    <Trash2 className='w-5 h-5 text-red-500' />
                </TooltipButton>
            </div>
        </motion.div>
    );
};
