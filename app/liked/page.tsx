import getLikedSongs from "@/actions/getLikedSongs"
import Header from "@/components/Header"
import Image from "next/image"
import LikedContent from "./components/LikedContent"

export const revalidate = 0

const Liked = async () => {
    const songs = await getLikedSongs()

    return (
        <div className="w-full h-full bg-neutral-900 rounded-lg overflow-hidden overflow-y-auto">
            <Header>
                <div className="mt-20">
                    <div className="flex flex-col md:flex-row items-center gap-x-5">
                        <div className="relative w-32 h-32 lg:w-44 lg:h-44">
                            <Image
                                fill
                                alt="Playlist"
                                className="object-cover"
                                src="/images/liked.png"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <h3 className="hidden md:block text-sm font-semibold">
                                Playlist
                            </h3>
                            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
                                Músicas curtidas
                            </h2>
                        </div>
                    </div>
                </div>
            </Header>
            <LikedContent songs={songs} />
        </div>
    )
}

export default Liked