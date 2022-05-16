import Close from '../../../../../../components/buttons/Close'
import EditableInput from '../../../../../../components/Inputs/EditableInput'
import CreateElement from '../../../../Board/CreateElement/CreateElement'
import { Progress, Max, Current, Title, ChecklistItem, Checklist } from './styled'
import { useMemo } from 'react'

const ChecklistComponent = ({listId, cardId, actions, checklist}) => {

    const { renameChecklist, deleteChecklist, addChecklistItem, deleteChecklistItem, editChecklistItem } = actions;

    const handleRenameChecklist = formData => renameChecklist(formData, checklist._id, cardId, listId)
    const handleDeleteChecklist = () => deleteChecklist(checklist._id, cardId, listId)

    const handleAddChecklistItem = formData => addChecklistItem(formData, checklist._id, cardId, listId)
    const handleDeleteChecklistItem = (checklistItemId) => deleteChecklistItem(checklistItemId, checklist._id, cardId, listId)
    const handleEditChecklistItem = (formData, checklistItemId) => editChecklistItem(formData, checklistItemId, checklist._id, cardId, listId)

    const completedItems = useMemo(() => checklist.items.map(e=>e.completed).map(e=>e?1:0).reduce((a,b)=>a+b,0), [checklist])
    
    return (
        <Checklist>
            <Title>
                <Close onClick={()=>handleDeleteChecklist(checklist._id)}/>
                <EditableInput value={checklist.title} name='title' onChange={(title)=>handleRenameChecklist(title)}/>
            </Title>

            <Progress>
                <span>{Math.round(completedItems/checklist.items.length*100)}%</span>
                <Max>
                    <Current status={completedItems/checklist.items.length*100}/>
                </Max>
            </Progress>

            {checklist.items.map(item=>
                <ChecklistItem status={completedItems===checklist.items.length} checked={item.completed}>
                    <input type='checkbox' checked={item.completed} onClick={()=>handleEditChecklistItem({completed: !item.completed}, item._id)}/>
                    <EditableInput value={item.text} name='text' onChange={(text)=>handleEditChecklistItem({text}, item._id)}/>
                    <Close onClick={()=>handleDeleteChecklistItem(item._id)}/>
                </ChecklistItem>
            )}
            <CreateElement create={(text)=>handleAddChecklistItem(text, checklist._id)} name='item'/>
        </Checklist>
    )
}

export default ChecklistComponent
