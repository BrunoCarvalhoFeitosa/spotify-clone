"use client"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import { IconType } from "react-icons"

interface SidebarItemProps {
    icon: IconType
    label: string
    active?: boolean
    href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return (
        <Link href={href} className={twMerge(
            `flex items-center gap-x-4 w-full h-auto py-1 text-md font-medium text-neutral-400 cursor-pointer hover:text-white transition`,
            active && "text-white"    
        )}>
            <div>
                <Icon size={26} />
            </div>
            <div>
                <p className="w-full truncate">
                    {label}
                </p>
            </div>
        </Link>
    )
}

export default SidebarItem