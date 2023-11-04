"use client"
import * as Dialog from "@radix-ui/react-dialog"
import { IoMdClose } from "react-icons/io"

interface ModalProps {
    isOpen: boolean
    title: string
    description: string
    children: React.ReactNode
    onChange: (open: boolean) => void
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    title,
    description,
    children,
    onChange
}) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-neutral-900/90 backdrop-blur-sm z-30" />
                <Dialog.Content className="fixed top-[50%] left-[50%] p-[25px] w-full md:w-[90vw] md:max-w-[450px] max-h-full h-full md:h-auto md:max-h-[90vh] drop-shadow-md border border-neutral-700 rounded-md bg-neutral-800 translate-x-[-50%] translate-y-[-50%] focus:outline-none z-30">
                    <Dialog.Title className="mb-4 text-xl text-center font-bold">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description className="mb-5 text-sm leading-normal text-center">
                        {description}
                    </Dialog.Description>
                    <div>
                        {children}
                    </div>
                    <Dialog.Close asChild>
                        <button className="absolute top-[10px] right-[10px] inline-flex justify-center items-center appearance-none rounded-full focus:outline-none text-neutral-400 hover:text-white">
                            <IoMdClose />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default Modal