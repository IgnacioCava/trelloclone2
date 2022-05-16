import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { withBoard } from "../../store/contexts/withBoard";
import BoardTitle from "./Title/BoardTitle";
import List from "./List/List";
import styled from "styled-components";

const Board = withBoard(({state, actions}) => {
    const { id } = useParams();
    const { getBoard, renameBoard, addList, deleteList } = actions;
    const { thisBoard } = state;

    const [listT, setTitle] = useState('');

    const [lists, title, members] = [ thisBoard?.lists, thisBoard?.title, thisBoard?.members ];

    useEffect(() => {
        getBoard(id)
    } , [id])

    const listTitle = (e) => setTitle(e.target.value)

    if(thisBoard._id) return (
        <div>
            <BoardTitle title={title} rename={(title)=>renameBoard(id, title)}/>
            {/* {JSON.stringify(thisBoard)} */}
            <Lists>
                {lists.map((list, i)=>{
                    return <List key={i} actions={actions} list={list}/>
                })}
            </Lists>
            <input type='text' placeholder='List title' onChange={listTitle}/>
            <button onClick={()=>listT?addList(listT):null}>
                Add list
            </button>
        </div>
    )
})

const Lists = styled.div`   
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`

export default Board