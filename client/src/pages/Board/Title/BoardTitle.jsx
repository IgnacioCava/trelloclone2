import EditableInput from "../../../components/Inputs/EditableInput";

const BoardTitle = ({title, rename}) => {
    
    return <EditableInput value={title} name='title' label='Set board title' onChange={rename}/>
}

export default BoardTitle