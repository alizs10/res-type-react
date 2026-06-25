import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>

            {/* header */}

            <Header />

            <main className="h-[calc(100dvh-6.5rem)] max-h-[calc(100dvh-6.5rem)] md:h-[calc(100dvh-9rem)] md:max-h-[calc(100dvh-9rem)] max-w-7xl mx-auto">
                {children}
            </main>


            {/* footer */}
            <Footer />
        </>
    )
}
