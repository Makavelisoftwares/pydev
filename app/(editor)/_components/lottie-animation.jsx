'use client'

import Lottie from "lottie-react"
import Animation from "@/public/animation.json"

export const LottieFile=()=>{
    return(
        <div className="w-full h-[30vh] mt-6">
            <Lottie style={{
                height:"50vh",
                width:"100%",
            }} animationData={Animation}/>
        </div>
    )
}