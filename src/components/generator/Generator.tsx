import { Typography } from '../common/Typography'
import Button from '../common/Button'
import ResponseInput from './ResponseInput'
import Result from './Result'
import { useGenerator } from '../../contexts/GeneratorContext'
import SettingsPopup from './SettingsPopup'

export default function Generator() {


    const { error, generate } = useGenerator()


    return (


        <section className='p-4 md:p-8 flex flex-col gap-x-4 h-full justify-start min-h-full items-start gap-y-4 w-full'>

            <div className="w-full h-fit flex justify-end">
                <SettingsPopup />
            </div>


            <div className="flex-1 min-h-0 w-full flex flex-col md:flex-row gap-4">
                <div className="flex w-full h-full max-h-[calc(50%-0.5rem)] md:max-h-full md:max-w-[calc(50%-1rem)]">
                    <ResponseInput />
                </div>



                <div className="w-full h-full max-h-[calc(50%-0.5rem)] md:max-h-full md:max-w-[calc(50%-1rem)]">
                    <Result />
                </div>

            </div>

            <div className="h-10 md:h-20 w-full flex-center">
                {error && (
                    <Typography variant='body-sm' className='text-destructive'>
                        {error}
                    </Typography>
                )}
            </div>

            <div className="w-full h-fit flex-center">
                <Button
                    onClick={generate}
                    variant='primary' size='md'>
                    <Typography variant='body'>
                        Generate
                    </Typography>
                </Button>
            </div>

        </section>
    )
}
