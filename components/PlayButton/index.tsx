"use client"
import { FaPlay, FaPause } from "react-icons/fa"

interface PlayButtonProps {
    playingSongId: string
    songId: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ playingSongId, songId }) => {
    return (
        <button className="flex items-center p-4 rounded-full bg-green-500 drop-shadow-md opacity-0 transition translate translate-y-1/4 group-hover:opacity-100 group-hover:translate-y-0 hover:scale-110">
            {playingSongId === songId ? <FaPause className="text-black" /> : <FaPlay className="text-black" />}
        </button>
    )
}

export default PlayButton