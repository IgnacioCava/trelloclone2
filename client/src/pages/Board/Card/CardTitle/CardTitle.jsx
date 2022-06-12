import React from 'react';
import EditableInput from "../../../../components/Inputs/EditableInput";
import { Custom } from "./styled";

const CardTitle = ({title, rename}) => {

    return <Custom>
        <EditableInput value={title} name='title' onChange={rename}/>
    </Custom>
}

export default CardTitle