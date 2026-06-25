import React, { useState } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import useClickOutside from '../../hooks/useOutsideClick';
import { useTheme } from '../../contexts/ThemeContext';
import Button from './Button';

const ThemeToggleDropdown: React.FC = () => {

    const { theme, setTheme, mounted } = useTheme();



    if (!mounted) {
        // if (true) {
        return <div className="flex items-center gap-1 p-1 border-t border-border rounded-full bg-linear-to-b from-background/30 to-background backdrop-blur-3xl">

            <div className="size-8 min-w-8 rounded-full bg-muted animate-pulse" />
            <div className="size-8 min-w-8 rounded-full bg-muted animate-pulse" />
            <div className="size-8 min-w-8 rounded-full bg-muted animate-pulse" />
            {/* <div className="size-4 min-w-4 rounded-full bg-muted animate-pulse" /> */}


        </div>;
    }



    return (
        <div className="relative">
            <div className="p-1 rounded-full border-t border-border bg-linear-to-b from-background/30 to-background backdrop-blur-3xl flex-row-center gap-x-1">
                <Button
                    onClick={() => {
                        setTheme('light');
                    }}
                    size='icon-sm'
                    variant={theme === 'light' ? 'primary' : 'ghost'}
                    className={` ${theme === 'light'
                        ? 'to-primary/20 dark:to-primary/50'
                        : ''
                        }`}
                >
                    <Sun className="w-4 h-4" />
                </Button>

                <Button
                    onClick={() => {
                        setTheme('dark');
                    }}
                    size='icon-sm'
                    variant={theme === 'dark' ? 'primary' : 'ghost'}
                    className={` ${theme === 'dark'
                        ? 'to-primary/20 dark:to-primary/50'
                        : ''
                        }`}
                >
                    <Moon className="w-4 h-4" />

                </Button>

                <Button
                    onClick={() => {
                        setTheme('system');
                    }}
                    size='icon-sm'
                    variant={theme === 'system' ? 'primary' : 'ghost'}
                    className={` ${theme === 'system'
                        ? 'to-primary/20 dark:to-primary/50'
                        : ''
                        }`}
                >
                    <Monitor className="w-4 h-4" />

                </Button>
            </div>

            {/* {isOpen && (

                <div className="absolute right-0 mt-2 bg-background rounded-lg shadow-lg border border-muted overflow-hidden z-20">
                    <button
                        onClick={() => {
                            setTheme('light');
                            setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${theme === 'light'
                            ? 'bg-primary/20 text-primary'
                            : 'text-foreground hover:bg-muted'
                            }`}
                    >
                        <Sun className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => {
                            setTheme('dark');
                            setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${theme === 'dark'
                            ? 'bg-primary/20 text-primary'
                            : 'text-foreground hover:bg-muted'
                            }`}
                    >
                        <Moon className="w-4 h-4" />

                    </button>

                    <button
                        onClick={() => {
                            setTheme('system');
                            setIsOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${theme === 'system'
                            ? 'bg-primary/20 text-primary'
                            : 'text-foreground hover:bg-muted'
                            }`}
                    >
                        <Monitor className="w-4 h-4" />

                    </button>
                </div>

            )} */}
        </div>
    );
};

export default ThemeToggleDropdown;