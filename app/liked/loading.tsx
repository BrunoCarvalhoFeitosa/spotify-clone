"use client"
import { BounceLoader } from "react-spinners"
import Box from "@/components/Box"

const Loading = () => {
    return (
        <Box className="flex justify-center items-center h-full">
            <BounceLoader color="#22C55E" size={40} />
        </Box>
    )
}

export default Loading