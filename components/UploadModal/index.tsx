"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import uniqid from "uniqid"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useUser } from "@/hooks/useUser"
import useUploadModal from "@/hooks/useUploadModal"
import Modal from "@/components/Modal"
import Input from "@/components/Input"
import Button from "@/components/Button"

const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { user } = useUser()
    const { register, handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            reset()
            uploadModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true)
            const uniqueID = uniqid()
            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if (!imageFile || !songFile || !user) {
                toast.error("Preencha todos os campos.")
                return
            }

            const { 
                data: songData, 
                error: songError 
            } = await supabaseClient
                .storage
                .from("songs")
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                cacheControl: "3600",
                upsert: false
                })

            if (songError) {
                setIsLoading(false)
                return toast.error("Falha ao incluir música à biblioteca. ")
            }

            const { 
                data: imageData, 
                error: imageError
            } = await supabaseClient
                .storage
                .from("images")
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: "3600",
                    upsert: false
                })

            if (imageError) {
                setIsLoading(false)
                return toast.error("Falha ao incluir música à biblioteca.")
            }

            const { error: supabaseError } = await supabaseClient
                .from("songs")
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                })

            if (supabaseError) {
                return toast.error(supabaseError.message)
            }
      
            router.refresh()
            setIsLoading(false)
            toast.success("Música incluída à biblioteca.")
            reset()
            uploadModal.onClose()
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            title="Incluir música à biblioteca"
            description="Faça upload de um arquivo .mp3"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
        <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="flex flex-col gap-y-4"
        >
            <div>
                <div className="pb-1">
                    Título da música
                </div>
                <div>
                    <Input
                        id="title"
                        disabled={isLoading}
                        placeholder="Título da música"
                        {...register("title", { required: true })}
                    />
                </div>
            </div>
            <div>
                <div className="pb-1">
                    Autor da música
                </div>
                <div>
                    <Input
                        id="author"
                        disabled={isLoading}
                        placeholder="Autor da música"
                        {...register("author", { required: true })}
                    />
                </div>
            </div>
            <div>
                <div className="pb-1">
                    Escolha o arquivo .mp3 para música
                </div>
                <div>
                    <Input
                        disabled={isLoading}
                        type="file"
                        accept=".mp3"
                        id="song"
                        className="text-neutral-400 cursor-pointer"
                        {...register("song", { required: true })}
                    />
                </div>
            </div>
            <div>
                <div className="pb-1">
                    Selecione uma imagem de capa para música
                </div>
                <div>
                    <Input
                        disabled={isLoading}
                        type="file"
                        accept="image/*"
                        id="image"
                        className="text-neutral-400 cursor-pointer"
                        {...register("image", { required: true })}
                    />
                </div>
            </div>
            <Button disabled={isLoading} type="submit">
                Incluir esta música
            </Button>
        </form>
    </Modal>
  )
}

export default UploadModal