import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { withBoard } from "../../store/contexts/withBoard";

export const Board = withBoard(({state, actions}) => {
    const { id } = useParams();
    const { getBoard } = actions;
    const { thisBoard } = state;
    

    useEffect(() => {
        getBoard(id)
    } , [id])

    if(thisBoard._id) return (
        <div>
            <h1>Board</h1>
            {JSON.stringify(thisBoard)}
        </div>
    )
})

export default Board