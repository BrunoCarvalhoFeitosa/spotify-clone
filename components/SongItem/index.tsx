"use client"
import Image from "next/image"
import useLoadImage from "@/hooks/useLoadImage"
import PlayButton from "@/components/PlayButton"
import { Song } from "@/types"

interface SongItemProps {
    data: Song
    onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    const imagePath = useLoadImage(data)

    return (
        <div
            onClick={() => onClick(data.id)}
            className="relative p-3 group flex flex-col justify-center items-center gap-x-4 rounded-md bg-neutral-400/5 hover:bg-neutral-400/10 transition overflow-hidden cursor-pointer"
        >
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image
                    className="object-cover"
                    src={imagePath || "/images/liked.png"}
                    fill
                    alt="Image"
                />
            </div>
            <div className="flex flex-col items-start gap-y-1 w-full pt-4">
                <h3 className="w-full font-semibold truncate">
                    {data.title}
                </h3>
                <p className="w-full pb-4 text-sm text-neutral-400 truncate">
                    {data.author}
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton />
            </div>
        </div>
    )
}

export default SongItem