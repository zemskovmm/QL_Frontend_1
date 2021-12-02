import { FC, useEffect } from "react"
import { useNavigate } from "react-router";
import { useUserStatuseStore } from "src/stores/UserStatuseStore";
import { Preload } from '@project/components/src/ui-kit/Preload';
type PropsType={
    element: React.ReactElement;
    redirect:  string;
}

export const ProtectedElement:FC<PropsType> = ({element,redirect})=>{
    const navigate = useNavigate()
    const { isAuthorized,isNotAuthorized } = useUserStatuseStore();

    useEffect(()=>{
        isNotAuthorized && navigate(redirect)
    },[isNotAuthorized])

    if(isAuthorized){
        return element
    }
    return <Preload isLoading/>
}