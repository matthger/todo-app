import * as Tooltip from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { Edit, Trash2, Circle, Loader2, CheckCircle2 } from 'lucide-react';

import { Todo } from '../interfaces/todo.interface';

interface TodoCardProps {
    todo: Todo;
    onEdit?: (todo: Todo) => void;
    onDelete?: (id: number) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
    const statusInfo = {
        open: { icon: <Circle className='text-gray-400' />, label: 'Offen' },
        in_progress: {
            icon: <Loader2 className='text-blue-500 animate-spin-slow' />,
            label: 'In Bearbeitung'
        },
        done: { icon: <CheckCircle2 className='text-green-500' />, label: 'Erledigt' }
    };

    const currentStatus = statusInfo[todo.status as keyof typeof statusInfo] ?? {
        icon: <Circle className='text-gray-300' />,
        label: 'Unbekannt'
    };

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
                <Tooltip.Provider delayDuration={100}>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <div className='mt-1 cursor-default'>{currentStatus.icon}</div>
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                            <Tooltip.Content
                                side='top'
                                align='center'
                                className='bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md animate-fade-in'
                            >
                                {currentStatus.label}
                                <Tooltip.Arrow className='fill-gray-800' />
                            </Tooltip.Content>
                        </Tooltip.Portal>
                    </Tooltip.Root>
                </Tooltip.Provider>
                <div>
                    <h2 className='font-semibold text-gray-900 text-base leading-tight'>
                        {todo.title}
                    </h2>
                    {todo.description && (
                        <p className='text-sm text-gray-500 mt-1 leading-snug'>
                            {todo.description}
                        </p>
                    )}
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <button
                    onClick={() => onEdit?.(todo)}
                    className='p-1.5 rounded-lg hover:bg-blue-50 transition cursor-pointer'
                >
                    <Edit className='w-5 h-5 text-blue-500' />
                </button>
                <button
                    onClick={() => onDelete?.(todo.id!)}
                    className='p-1.5 rounded-lg hover:bg-red-50 transition cursor-pointer'
                >
                    <Trash2 className='w-5 h-5 text-red-500' />
                </button>
            </div>
        </motion.div>
    );
};
