import React, {useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/massage.hook";

export const AuthPage = () => {

    const {loading, error, request, clearError} = useHttp()
    const message = useMessage()

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(()=>{
        message(error)
        clearError()
    },[error, message, clearError])

    const changeHandler = e => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s10 offset-s1">
                <h1>M.E.R.N.</h1>
                <div className="card blue darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Auth</span>
                        <div style={{paddingTop: 15}}>
                            <div className="input-field">
                                <input
                                    placeholder="example@gmail.com"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="validate"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="*********"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="validate"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn white blue-text"
                            style={{marginRight: 15}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign in
                        </button>
                        <button
                            className="btn white blue-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}