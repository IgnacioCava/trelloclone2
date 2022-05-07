import styled from 'styled-components';
import CardTitle from '../CardTitle/CardTitle';
import Close from '../../../../components/buttons/Close';
import CardModal from '../CardModal/CardModal';
import { useState, useEffect } from 'react';
import textIcon from '../../../../assets/textIcon.png';
import eyeIcon from '../../../../assets/eyeIcon.png';
import checkIcon from '../../../../assets/checkIcon.png';

const Card = ({card, list, actions, members, user}) => {
    const { deleteCard, editCard } = actions;

    const [openModal, setOpen] = useState(false);

    return (
        <CardHolder>
            <Title>
                <CardTitle title={card.title} rename={(title)=>editCard(list._id, card._id, {title})}/>
                <Close onClick={()=>deleteCard(list._id, card._id)}/>
            </Title>

            <Body onClick={()=>setOpen(true)}>
                <CardIcons>
                    {card.members.findIndex(e=>e.user===user.id)>-1?
                    <img title='You are a member of this card' src={eyeIcon} alt='textIcon'/> : null}
                    {card.description ?
                    <img title='This card constains a description' src={textIcon} alt='textIcon'/> : null}
                    {!card.checklist.lenght ?
                    <img title='Checklist elements' src={checkIcon} alt='textIcon'/> : null}
                </CardIcons>
                <MemberIcons>
                    {card.members.map((member, i)=> <MemberIcon key={i} color={member.color} title={member.username}> {member.username.charAt(0)} </MemberIcon>)}
                </MemberIcons>
            </Body>
            {openModal?<CardModal card={card} list={list} close={()=>setOpen(false)} actions={actions} members={members} user={user}/>:null}
        </CardHolder>
    )
}

const MemberIcon = styled.span`
    height: 28px;
    width: 28px;
    line-height: 28px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    user-select: none;
    :hover{
        filter: brightness(1.05);
    }
`

const CardIcons = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap:14px;
    img{
        height: 13px;
    }
`

const MemberIcons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`


const Body = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 4px;
    box-sizing: border-box;
`

const Divisor = styled.hr`
    width: 100%;
    margin:0;
    border:0;
    height:1px;
    background-color: lightgrey;
`

const Title = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
`

const CardHolder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #ffffff;
    border-radius: 5px;
    padding:5px;
    gap:5px;
    box-sizing: border-box;
    box-shadow: 0px 1px 0px #ccc;
`

export default Card