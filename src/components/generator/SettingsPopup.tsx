import { useState } from 'react'
import { Typography } from '../common/Typography';
import { SettingsIcon } from 'lucide-react';
import useClickOutside from '../../hooks/useOutsideClick';
import Button from '../common/Button';
import { useGenerator } from '../../contexts/GeneratorContext';
// import { init_settings } from '../../contexts/GeneratorContext';


// const dropdownItems = [
//     ...init_settings
// ]

export default function SettingsPopup() {

    const { userSettings, updateSettings } = useGenerator()

    const [open, setOpen] = useState(false)

    // const router = useRouter()

    function toggle() {
        setOpen(prev => !prev)
    }

    const containerRef = useClickOutside<HTMLUListElement>(() => setOpen(false))

    function closeDropdownWrapper(cb: () => void) {

        setOpen(false)
        cb()

    }


    return (
        <div ref={containerRef} className="relative z-20">
            <Button onClick={toggle} variant='primary' size='md'
                className={`${open ? 'to-primary/20 dark:to-primary/50' : ''}`}
            >

                <SettingsIcon className='size-4' />

                <Typography variant='body-sm'>
                    Settings
                </Typography>

            </Button>

            {open && (
                <ul className='flex flex-col justify-start bg-linear-to-b from-background to-secondary/30 backdrop-blur-3xl border-t border-border absolute top-full right-0 h-fit mt-2 rounded-3xl overflow-clip'>
                    {userSettings.map(item => (
                        <li key={item.id} className='flex-center-between gap-x-4 md:gap-x-8 px-4 py-2'>

                            <label htmlFor="">
                                <Typography className='text-nowrap' variant='body-sm'>
                                    {item.label}
                                </Typography>
                            </label>

                            <div className="flex-row-center gap-x-1 p-1 bg-muted rounded-full">
                                {item.values?.map(val => (
                                    <Button
                                        onClick={() => updateSettings(item.id, val)}
                                        size='sm' variant={`${item.value === val ? 'primary' : 'ghost'}`}
                                        className={`${item.value === val ? 'to-primary/20 dark:to-primary/50' : ''}`}
                                    >
                                        <Typography variant='caption-xs'>
                                            {val}
                                        </Typography>
                                    </Button>
                                ))}
                            </div>

                        </li>
                    ))}


                </ul>
            )}
        </div>
    )
}
