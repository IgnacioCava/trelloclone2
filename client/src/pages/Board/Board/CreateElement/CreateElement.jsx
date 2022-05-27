import React, { useState, useRef } from "react"
import { plus, cross } from "../../../../assets"
import Button from "../../../../components/buttons/BlueLink"
import {ElementInput, Exit, Options, CreateElementWrapper, PlusIcon, NewElementText, Clickable, ElementForm, ElementArea, Text} from "./styled"
import adjustHeightToContent from "../../../../helpers/adjustHeight"

const CreateElement = ({create, name, area, startingValue, required}) => {

    const [elementTitle, setTitle] = useState(startingValue||'')
    const [addElement, setAdd] = useState(false)
    const input = useRef(null)

    const handleChange = (e) => setTitle(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(elementTitle) {
            create(elementTitle)
            if(!area) setTitle('')
            setAdd(false)
        }
        else if(!required){
            create(elementTitle)
            if(!area) setTitle('')
            setAdd(false)
        }
    }

    return (
        <CreateElementWrapper add={addElement} onClick={()=>!addElement?setAdd(true):null}>
            {addElement ? 
                <ElementForm onSubmit={handleSubmit}>
                    {area?
                    <ElementArea ref={input} type='text' placeholder={`${name.charAt(0).toUpperCase()+name.substring(1)}`} value={elementTitle} onMouseEnter={adjustHeightToContent} onChange={(e)=>{handleChange(e); adjustHeightToContent(e)}}/>
                    :<ElementInput ref={input} type='text' placeholder={`${name.charAt(0).toUpperCase()+name.substring(1)}`} value={elementTitle} onChange={handleChange}/>
                    }
                    <Options>
                        <Button type='button'>
                            Add {name}
                        </Button>
                        <Exit src={cross} alt='cross' onClick={()=>setAdd(false)}/>
                    </Options>
                </ElementForm>
            : 
                <Clickable onClick={()=>setAdd(true)}>
                    <PlusIcon src={plus} alt='plus'/>
                    {area?
                    <Text>{elementTitle}</Text>
                    :<NewElementText>Add new {name.split(' ')[0]}</NewElementText>}
                </Clickable>
            }
        </CreateElementWrapper>
    )
}

export default CreateElement