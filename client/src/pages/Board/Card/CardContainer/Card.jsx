import { useState, useRef, useMemo } from 'react';
import Close from '../../../../components/buttons/Close';
import CardTitle from '../CardTitle/CardTitle';
import CardModal from '../CardModal/CardModal';
import { textIcon, eyeIcon, checkIconWhite, checkIcon } from '../../../../assets';
import { Completed, WithLabel, Label, MemberIcon, CardIcons, MemberIcons, Body, Title, CardHolder} from './styled'

const Card = ({card, list, actions, members, user}) => {
    const { deleteCard, editCard } = actions;

    const [openModal, setOpen] = useState(false);
    const modal = useRef(null);

    const completedItems = useMemo(()=>card.checklists.map(e=>e.items).map(e=>e.map(e=>e.completed)).flat().map(e=>e===true?1:0).reduce((a,b)=>a+b,0), [card.checklists]);
    const allItems = useMemo(()=>card.checklists.map(e=>e.items).flat().length, [card.checklists]);

    return (
        <CardHolder >
            <Title ref={modal} onClick={(e)=>e.target===modal.current?setOpen(true):null}>
                <WithLabel>
                    {card.label?.color||card.label?.text?
                    <Label onClick={()=>setOpen(true)} color={card.label?.color}>{card.label?.text}</Label>:null}
                    <CardTitle title={card.title} rename={(title)=>editCard({title}, card._id, list._id)}/>
                </WithLabel>
                <Close onClick={()=>deleteCard(list._id, card._id)}/>
            </Title>

            <Body onClick={()=>setOpen(true)}>
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
                    <MemberIcon key={i} color={member.color} title={member.username}> {member.username.charAt(0)} </MemberIcon>:null)}
                </MemberIcons>
            </Body>
            {openModal?<CardModal card={card} list={list} close={()=>setOpen(false)} actions={actions} members={members} user={user}/>:null}
        </CardHolder>
    )
}

export default Card