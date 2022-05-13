import { useState } from "react"
import { withAuth } from "../../../store/contexts/withAuth"
import FormInput from "../../../components/Inputs/FormInput"
import Button from "../../../components/buttons/BlueLink"
import validate from "../../../helpers/formValidation"
import { Link, useNavigate } from "react-router-dom"
import { Form, Back } from "./styled"

const Login = withAuth(({state, actions}) => {
    const { login } = actions

    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [errors, setError] = useState('')

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
        setError({...errors, ...validate(e.target, form)})
    }

    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        const errorCount = Object.values(errors)
        if(errorCount.length===3&&!errorCount.filter(e=>e).length) login(form, ()=>navigate('/home'))
    }

    return (
            <Form onSubmit={handleSubmit}>
                <FormInput type='text' name='email' values={{form, errors}} label='Email' onChange={handleChange}/>
                <FormInput type='password' name='password' values={{form, errors}} label='Password' onChange={handleChange}/>

                <Button>Log In</Button>
                <Back>Or <Link to='/landing/register'>Sign Up</Link> into a new account</Back>
            </Form>
    )
})

export default Login