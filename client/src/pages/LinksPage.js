import React, {useContext, useState, useCallback, useEffect} from 'react'
import {AuthContext} from "../context/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";
import {LinksList} from "../components/LinksList";

export const LinksPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [links, setLinks] = useState([])

    const fetchLinks = useCallback(async()=>{
        try {
            const fetched = await  request(`/api/link`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {

        }
    },[token,request])

    useEffect(()=>{
        fetchLinks()
    },[fetchLinks])

    if(loading){
        return <Loader />
    }

    return(
        <>
            {!loading  && <LinksList links={links} />}
        </>
    )
}
