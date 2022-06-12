import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { withBoard } from "../../../../store/contexts/withBoard";
import BoardTitle from "../BoardTitle/BoardTitle";
import List from "../../List/ListContainer/List";
import CreateElement from "../CreateElement/CreateElement";
import { BoardWrapper, Lists, Members, All, Background, BoardOptions } from "./styled";
import MemberIcon from "../../../../components/icons/MemberIcon";
import AutoCompleteInput from "../AutoCompleteInput/AutoCompleteInput";
import Archive from "../Archive/Archive";
import CardModal from "../../Card/CardModal/CardModal";

import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

const Board = withBoard(({state, actions}) => {
    const { id } = useParams();
    const { getBoard, renameBoard, addList, getUser, deleteMember, changeBoardBackground, sortBoardLists } = actions;
    const { thisBoard, user } = state;
    const [lists, title, members, allCards, activity, backgroundURL] = [ thisBoard?.lists, thisBoard?.title, thisBoard?.members, thisBoard?.allCards, thisBoard?.activity, thisBoard?.backgroundURL];

    useEffect(() => {
        getBoard(id)
        getUser()
    } , [id])

    const [selectedCard, setCard] = useState(null);

    const thisCard = allCards.find(e=>e._id===selectedCard)

    const memberList = useMemo(()=>{
        return members?.map(member=>{return {...member, color: `hsla(${~~(360 * Math.random())},70%,70%,0.8)`}});
    }, [members])

    const SortableList = SortableElement(({list, index}) => (
        <List key={list._id} index={index} actions={actions} list={list} members={memberList} user={user} select={(card)=>setCard(card)}/>
    ))

    const SortableLists = SortableContainer(({lists}) => {
        return (
            <Lists>
                {lists.map((list, index)=>
                    <SortableList 
                        key={list._id} 
                        list={list} 
                        index={index} 
                    />
                )}
            </Lists>
        )
    })

    const onSortEnd = ({oldIndex, newIndex}) => {
        const newLists = arrayMoveImmutable(lists, oldIndex, newIndex);
        sortBoardLists(newLists)
    }

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
                    {lists && <SortableLists lists={lists} onSortEnd={onSortEnd} axis='x' useDragHandle={true}/> }

                    <div>
                        <CreateElement create={addList} name='list title' required/>
                    </div>
                </Lists>
            </BoardWrapper>
            <Archive actions={actions} cards={allCards.filter(e=>e.archived)} lists={lists.filter(e=>e.archived)} activity={activity}/>

            {selectedCard&&<CardModal card={thisCard} list={lists.find(e=>e._id===thisCard.from._id)} close={()=>setCard(null)} actions={actions} members={memberList} user={user}/>}
        </All>
    )
    else return null
})

export default Board