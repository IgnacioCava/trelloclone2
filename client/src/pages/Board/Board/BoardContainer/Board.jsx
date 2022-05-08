import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { withBoard } from "../../../../store/contexts/withBoard";
import BoardTitle from "../BoardTitle/BoardTitle";
import List from "../../List/ListContainer/List";
import CreateElement from "../CreateElement/CreateElement";
import { BoardWrapper, Lists } from "./styled";

const Board = withBoard(({state, actions}) => {
    const { id } = useParams();
    const { getBoard, renameBoard, addList, getUser } = actions;
    const { thisBoard, user } = state;

    const [lists, title, members, allCards] = [ thisBoard?.lists, thisBoard?.title, thisBoard?.members, thisBoard?.allCards ];

    useEffect(() => {
        getBoard(id)
        getUser()
    } , [id])

    const memberList = useMemo(()=>{
        return members?.map(member=>{return {...member, color: `hsla(${~~(360 * Math.random())},70%,70%,0.8)`}});
    }, [members])

    if(thisBoard._id) return (
        <BoardWrapper>
            <BoardTitle title={title} rename={(title)=>renameBoard(id, title)}/>

            <Lists>
                {lists.map((list, i)=>{
                    return <List key={i} actions={actions} list={list} members={memberList} user={user}/>
                })}
                <div>
                    <CreateElement create={addList} name='list title'/>
                </div>
            </Lists>
        </BoardWrapper>
    )
})

export default Board