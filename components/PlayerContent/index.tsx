"use client"
import { useEffect, useState } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2"
import usePlayer from "@/hooks/usePlayer"
import useSound from "use-sound"
import MediaItem from "@/components/MediaItem"
import LikeButton from "@/components/LikeButton"
import Slider from "@/components/Slider"
import { Song } from "@/types"

interface PlayerContentProps {
    song: Song
    songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
    const player = usePlayer()
    const [volume, setVolume] = useState<number>(1)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {
        if (player.ids.length === 0) return 

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]

        if (!nextSong) {
            return player.setId(player.ids[0])
        }

        player.setId(nextSong)
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) return 

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const previousSong = player.ids[currentIndex - 1]

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }

        player.setId(previousSong)
    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            format: ["mp3"],
            onplay: () => setIsPlaying(true),
            onpause: () => setIsPlaying(false),
            onend: () => {
                setIsPlaying(false)
                onPlayNext()
            },
        }
    )

    useEffect(() => {
        sound?.play()

        return () => {
            sound?.unload()
        }
    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play()
        } else {
            pause()
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0)
        }
    }

    return (
        <div className="grid grid-cols grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex justify-start w-full">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className="flex md:hidden justify-end items-center col-auto w-full">
                <div
                    onClick={() => {}}
                    className="flex justify-center items-center w-10 h-10 p-1 rounded-full bg-white cursor-pointer"
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>
            <div className="hidden md:flex justify-center items-center gap-x-6 w-full max-w-[722px] h-full">
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={25}
                    className="text-neutral-400 hover:text-white transition cursor-pointer"
                />
                <div
                    onClick={handlePlay}
                    className="flex justify-center items-center w-10 h-10 p-1 rounded-full bg-white cursor-pointer"
                >
                    <Icon size={25} className="text-black" />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={25}
                    className="text-neutral-400 hover:text-white transition cursor-pointer"
                />
            </div>
            <div className="hidden md:flex justify-end w-full pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={25}
                    />
                    <Slider value={volume} onChange={(value) => setVolume(value)} />
                </div>
            </div>
        </div>
    )
}

export default PlayerContent