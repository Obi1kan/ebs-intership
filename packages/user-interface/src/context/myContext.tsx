import React from 'react'

export interface IUserInterface {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const userContextDefault: IUserInterface = {
    isAuth: false,
    setIsAuth: () => {}
}

export const UserContext = React.createContext<IUserInterface>(userContextDefault);

export interface UserContextProviderProps {
    children: React.ReactNode
}

export function UserContextProvider({children}: UserContextProviderProps){
    const [isAuth, setIsAuth] = React.useState(localStorage.getItem("token") != null)
    return <UserContext.Provider value={{isAuth, setIsAuth}}>{children}</UserContext.Provider>
}