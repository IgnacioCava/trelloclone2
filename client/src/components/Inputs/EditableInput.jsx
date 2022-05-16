import { InputWrapper, Label, Input, Error, Editable, Text, Icon, Wrap } from "./styled"
import { useEffect, useState } from "react"
import editIcon from "../../assets/editIcon.png"

export default function EditableInput({type, name, placeholder, value, onChange, label}) {
    const inputProps={type:type||'text', name, placeholder, onChange}

    const [text, setText] = useState(value)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setText(value)
    } , [value])

    const handleInput = (e)=> {
        setText(e.target.value)
        if(!e.target.value) setError('Please enter a '+name)
        else setError('')
    }

    const handleBlur = (e)=> {
        const key = e.key
        if(!error){
            if(key==='Enter'){
                setText(text.trim())
                onChange(text.trim())
                setEdit(false)
            }
            else if(key==='Escape') {
                setText(value)
                setEdit(false)
            }
        }
    }

    const handleClick = (e)=> {
        setText(text.trim())
        onChange(text.trim())
        setEdit(false)
    }

    return (
        <Editable>
            {edit?
            <InputWrapper >
                <Label htmlFor={name}>{label}</Label>
                <Wrap>
                    <Input {...inputProps} value={text} onKeyDown={handleBlur} onChange={handleInput} length={text.length}/>
                    <Icon src={editIcon} onClick={handleClick}/>
                </Wrap>
                <Error>{error}</Error>
            </InputWrapper>
            :
            <Text onClick={()=>setEdit(true)}>
                <h3>{text}</h3>
            </Text>}
        </Editable>
    )
}

