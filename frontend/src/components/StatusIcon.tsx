import { Hourglass, Circle, CheckCircle2 } from 'lucide-react';

import { TooltipButton } from './TooltipButton';
import { ToDo } from '../interfaces/todo.interface';

interface StatusIconProps {
    status: ToDo['status'];
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
    const statusInfo = {
        open: { icon: <Circle className="text-gray-400" />, label: 'Offen' },
        in_progress: { icon: <Hourglass className="text-sky-600" />, label: 'In Bearbeitung' },
        done: { icon: <CheckCircle2 className="text-green-500" />, label: 'Erledigt' },
    };

    const currentStatus = statusInfo[status as keyof typeof statusInfo] ?? {
        icon: <Circle className="text-gray-300" />,
        label: 'Unbekannt',
    };

    return <TooltipButton tooltip={currentStatus.label} onClick={() => {}}>{currentStatus.icon}</TooltipButton>;
};
