import { useEffect, useState } from "react"

interface Iprops {
    apiRoute: string,
    param: string,
}

const useFetch = ({apiRoute, param}: Iprops) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchUrl = async () => {
            try {
                const data = await fetch(`https://quiz-app-syso.onrender.com/${apiRoute}/${param ? param : ""}`);
                const parsedData = await data.json();
                setData(prev => parsedData);
                setLoading(false);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchUrl();
    }, [apiRoute, param])
    return {data, loading};
}

export default useFetch;