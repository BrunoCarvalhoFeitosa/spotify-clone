"use client"
import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import usePlayer from "@/hooks/usePlayer"
import Box from "@/components/Box"
import SidebarItem from "@/components/SidebarItem"
import Library from "@/components/Library"
import { Song } from "@/types"

interface SidebarProps {
    children: React.ReactNode
    songs: Song[]
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
    const pathname = usePathname()
    const player = usePlayer()
    const routers = useMemo(() => [
        {
            icon: HiHome,
            label: "Home",
            active: pathname !== "/search",
            href: "/"
        },
        {
            icon: BiSearch,
            label: "Buscar",
            active: pathname === "/search",
            href: "/search"
        },
    ], [])

    return (
    <div className={twMerge(
        `flex h-full`,
        player.activeId && "h-[calc(100%-80px)]"
    )}>
        <div className="hidden md:flex flex-col gap-y-2 w-[300px] h-full p-2 bg-black">
            <Box>
                <div className="flex flex-col gap-y-4 px-5 py-4">
                    {routers.map((item) => (
                        <SidebarItem key={item.label} {...item} />
                    ))}
                </div>
            </Box>
            <Box className="h-full overflow-y-auto">
                <Library songs={songs} />
            </Box>
        </div>
        <main className="h-full flex-1 overflow-y-auto py-2">
            {children}
        </main>
    </div>
    )
}

export default Sidebar