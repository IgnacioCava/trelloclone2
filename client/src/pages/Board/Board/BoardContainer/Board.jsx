import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { withBoard } from "../../../../store/contexts/withBoard";
import BoardTitle from "../BoardTitle/BoardTitle";
import List from "../../List/ListContainer/List";
import CreateElement from "../CreateElement/CreateElement";
import { BoardWrapper, Lists } from "./styled";

const Board = withBoard(({state, actions}) => {
    const { id } = useParams();
    const { getBoard, renameBoard, addList } = actions;
    const { thisBoard } = state;

    const [lists, title, members, allCards] = [ thisBoard?.lists, thisBoard?.title, thisBoard?.members, thisBoard?.allCards ];

    console.log(allCards)

    useEffect(() => {
        getBoard(id)
    } , [id])

    if(thisBoard._id) return (
        <BoardWrapper>
            <BoardTitle title={title} rename={(title)=>renameBoard(id, title)}/>
            {/* {JSON.stringify(thisBoard)} */}
            <Lists>
                {lists.map((list, i)=>{
                    return <List key={i} actions={actions} list={list}/>
                })}
                <CreateElement create={addList} name='list'/>
            </Lists>
        </BoardWrapper>
    )
})

export default Board