
"use client"
import { useState } from "react"
import Modal from "@/components/Modal"
import toast from "react-hot-toast"
import { useUser } from "@/hooks/useUser"
import useSubscribeModal from "@/hooks/useSubscribeModal"
import { postData } from "@/libs/helpers"
import { getStripe } from "@/libs/stripeClient"
import Button from "@/components/Button"
import { Price, ProductWithPrice } from "@/types"

interface SubscribeModalProps {
    products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: price.currency,
    }).format((price?.unit_amount || 0) / 100)

    return priceString
}

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
    const [priceIdLoading, setPriceIdLoading] = useState<string>()
    const subscribeModal = useSubscribeModal()
    const { user, isLoading, subscription } = useUser()

    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModal.onClose()
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id)

        if (!user) {
            setPriceIdLoading(undefined)

            return toast.error("Você precisa fazer login.")
        }

        if (subscription) {
            setPriceIdLoading(undefined)

            return toast("Você já é assinante do plano Premium.")
        }

        try {
            const { sessionId } = await postData({
                url: "/api/create-checkout-session",
                data: { price }
            })

            const stripe = await getStripe()
            stripe?.redirectToCheckout({ sessionId })
        } catch (error) {
            toast.error((error as Error)?.message)
        } finally {
            setPriceIdLoading(undefined)
        }
    }

    let content = (
        <div className="text-center">
            Nenhum produto disponível.
        </div>
    )

    if (products.length) {
        content = (
            <div className="flex flex-col justify-center">
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div key={product.id}>
                                Nenhum preço cadastrado no produto.
                            </div>
                        )
                    }

                    return product.prices.map((price) => (
                        <Button
                            key={price.id}
                            onClick={() => handleCheckout(price)}
                            disabled={isLoading || price.id === priceIdLoading}
                            className="mb-4"
                        >
                            {`Assine o Premium por ${formatPrice(price)} ao mês`}
                        </Button>
                    ))
                })}
            </div>
        )
    }

    if (subscription) {
        content = (
            <div className="text-center">
                Você já é assinante do plano Premium.
            </div>
        )
    }

    return (
        <Modal
            title="Apenas para usuários Spotify Premium"
            description="Ouça suas músicas de qualquer lugar, à qualquer hora."
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {content}
        </Modal>
    )
}

export default SubscribeModal