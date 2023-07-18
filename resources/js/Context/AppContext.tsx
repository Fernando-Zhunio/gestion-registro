import { IAuthInfo } from "@/Models/auth";
import { IAppInfo } from "@/Models/info-app";
import { createContext, useState } from "react";

const AppContext = createContext<{appInfo:IAppInfo, setAppInfo: (info: IAppInfo)=> any}>({} as any);

const AppContextProvider = ({children, }: any) => {
    const [appInfo, setAppInfo] = useState<IAppInfo>({} as IAppInfo);
    const contextValue = {
        appInfo,
        setAppInfo
    };
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
};

export { AppContext, AppContextProvider };