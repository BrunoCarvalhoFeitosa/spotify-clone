"use client"
import Image from "next/image"
import usePlayer from "@/hooks/usePlayer"
import useLoadImage from "@/hooks/useLoadImage"
import { Song } from "@/types"

interface MediaItemProps {
    data: Song
    onClick?: (id: string) => void
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const player = usePlayer()
    const imageUrl = useLoadImage(data)

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }

        return player.setId(data.id)
    }

    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-3 w-full py-2 px-4 rounded-md hover:bg-neutral-800/50 cursor-pointer"
        >
            <div className="relative min-w-[48px] min-h-[48px] rounded-md overflow-hidden">
                <Image
                    fill
                    src={imageUrl || "images/liked.png"}
                    alt={data.title}
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <div>
                    <p className="text-white truncate">
                        {data.title}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-neutral-400 truncate">
                        {data.author}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MediaItem