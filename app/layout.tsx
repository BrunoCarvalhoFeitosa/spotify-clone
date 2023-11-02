import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import SupabaseProvider from "@/providers/SupabaseProvider"
import ToastProvider from "@/providers/ToastProvider"
import getSongsByUserId from "@/actions/getSongsByUserId"
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices"
import UserProvider from "@/providers/UserProvider"
import ModalProvider from "@/providers/ModalProvider"
import Sidebar from "@/components/Sidebar"
import Player from "@/components/Player"
import "./globals.css"

const font = Figtree({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Spotify, seu app de músicas.",
    description: "Spotify, toque suas músicas favoritas.",
    icons: {
        icon: "/images/fav.png",
        shortcut: "/images/fav.png"
    },
    authors: {
        name: "Bruno Carvalho Feitosa",
        url: "https://br.linkedin.com/in/bruno-carvalho-feitosa"
    }
}

export const revalidate = 0

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const userSongs = await getSongsByUserId()
    const products = await getActiveProductsWithPrices()

    return (
        <html lang="pt-br">
            <body className={font.className}>
                <SupabaseProvider>
                    <ToastProvider />
                    <UserProvider>
                        <ModalProvider products={products} />
                        <Sidebar songs={userSongs}>
                            {children}
                        </Sidebar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    )
}