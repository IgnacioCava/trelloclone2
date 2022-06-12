import React, { useState, useEffect, useCallback } from 'react';
import ListTitle from '../ListTitle/ListTitle';
import CreateElement from "../../Board/CreateElement/CreateElement";
import { CreateCard, SupDiv, ListContainer, Cards } from "./styled";

import DnDHandler from '../../../../components/buttons/DnDHandler';
import Card from '../../Card/CardContainer/Card';
import ExtendableOptions from '../../../../components/buttons/ExtendableOptions';

import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

const List = ({list, actions, members, user, select}) => {
    const { deleteList, renameList, addCard, toggleListStatus, sortListCards } = actions;
 
    const SortableCard = SortableElement(({card, index}) => (
        <Card key={card._id} index={index} actions={actions} list={list} card={card} members={members} user={user} select={select}/>
    ))

    const SortableCards = SortableContainer(({cards}) => {
        return (
            <Cards>
                {cards.map((card, index)=>
                    <SortableCard 
                        key={card._id} 
                        card={card} 
                        index={index} 
                    />
                )}
            </Cards>
        )
    })

    const onSortEnd = ({oldIndex, newIndex}) => {
        const newCards = arrayMoveImmutable(list.cards, oldIndex, newIndex);
        sortListCards(list._id, newCards)
    }

    if(!list.archived)
    return (
        <ListContainer>
            <SupDiv>
                <DnDHandler direction='x'/>
                <ListTitle title={list.title} rename={(title)=>renameList(list._id, title)}/>
                <ExtendableOptions archive={()=>toggleListStatus(list._id)} erase={()=>deleteList(list._id)}/>
            </SupDiv>

            {list.cards && <SortableCards cards={list.cards} onSortEnd={onSortEnd} axis='y' useDragHandle={true}/> }

            <CreateCard>
                <CreateElement create={(title)=>addCard(list._id, title)} name='card title' required/>
            </CreateCard>
        </ListContainer>
    )
    else return <div></div>
}

export default List