import { InputWrapper, Label, Input, Error } from "./styled"

export default function FormInput({type, name, placeholder, values, onChange, label}) {
    const inputProps={type, name, placeholder, value:values.form[name]||'', onChange}
    const error = values.errors[name]
    return (
        <InputWrapper>
            <Label htmlFor={name}>{label}</Label>
            <Input {...inputProps}/>
            <Error>{error}</Error>
        </InputWrapper>
    )
}


