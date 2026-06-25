import { useTheme } from "../../contexts/ThemeContext"

export default function Logo() {

    const { resolvedTheme: theme, mounted } = useTheme()

    const logoUrl = theme === 'dark' ? '/logo-dark.png' : "/logo-light.png"


    if (!mounted) {
        // if (true) {
        return (<div className="bg-muted dark:bg-background rounded-xl animate-pulse size-7 md:size-9" />)
    }


    return (
        <img className='w-7 md:w-9 h-auto' height={128} width={128} src={logoUrl} />
    )
}
