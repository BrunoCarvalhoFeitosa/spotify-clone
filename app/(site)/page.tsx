import Header from "@/components/Header"
import ListItem from "@/components/ListItem"
import getSongs from "@/actions/getSongs"
import PageContent from "./components/PageContent"

export const revalidate = 0

const Home = async () => {
    const songs = await getSongs()

    return (
        <div className="w-full h-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
            <Header>
                <div className="mb-2">
                    <div>
                        <h1 className="text-3xl font-semibold text-white">
                            Bem-vindo
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
                        <ListItem image="/images/liked.png" name="Músicas curtidas" href="liked" />
                    </div>
                </div>
            </Header>
            <div className="mt-2 mb-7 px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-white">
                        Novas músicas
                    </h1>
                </div>
                <div>
                    <PageContent songs={songs} />
                </div>
            </div>
        </div>
    )
}

export default Home