"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import Modal from "@/components/Modal"
import useAuthModal from "@/hooks/useAuthModal"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { session } = useSessionContext()
    const { onClose, isOpen } = useAuthModal()

    useEffect(() => {
        if (session) {
            router.refresh()
            onClose()
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Modal
            title="Bem-vindo"
            description="Entre na sua conta"
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                theme="dark"
                magicLink
                providers={["github"]}
                supabaseClient={supabaseClient}
                localization={{
                    variables: {
                        sign_in: {
                            email_label: "E-mail",
                            email_input_placeholder: "nome@dominio.com",
                            password_label: "Senha",
                            password_input_placeholder: "Senha",
                            button_label: "Entrar",
                            loading_button_label: "Autenticando...",
                            social_provider_text: "Entrar",
                            link_text: "Já tem uma conta? Faça login aqui"
                        },
                        sign_up: {
                            email_label: "E-mail",
                            email_input_placeholder: "nome@dominio.com",
                            password_label: "Senha",
                            password_input_placeholder: "Senha",
                            button_label: "Cadastrar-me",
                            loading_button_label: "Cadastrando...",
                            social_provider_text: `Cadastrar`,
                            link_text: "Não tem uma conta? Cadastre-se aqui"
                        },
                        forgotten_password: {
                            email_label: "Endereço de e-mail",
                            email_input_placeholder: "nome@dominio.com",
                            password_label: "Sua senha",
                            button_label: "Enviar instruções de redefinição de senha",
                            loading_button_label: "Enviando instruções...",
                            link_text: "Esqueceu sua senha?",
                            confirmation_text: "Verifique seu e-mail para obter o link de redefinição de senha"
                        },
                        update_password: {
                            password_label: "Nova senha",
                            password_input_placeholder: "Sua nova senha",
                            button_label: "Atualizar senha",
                            loading_button_label: "Atualizando senha...",
                            confirmation_text: "Sua senha foi alterada com sucesso"
                        },
                        magic_link: {
                            email_input_label: "E-mail",
                            email_input_placeholder: "nome@dominio.com",
                            button_label: "Enviar",
                            loading_button_label: "Enviando...",
                            link_text: "Envie um e-mail com link mágico",
                            confirmation_text: "Verifique seu e-mail para obter o link mágico"
                        },
                        verify_otp: {
                            email_input_label: "E-mail",
                            email_input_placeholder: "nome@dominio.com",
                            phone_input_label: "Número de telefone",
                            phone_input_placeholder: "Seu número de telefone",
                            token_input_label: "Token",
                            token_input_placeholder: "Seu Otp token",
                            button_label: "Validar token",
                            loading_button_label: "Validando..."
                        }
                    }
                }}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22C55E"
                            }
                        }
                    }
                }}
            />
        </Modal>
    )
}

export default AuthModal