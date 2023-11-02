"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { FaPlay } from "react-icons/fa"

interface ListItemProps {
    image: string
    name: string
    href: string
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
    const router = useRouter()

    const onClick = () => {
        router.push(href)
    }
    
    return (
        <button
            onClick={onClick}
            className="relative group flex items-center gap-x-4 pr-4 rounded-md overflow-hidden bg-neutral-100/10 hover:bg-neutral-100/20 transition"
        >
            <div className="relative min-w-[64px] min-h-[64px]">
                <Image
                    fill
                    src={image}
                    className="object-cover"
                    alt="image"
                />
            </div>
            <div>
                <p className="py-5 truncate font-medium">
                    {name}
                </p>
            </div>
            <div className="absolute right-5 flex justify-center items-center p-4 bg-green-500 rounded-full drop-shadow-md opacity-0 transition group-hover:opacity-100 hover:scale-110">
                <FaPlay className="text-black" />
            </div>
        </button>
    )
}

export default ListItem