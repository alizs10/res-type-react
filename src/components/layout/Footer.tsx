import { Typography } from '../common/Typography'

const app_name = import.meta.env.VITE_APP_NAME ?? "ResType"

export default function Footer() {
    return (
        <footer className='h-10 md:h-14 flex-center max-w-7xl mx-auto'>
            <Typography variant="body-sm">
                © {new Date().getFullYear()} {app_name}. Built for developers.
            </Typography>
        </footer>
    )
}
