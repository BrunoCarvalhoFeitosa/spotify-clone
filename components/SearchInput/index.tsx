"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import qs from "query-string"
import useDebounce from "@/hooks/useDebounce"
import Input from "@/components/Input"

const SearchInput = () => {
    const [value, setValue] = useState<string>("")
    const router = useRouter()
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        const query = {
            title: debouncedValue
        }

        const url = qs.stringifyUrl({
            url: "/search",
            query: query
        })

        router.push(url)
    }, [debouncedValue, value, router])

    return (
        <Input
            placeholder="O que você quer ouvir?"
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
    )
}

export default SearchInput