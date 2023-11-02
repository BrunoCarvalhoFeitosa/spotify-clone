"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import useSubscribeModal from "@/hooks/useSubscribeModal"
import { useUser } from "@/hooks/useUser"
import { postData } from "@/libs/helpers"
import toast from "react-hot-toast"
import Button from "@/components/Button"

const AccountContent = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()
    const subscribeModal = useSubscribeModal()
    const { isLoading, subscription, user } = useUser()

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/")
        }
    }, [isLoading, user, router])

    const redirectToCostumerPortal = async () => {
        setLoading(true)

        try {
            const { url, error } = await postData({
                url: "/api/create-portal-link"
            })

            window.location.assign(url)
        } catch (error) {
            if (error) {
                toast.error((error as Error)?.message)
            }
        }

        setLoading(false)
    }

    return (
        <div className="mb-7 px-6 flex flex-col justify-center items-center h-[calc(100%-250px)]">
            {!subscription && (
                <div className="flex flex-col items-center gap-y-4">
                    <div className="flex items-center gap-x-1">
                        <span className="text-xl">Olá,</span>
                        <h3 className="text-xl font-semibold text-neutral-400">{user?.email}</h3>
                    </div>
                    <div className="w-[70%] mx-auto">
                        <p className="text-center">Você ainda não assinou o Spotify Premium, para aproveitar os recursos, assine agora mesmo.</p>
                    </div>
                    <div>
                        <Button
                            onClick={subscribeModal.onOpen}
                            className="w-[300px]"
                        >
                            Assinar o Spotify Premium
                        </Button>
                    </div>
                </div>
            )}
            {subscription && (
                <div className="flex flex-col items-center gap-y-4">
                    <div className="flex items-center gap-x-1">
                        <span className="text-xl">Olá,</span>
                        <h3 className="text-xl font-semibold text-neutral-400">{user?.email}</h3>
                    </div>
                    <div>
                        <p className="text-center">Você já assinou o plano do Spotify Premium.</p>
                    </div>
                    <div>
                        <Button
                            disabled={loading || isLoading}
                            onClick={redirectToCostumerPortal}
                            className="w-[300px]"
                        >
                            Abrir histórico de compra
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountContent