import getSongsByTitle from "@/actions/GetSongsByTitle"
import Header from "@/components/Header"
import SearchInput from "@/components/SearchInput"
import SearchContent from "./components/SearchContent"

interface SearchProps {
    searchParams: {
        title: string
    }
}

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {
    const songs =  await getSongsByTitle(searchParams.title)

    return (
        <div className="w-full h-full bg-neutral-900 rounded-lg overflow-hidden overflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="flex flex-col gap-y-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-semibold text-white">
                            Buscar
                        </h1>
                    </div>
                    <div>
                        <SearchInput />
                    </div>
                </div>
            </Header>
            <SearchContent songs={songs} />
        </div>
    )
}

export default Search