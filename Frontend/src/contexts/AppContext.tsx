import React, { useState } from "react";

export interface IAppContext {
    customerUpdated: boolean;
    setCustomerUpdated: (data: boolean) => void
}

type Props = {
    children?: React.ReactNode
};

export const AppContext = React.createContext<IAppContext>({} as IAppContext)

const AppContextProvider: React.FC<Props> = ({ children }) => {

    const [customerUpdated, setCustomerUpdated] = useState(false)

    return <AppContext.Provider value={{ customerUpdated, setCustomerUpdated }}>
        {children}
    </AppContext.Provider>
}

export default AppContextProvider;