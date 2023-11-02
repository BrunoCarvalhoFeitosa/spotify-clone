"use client"
import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useSubscribeModal from "@/hooks/useSubscribeModal"
import useAuthModal from "@/hooks/useAuthModal"
import useUploadModal from "@/hooks/useUploadModal"
import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import MediaItem from "@/components/MediaItem"
import useOnPlay from "@/hooks/useOnPlay"

interface LibraryProps {
    songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
    const subscribeModal = useSubscribeModal()
    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const { user, subscription } = useUser()

    const onPlay = useOnPlay(songs)

    const onClick = () => {
        if (!user) {
            return authModal.onOpen()
        }

        if (!subscription) {
            return subscribeModal.onOpen()
        }

        return uploadModal.onOpen()
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <div>
                        <TbPlaylist size={26} className="text-neutral-400" />
                    </div>
                    <div>
                        <p className="font-medium text-md text-neutral-400">Sua biblioteca</p>
                    </div>
                </div>
                <div>
                    <AiOutlinePlus
                        size={26}
                        onClick={onClick}
                        className="text-neutral-400 hover:text-white transition cursor-pointer"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Library