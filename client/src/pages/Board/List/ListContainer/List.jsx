import Close from '../../../../components/buttons/Close';
import ListTitle from '../ListTitle/ListTitle';
import CreateElement from "../../Board/CreateElement/CreateElement";
import { CreateCard, SupDiv, ListContainer } from "./styled";
import Card from '../../Card/CardContainer/Card';
import ExtendableOptions from '../../../../components/buttons/ExtendableOptions';

const List = ({list, actions, members, user}) => {
    const { deleteList, renameList, addCard, toggleListStatus } = actions;

    return (
        <ListContainer>
            <SupDiv>
                <ListTitle title={list.title} rename={(title)=>renameList(list._id, title)}/>
                <ExtendableOptions archive={()=>toggleListStatus(list._id)} erase={()=>deleteList(list._id)}/>
            </SupDiv>

            {list.cards.filter(card=>!card.archived).map((card, i)=>
                <Card key={i} actions={actions} list={list} card={card} members={members} user={user}/>
            )}

            <CreateCard>
                <CreateElement create={(title)=>addCard(list._id, title)} name='card title' required/>
            </CreateCard>
        </ListContainer>
    )
}

export default List