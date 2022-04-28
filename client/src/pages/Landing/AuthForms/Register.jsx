import FormInput from "../../../components/Inputs/FormInput"
import { useState, useMemo } from "react"
import Button from "../../../components/buttons/BlueLink"
import validate from "../../../helpers/formValidation"
import { Link } from "react-router-dom"
import { Form, Back } from "./styled"

export default function Register(){

    const inputs = useMemo(() => [{name:'username', label:'Username'}, {name:'email', label:'Email'}, {name:'password', label:'Password'}, {name:'password2', label:'Confirm Password'}]
    , [])
    
    const [form, setForm] = useState({})
    const [errors, setError] = useState('')

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
        setError({...errors, ...validate(e.target)})
    }


    function handleSubmit(e){
        e.preventDefault()
    }
    return (
            <Form onSubmit={handleSubmit}>

                {inputs.map(input => <FormInput key={input.name} type='text' name={input.name} values={{form, errors}} label={input.label} onChange={handleChange}/> )}

                <Button text='Sign up'/>
                <Back>Or <Link to='/landing/login'>Log In</Link> to an existing account</Back>

            </Form>
    )
}