import React, {useContext, useState}  from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom"

export const CreatePage = () => {
    const history = useHistory()
    const [link, setLink] = useState('')
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const pressHandler = async e => {
        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST', {from: link},
                    {
                        Authorization: `Bearer ${auth.token}`
                    })
                 history.push(`/detail/${data.link._id}`)
            } catch (e) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s10 offset-s1" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="https://google.com"
                        id="link"
                        type="text"
                        name="email"
                        className="validate"
                        value={link}
                        onKeyPress={pressHandler}
                        onChange={e => setLink(e.target.value)}
                    />
                    <label htmlFor="link">Insert link</label>
                </div>
            </div>
        </div>
    )
}
