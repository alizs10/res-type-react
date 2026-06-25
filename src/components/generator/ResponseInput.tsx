import { AlignLeftIcon, CopyCheckIcon, CopyIcon, TrashIcon } from "lucide-react";
import { useGenerator } from "../../contexts/GeneratorContext";
import Button from "../common/Button";
import { Typography } from "../common/Typography";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ResponseInput() {

    const { responseInput, setResponseInput, clearResponse, formatResponse, copyResponse } = useGenerator()

    const showOptions = useMemo(() => {
        return responseInput.length > 0
    }, [responseInput])

    const [isCopying, setIsCopying] = useState(false)
    const [copied, setCopied] = useState(false)


    async function copy() {
        if (isCopying) return

        setIsCopying(true)

        try {
            const result = await copyResponse()

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
        <div className="flex flex-col gap-y-2 flex-1 min-h-0">
            <label htmlFor="">
                <Typography variant='label'>
                    Api Response
                </Typography>
            </label>
            <div className="flex relative overflow-clip flex-1 min-h-0">
                <textarea
                    className='w-full rounded-3xl border-t border-secondary-foreground/30 p-4 bg-linear-to-b from-background to-secondary/30 backdrop-blur-3xl placeholder:text-muted-foreground text-foreground
                    text-xs       
                    md:text-base
                           focus:outline-0
                           focus:ring-0
                           resize-none
                           pb-16
                         
                           flex-1
                           min-h-0
                           scrollbar-none
                           '
                    value={responseInput}
                    onChange={e => setResponseInput(e.target.value)}
                    placeholder='Your api response'

                />

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
                            className="absolute inset-4 top-auto flex-center-between">
                            <div className="flex-row-center gap-x-2">

                                <Button
                                    onClick={formatResponse}
                                    size="sm" variant="primary">
                                    <AlignLeftIcon className="size-4" />
                                    <Typography variant="body-sm">Format</Typography>
                                </Button>
                                <Button
                                    onClick={clearResponse}
                                    size="icon" variant="destructive">
                                    <TrashIcon className="size-4" />
                                </Button>

                            </div>

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
