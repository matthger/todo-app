import * as Tooltip from '@radix-ui/react-tooltip';
import React from 'react';

interface TooltipButtonProps {
    tooltip: string;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}

export const TooltipButton: React.FC<TooltipButtonProps> = ({ tooltip, onClick, children, className }) => (
    <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
            <Tooltip.Trigger asChild>
                <button onClick={onClick} className={`p-1.5 rounded-lg transition ${className}`}>
                    {children}
                </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
                <Tooltip.Content
                    side='top'
                    align='center'
                    className='bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md animate-fade-in'
                >
                    {tooltip}
                    <Tooltip.Arrow className='fill-gray-800' />
                </Tooltip.Content>
            </Tooltip.Portal>
        </Tooltip.Root>
    </Tooltip.Provider>
);
