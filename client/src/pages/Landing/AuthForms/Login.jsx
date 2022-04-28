import FormInput from "../../../components/Inputs/FormInput"
import { useState } from "react"
import Button from "../../../components/buttons/BlueLink"
import { Link } from "react-router-dom"
import { Form, Back } from "./styled"

export default function Login(){

    const [form, setForm] = useState({})
    const [errors, setError] = useState('')

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
        setError(errors)
    }

    function handleSubmit(e){
        e.preventDefault()
    }

    return (
            <Form onSubmit={handleSubmit}>

                <FormInput type='text' name='email' values={{form, errors}} label='Email' onChange={handleChange}/>
                <FormInput type='text' name='password' values={{form, errors}} label='Password' onChange={handleChange}/>

                <Button text='Log In'/>
                <Back>Or <Link to='/landing/register'>Sign up</Link> into a new account</Back>
                
            </Form>
    )
}