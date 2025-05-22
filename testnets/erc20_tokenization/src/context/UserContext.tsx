import { createContext } from "react"

interface UserContextType {
    address : string | null
    setAddress : (address: string | null) => void
}

// both user and fn to set the user with default value=null
export const UserContext = createContext<UserContextType>({
    address: null,
    setAddress: () => {}
})