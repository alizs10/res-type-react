import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { useGenerator } from "../../contexts/GeneratorContext";
import { Typography } from "../common/Typography";
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../common/Button';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Result() {
    const { result, copyResult } = useGenerator();
    const { resolvedTheme } = useTheme();

    const showOptions = useMemo(() => {
        return result.length > 0;
    }, [result]);

    const [isCopying, setIsCopying] = useState(false);
    const [copied, setCopied] = useState(false);
    const [displayLines, setDisplayLines] = useState<string[]>([]);

    async function copy() {
        if (isCopying) return;
        setIsCopying(true);

        try {
            const result = await copyResult();
            if (!result) {
                console.log("copy response: show error toast");
                return;
            }
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        } catch (error) {
            console.log(error);
        } finally {
            setIsCopying(false);
        }
    }

    // Reset and animate when result changes
    useEffect(() => {
        if (!result) {
            setDisplayLines([]);
            return;
        }

        const lines = result.split('\n');
        setDisplayLines([]); // Reset display

        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex++;
            setDisplayLines(lines.slice(0, currentIndex));

            if (currentIndex >= lines.length) {
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [result]); // Only depends on result, not currentLineIndex

    return (
        <div className="flex flex-col gap-y-2 h-full max-h-full">
            <label htmlFor="">
                <Typography variant='label'>
                    Typescript Types
                </Typography>
            </label>
            <div className="relative flex-1 min-h-0 z-0">
                <div
                    className='absolute inset-0 -z-10 rounded-3xl border-t border-secondary-foreground/30 bg-linear-to-b from-background to-secondary/30 backdrop-blur-3xl placeholder:text-muted-foreground text-foreground
                        text-base
                        h-full
                        '
                />

                <div className="h-full w-full overflow-y-scroll scrollbar-none text-xs md:text-base">
                    <SyntaxHighlighter
                        language="typescript"
                        style={resolvedTheme === 'dark' ? atomOneDark : atomOneLight}
                        customStyle={{
                            background: "transparent",
                            fontSize: 'inherit',
                            padding: 16,
                            paddingBottom: 64
                        }}
                        showLineNumbers
                    >
                        {displayLines.join('\n')}
                    </SyntaxHighlighter>
                </div>

                <AnimatePresence>
                    {showOptions && (
                        <motion.div
                            initial={{ y: 80 }}
                            animate={{ y: 0 }}
                            exit={{ y: 80 }}
                            transition={{
                                ease: "linear",
                                duration: .2
                            }}
                            className="absolute inset-4 top-auto flex-center justify-end">
                            <Button
                                onClick={copy}
                                disabled={isCopying}
                                className="overflow-clip"
                                size="icon"
                                variant="success">
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            key={'copy-check'}
                                            initial={{ y: -25 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 25 }}
                                            transition={{
                                                ease: "linear",
                                                duration: .1
                                            }}
                                        >
                                            <CopyCheckIcon className="size-4 text-success" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key={'copy'}
                                            initial={{ y: -25 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 25 }}
                                            transition={{
                                                ease: "linear",
                                                duration: .1
                                            }}
                                        >
                                            <CopyIcon className={`size-4`} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}