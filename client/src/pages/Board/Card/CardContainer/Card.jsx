import React, { useRef, useMemo, useContext } from 'react';
import CardTitle from '../CardTitle/CardTitle';
import { textIcon, eyeIcon, checkIconWhite, checkIcon } from '../../../../assets';
import { Completed, WithLabel, Label, CardIcons, MemberIcons, Body, Title, CardHolder} from './styled'
import MemberIcon from '../../../../components/icons/MemberIcon';
import ExtendableOptions from '../../../../components/buttons/ExtendableOptions';
import DnDHandler from '../../../../components/buttons/DnDHandler';
import { BoardContext } from '../../../../store/contexts/BoardStore';

const Card = ({card, list, members, user, select}) => {
    
    const { deleteCard, editCard, toggleCardStatus } = useContext(BoardContext).dispatchedActions

    const modal = useRef(null);
    const completedItems = useMemo(()=>card.checklists.map(e=>e.items).map(e=>e.map(e=>e.completed)).flat().map(e=>e===true?1:0).reduce((a,b)=>a+b,0), [card.checklists]);
    const allItems = useMemo(()=>card.checklists.map(e=>e.items).flat().length, [card.checklists]);

    if(!card.archived)
    return (
        <CardHolder ref={modal} onClick={(e)=>e.target===modal.current?select(card._id):null}>
            <Title>
                <WithLabel>
                    {card.label?.color||card.label?.text?
                    <Label onClick={()=>select(card._id)} color={card.label?.color}>{card.label?.text}</Label>:null}
                    <CardTitle title={card.title} rename={(title)=>editCard({title}, card._id, list._id)}/>
                </WithLabel>
                <ExtendableOptions archive={()=>toggleCardStatus(list._id, card._id)} erase={()=>deleteCard(list._id, card._id)} elementName={'card'}/>
                <div><DnDHandler direction='y'/></div>
            </Title>

            <Body onClick={()=>select(card._id)}>
                <CardIcons>
                    {card.members.findIndex(e=>e.user===user.id)>-1?
                    <img title='You are a member of this card' src={eyeIcon} alt='textIcon'/> : null}
                    {card.description ?
                    <img title='This card contains a description' src={textIcon} alt='textIcon'/> : null}
                    {allItems?
                    <Completed status={completedItems===allItems} title={completedItems===allItems?'This card\'s checklists have been completed':'Checklists elements'}>
                        <img  src={completedItems===allItems?checkIconWhite:checkIcon} alt='textIcon'/>
                        <span>
                            {completedItems}/{allItems}
                        </span>
                    </Completed>:null}
                </CardIcons>
                <MemberIcons>
                    {members.map((member, i)=> card.members.findIndex(e=>e.user===member.user)>-1?
                    <MemberIcon key={i} member={member} diameter={28}/>:null)}
                </MemberIcons>
            </Body>
        </CardHolder>
    )
    else return <div></div>
}

export default Card