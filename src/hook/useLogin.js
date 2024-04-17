import { useMemo } from "react";
import postFetchLogin from "../components/helpers/fetch";

export const useLogin = async () => {


    // Usamos useMemo para memorizar
    const memoizedLogin = await useMemo(() => {
        return postFetchLogin();
    }, []);

    return memoizedLogin;

}