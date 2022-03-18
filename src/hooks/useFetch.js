import { useState, useEffect } from 'react';
import axios from 'axios'

function useFetch (urlString, callbackFunction) {
    const controller = new AbortController();

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [url, setUrl] = useState(urlString)
    const [callback, setCallback] = useState(() => callbackFunction)


    useEffect(() => {
        setLoading(true)
        setData(null)
        setError(null)

        axios.get(url, {
            signal: controller.signal,
        })
        .then((response) => {
            response.data && setData((prev) => response.data)
            if (callback && typeof callback === "function") callback(response)
        })
        .catch((err) => {
            console.log(err)
            setError(true)
        })
        .finally(() => setLoading(false))


        return () => {
            if (!loading) return
            controller.abort()
            setCallback(null)
        }
    }, [url])

    useEffect(() => {
        console.log('hook')
    })


    return { data, error, loading, setUrl, setData }
}

export { useFetch }