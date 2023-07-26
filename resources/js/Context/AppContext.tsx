import { IAuthInfo } from "@/Models/auth";
import { IAppInfo } from "@/Models/info-app";
import { createContext, useState } from "react";

const AppContext = createContext<{appInfo:IAppInfo, setAppInfo: (info: IAppInfo)=> any, role: string | null, setRole: (role: string)=> any}>({} as any);

const AppContextProvider = ({children, }: any) => {
    const [appInfo, setAppInfo] = useState<IAppInfo>({} as IAppInfo);
    const [role, setRole] = useState<'student' | 'teacher' | 'super-admin' | 'secretary' | null>(null);
    const contextValue = {
        appInfo,
        role,
        setAppInfo,
        setRole
    };
    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
};

export { AppContext, AppContextProvider };