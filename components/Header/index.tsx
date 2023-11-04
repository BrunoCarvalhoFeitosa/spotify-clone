"use client"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge"
import { HiHome } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import { RxCaretLeft, RxCaretRight } from "react-icons/rx"
import usePlayer from "@/hooks/usePlayer"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@/hooks/useUser"
import useAuthModal from "@/hooks/useAuthModal"
import Button from "@/components/Button"
import { FaUserAlt } from "react-icons/fa"
import { toast } from "react-hot-toast"

interface HeaderProps {
    children: React.ReactNode
    className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
    const player = usePlayer()
    const authModal = useAuthModal()
    const router = useRouter()
    const supabaseClient = useSupabaseClient()
    const { user } = useUser()

    const handleLogout = async () => {
        const { error} = await supabaseClient.auth.signOut()
        player.reset()
        router.refresh()

        if (error) {
            toast.error(error.message)
        } else {
            toast.success("Sessão encerrada com sucesso.")
        }
    }

    return (
        <div className={twMerge(`h-fit p-6 bg-gradient-to-b from-green-700`, className)}>
            <div className="w-full mb-4 flex justify-between items-center">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        className="flex justify-center items-center rounded-full bg-black transition hover:opacity-75"
                        onClick={() => router.back()}
                    >
                        <RxCaretLeft size={35} className="text-white" />
                    </button>
                    <button
                        className="flex justify-center items-center rounded-full bg-black transition hover:opacity-75"
                        onClick={() => router.forward()}
                    >
                        <RxCaretRight size={35} className="text-white" />
                    </button>
                </div>
                <div className="flex md:hidden items-center gap-x-2">
                    <button className="flex justify-center items-center p-2 bg-white rounded-full transition hover:opacity-75">
                        <HiHome size={20} className="text-black" />
                    </button>
                    <button className="flex justify-center items-center p-2 bg-white rounded-full transition hover:opacity-75">
                        <BiSearch size={20} className="text-black" />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user ? (
                        <div className="flex items-center gap-x-4">
                            <Button
                                onClick={handleLogout}
                                className="py-2 px-6 bg-white"
                            >
                                Encerrar sessão
                            </Button>
                            <Button
                                onClick={() => router.push("/account")}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="bg-transparent font-medium text-neutral-300"
                                >
                                    Cadastre-se
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="bg-white px-6 py-2"
                                >
                                    Entre
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    )
}

export default Header