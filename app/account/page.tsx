import Header from "@/components/Header"
import AccountContent from "./components/AccountContent"

const Account = () => {
    return (
        <div className="w-full h-full bg-neutral-900 rounded-lg overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-3xl font-semibold text-white">
                        Configurações da conta
                    </h1>
                </div>
            </Header>
            <AccountContent />
        </div>
    )
}

export default Account