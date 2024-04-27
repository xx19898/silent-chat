'use server'

import { Button } from "@/components/ui/button"

export default async function MainPage(){


    return(
        <div className="w-auto min-h-screen flex flex-col justify-center items-center gap-[2em]">
            <Button className="w-[14em]">
                Anonymous
            </Button>
            <Button className="w-[14em]">
                Non-Anonymous
            </Button>
        </div>
    )
}