'use client'
import { MagnifyingGlass } from "@/components/icons/MagnifyingGlass"
import { Input } from "@/components/ui/input"

interface IUserSearchForm{
    onChange: (username:string) => void,
}

export function UserSearchForm({onChange}:IUserSearchForm) {


    return(
        <div className="relative">
            <Input
            onChange={(e) => onChange(e.target.value)}
            placeholder="Username"
            className="text-center p-5 pr-9">
            </Input>
            <MagnifyingGlass className="absolute top-[6px] right-[6px]"/>
        </div>
    )
}