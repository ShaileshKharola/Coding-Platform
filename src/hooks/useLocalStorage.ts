import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue: string) => {
    const [Value, setValue] = useState(() => {
        try {
           if(typeof window !=="undefined"){
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
           }else return initialValue;           
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            if(typeof window !== "undefined"){
            window.localStorage.setItem(key, JSON.stringify(Value));
           }
        } catch (error) {
            console.error(error);
        }
    }, [key, Value]);

    return [Value, setValue];
};

export default useLocalStorage;
