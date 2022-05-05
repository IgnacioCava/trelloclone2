import EditableInput from "../../../../components/Inputs/EditableInput"

const BoardTitle = ({title, rename}) => {
    
    return <div style={{margin:4}}>
        <EditableInput value={title} name='title' label='Set board title' onChange={rename}/>
    </div>
}

export default BoardTitle