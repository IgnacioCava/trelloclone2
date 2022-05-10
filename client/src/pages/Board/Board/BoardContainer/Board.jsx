import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { withBoard } from "../../../../store/contexts/withBoard";
import BoardTitle from "../BoardTitle/BoardTitle";
import List from "../../List/ListContainer/List";
import CreateElement from "../CreateElement/CreateElement";
import { BoardWrapper, Lists, Members, All, Background, BoardOptions } from "./styled";
import MemberIcon from "../../../../components/icons/MemberIcon";
import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";
import Archive from "../Archive/Archive";

const Board = withBoard(({state, actions}) => {
    const { id } = useParams();
    const { getBoard, renameBoard, addList, getUser, deleteMember, changeBoardBackground } = actions;
    const { thisBoard, user } = state;

    const [lists, title, members, allCards, activity, backgroundURL] = [ thisBoard?.lists, thisBoard?.title, thisBoard?.members, thisBoard?.allCards, thisBoard?.activity, thisBoard?.backgroundURL ];

    useEffect(() => {
        getBoard(id)
        getUser()
    } , [id])

    const [ back, setBack ] = useState('');

    const memberList = useMemo(()=>{
        return members?.map(member=>{return {...member, color: `hsla(${~~(360 * Math.random())},70%,70%,0.8)`}});
    }, [members])

    if(thisBoard._id) return (
        <All background={backgroundURL}>
            <BoardWrapper>
                <div>
                    <BoardOptions style={{display:'flex'}}>
                        <BoardTitle title={title} rename={(title)=>renameBoard(id, title)}/>
                        <Background>
                            <CreateElement create={(url)=>changeBoardBackground(id, url)} name='background' required/>
                        </Background>
                    </BoardOptions>
                    <Members>
                        {memberList?.map((member,i)=> <MemberIcon key={i} member={member} onClick={()=>user.id!==member.user?deleteMember(member):null}/> )}
                        <AutoCompleteInput actions={actions} members={members}/>
                    </Members>
                </div>
                <Lists>
                    {lists.filter(list=>!list.archived).map((list, i)=>{
                        return <List key={i} actions={actions} list={list} members={memberList} user={user}/>
                    })}
                    <div>
                        <CreateElement create={addList} name='list title' required/>
                    </div>
                </Lists>
            </BoardWrapper>
            <Archive actions={actions} cards={allCards.filter(e=>e.archived)} lists={lists.filter(e=>e.archived)} activity={activity}/>
        </All>
    )
})

export default Board