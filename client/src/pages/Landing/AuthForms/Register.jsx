import FormInput from "../../../components/Inputs/FormInput"
import { useState, useMemo } from "react"
import Button from "../../../components/buttons/BlueLink"
import validate from "../../../helpers/formValidation"
import { Link } from "react-router-dom"
import { Form, Back } from "./styled"
import { withAuth } from "../../../store/contexts/withAuth"

const Register = withAuth(({state, actions}) => {
    const { register } = actions
    const inputs = useMemo(() => [{name:'username', label:'Username'}, {name:'email', label:'Email'}, {name:'password', label:'Password'}, {name:'password2', label:'Confirm Password'}]
    , [])
    
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })
    const [errors, setError] = useState({})
    
    function handleChange(e){
        setForm({...form, [e.target.name]: e.target.value})
        setError({...errors, ...validate(e.target, form)})
    }

    function handleSubmit(e){
        e.preventDefault()
        const errorCount = Object.values(errors)
        if(errorCount.length===4&&!errorCount.filter(e=>e).length) register(form)
    }
    return (
            <Form onSubmit={handleSubmit}>

                {inputs.map(input => <FormInput key={input.name} type='text' name={input.name} values={{form, errors}} label={input.label} onChange={handleChange}/> )}

                <Button text='Sign up'/>
                <Back>Or <Link to='/landing/login'>Log In</Link> to an existing account</Back>

            </Form>
    )
})

export default Register