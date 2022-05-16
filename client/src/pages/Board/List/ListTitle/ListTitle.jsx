import EditableInput from "../../../../components/Inputs/EditableInput";
import { Custom } from "./styled";

const ListTitle = ({title, rename}) => {

    return <Custom>
        <EditableInput value={title} name='title' onChange={rename}/>
    </Custom>
}

export default ListTitle


