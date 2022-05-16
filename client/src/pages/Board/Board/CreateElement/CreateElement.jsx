import { useState, useRef } from "react"
import plus from "../../../../assets/plus.png"
import cross from "../../../../assets/cross.png"
import Button from "../../../../components/buttons/BlueLink"
import {ListInput, Exit, Options, CreateListWrapper, PlusIcon, NewListText, Clickable, ListForm,} from "./styled"

const CreateElement = ({create, name}) => {

    const [elementTitle, setTitle] = useState('')
    const [addElement, setAdd] = useState(false)
    const input = useRef(null)

    const handleChange = (e) => setTitle(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(elementTitle) {
            create(elementTitle)
            setTitle('')
            setAdd(false)
        }
    }

    return (
        <CreateListWrapper add={addElement} onClick={()=>!addElement?setAdd(true):null}>
            {addElement ? 
                <ListForm onSubmit={handleSubmit}>
                    <ListInput ref={input} type='text' placeholder={`${name.charAt(0).toUpperCase()+name.substring(1)} title`} value={elementTitle} onChange={handleChange}/>
                    <Options>
                        <Button type='button'>
                            Add {name}
                        </Button>
                        <Exit src={cross} alt='cross' onClick={()=>setAdd(false)}/>
                    </Options>
                </ListForm>
            : 
                <Clickable onClick={()=>setAdd(true)}>
                    <PlusIcon src={plus} alt='plus'/>
                    <NewListText>Add new {name}</NewListText>
                </Clickable>
            }
        </CreateListWrapper>
    )
}




export default CreateElement