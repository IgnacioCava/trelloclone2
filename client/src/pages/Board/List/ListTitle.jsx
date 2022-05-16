import EditableInput from "../../../components/Inputs/EditableInput";
import styled from "styled-components";

const ListTitle = ({title, rename}) => {

    return <A>
        <EditableInput value={title} name='title' label='Set list title' onChange={rename}/>
    </A>
}

export default ListTitle

const A = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
    word-wrap: break-word;
`
