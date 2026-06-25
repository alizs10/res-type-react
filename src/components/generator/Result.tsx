import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { useGenerator } from "../../contexts/GeneratorContext";
import { Typography } from "../common/Typography";
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../common/Button';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function Result() {

    const { result, copyResult } = useGenerator()
    const { resolvedTheme } = useTheme();

    const showOptions = useMemo(() => {
        return result.length > 0
    }, [result])

    const [isCopying, setIsCopying] = useState(false)
    const [copied, setCopied] = useState(false)


    async function copy() {
        if (isCopying) return

        setIsCopying(true)

        try {
            const result = await copyResult()

            if (!result) {
                console.log("copy response: show error toast")
                return
            }

            setCopied(true)
            setTimeout(() => {
                setCopied(false)
            }, 3000)

        } catch (error) {
            console.log(error)
        } finally {
            setIsCopying(false)
        }
    }


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



                <div className="h-full w-full overflow-y-scroll text-xs md:text-base">
                    <SyntaxHighlighter
                        language="typescript"
                        style={resolvedTheme === 'dark' ? atomOneDark : atomOneLight}
                        customStyle={{
                            background: "transparent",
                            // borderRadius: "1rem",
                            // margin: 0,
                            fontSize: 'inherit',
                            padding: 16
                        }}

                        showLineNumbers
                    >
                        {result}
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
                                size="icon" variant="success">
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
                                            <CopyCheckIcon

                                                className="size-4 text-success" />
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
    )
}
