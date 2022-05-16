import { useState, useRef } from 'react';
import { NewBoardWrapper, Box, CloseContainer } from './styled';
import FormInput from '../../../components/Inputs/FormInput';
import Button from '../../../components/buttons/BlueLink';
import Close from '../../../components/buttons/Close';

const NewBoard = ({close, create}) => {
    const [form, setForm] = useState({})
    const [errors, setError] = useState('')
    const outerBox = useRef(null)

    function handleChange(e){ setForm({title: e.target.value}) }

    function handleSubmit(e){
        e.preventDefault()
        if(form.title){
            create(form)
            close()
        }
        else setError({...errors, title:'Please enter a title'})
    }

    return (
        <NewBoardWrapper ref={outerBox} onClick={(e)=>e.target===outerBox.current? close() : null}>
            <Box onSubmit={handleSubmit}>
                <CloseContainer>
                    <Close onClick={close}>x</Close>
                </CloseContainer>
                <h1>New Board</h1>
                <FormInput name='title' label='Board Name' values={{form, errors}} onChange={handleChange}/>
                <Button>Create board</Button>
            </Box>
        </NewBoardWrapper>
    );
}

export default NewBoard;