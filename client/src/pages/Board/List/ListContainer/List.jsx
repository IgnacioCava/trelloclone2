import Close from '../../../../components/buttons/Close';
import ListTitle from '../ListTitle/ListTitle';
import CreateElement from "../../Board/CreateElement/CreateElement";
import { CreateCard, SupDiv, ListContainer } from "./styled";
import Card from '../../Card/CardContainer/Card';
import { useMemo } from 'react';

const List = ({list, actions, members, user}) => {
    const { deleteList, renameList, addCard } = actions;
    

    return (
        <ListContainer>

            <SupDiv>
                <ListTitle title={list.title} rename={(title)=>renameList(list._id, title)}/>
                <Close onClick={()=>deleteList(list._id)}/>
            </SupDiv>


            {list.cards.map((card, i)=>
                <Card key={i} actions={actions} list={list} card={card} members={members} user={user}/>
            )}

            <CreateCard>
                <CreateElement create={(title)=>addCard(list._id, title)} name='card title'/>
            </CreateCard>

        </ListContainer>
    )
}

export default List