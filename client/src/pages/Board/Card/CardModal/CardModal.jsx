import styled from "styled-components";
import Close from "../../../../components/buttons/Close";
import CardTitle from "../CardTitle/CardTitle";
import CreateElement from "../.././Board/CreateElement/CreateElement";
import textIcon from '../../../../assets/textIcon.png';
import checkIcon from '../../../../assets/checkIcon.png';
import plus from '../../../../assets/plus.png';
import eyeIcon from '../../../../assets/eyeIcon.png';
import userIcon from '../../../../assets/userIcon.png';
import labelIcon from '../../../../assets/labelIcon.png';
import ModalOption from "./Components/ModalOption";
import { useRef, useState } from "react";


const CardModal = ({close, list, card, actions, members, user}) => {

    const { editCard, toggleCardMember } = actions;
    const modal = useRef(null);

    const [isOpen, setOpen] = useState(false);

    const handleToggleMembers = (formData) => toggleCardMember(formData, card._id, list._id)
    const handleEditCard = (formData) => editCard(formData, card._id, list._id)

    return (
        <Modal ref={modal} onClick={(e)=>e.target===modal.current? close() : null}>
            <ModalContent>
                <From>
                    <This>
                        <Title>
                            <CardTitle title={card.title} rename={(title)=>editCard(list._id, card._id, {title})}/>
                        </Title>
                        <Close onClick={close}/>
                    </This>

                    <FromList>
                        from list <Underline>{list.title}</Underline> 
                        {card.members.findIndex(e=>e.user===user.id)>-1?<img src={eyeIcon} alt='eye' title='You are a member of this card'/>:null}
                    </FromList>
                </From>

                <ModalBody>
                    <ModalData>
                        <TopData>
                        <Data>
                            <h5>Members</h5>
                            <Icons>
                                {members.map((member, i) => card.members.findIndex(e=>e.user===member.user)>-1?
                                    <MemberIcon key={i} color={member.color} title={member.username}> {member.username.charAt(0)} </MemberIcon>
                                    :null
                                )}
                                <img src={plus} alt='plus' onClick={()=>setOpen(!isOpen)}/>
                            </Icons>
                                <div>
                                    {isOpen?<ModalOption type='Members' icon={userIcon} list={list} card={card} members={members} onClick={handleToggleMembers} open={true} outerOpen={setOpen}/>:null}
                                </div>
                        </Data>
                        <Data>
                            <h5>Label</h5>
                            <Label color={card.label.color}>

                            {card.label.text}
                            </Label>
                        </Data>
                        </TopData>
                        <Description>
                            <TitleIcon>
                                <img src={textIcon} alt='text'/>
                                <h3>Description</h3>
                            </TitleIcon>
                            <CreateElement create={(description)=>editCard(list._id, card._id, {description})} name='description' area startingValue={card.description}/>
                        </Description>
                    </ModalData>

                    <ModalOptions>
                        <span>Add to the card</span>
                        <ModalOption type='Members' icon={userIcon} list={list} card={card} members={members} onClick={handleToggleMembers}/>
                        <ModalOption type='Checklist' icon={checkIcon} card={card} members={members}/>
                        <ModalOption type='Labels' icon={labelIcon} card={card} members={members} onClick={handleEditCard}/>
                    </ModalOptions>
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}

const TopData = styled.div`
    display: flex;
    gap: 10px;
    
`

const Label = styled.div`
    background-color: ${props=>props.color};
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
    user-select: none;
    :hover{
        filter: brightness(1.2);
    }
`

const Icons = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    gap:5px;
    user-select: none;
    img{
        height: 16px;
        width: 16px;
        padding:8px;
        object-position: center;
        background-color: rgba(9, 30, 66, 0.04);
        border-radius: 50%;
        :hover{
            background-color: rgba(33, 33, 33, 0.121);
            cursor: pointer;
        }
    }
`

const Data = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap:5px;
    h5{
        margin:0;
        color: grey;
        font-size: normal;
        font-weight: 600;
    }
`

const MemberIcon = styled.span`
    height: 32px;
    width: 32px;
    line-height: 32px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    :hover{
        filter: brightness(1.05);
    }
`

const ModalData = styled.div`
    display: flex;
    flex-direction: column;
    gap:20px;
    width: 75%;
`

const ModalOptions = styled.div`
    display: flex;
    flex-direction: column;
    width: 25%;
    gap:8px;
    >span{
        font-size: 12px;
        font-weight: 600;
        color: #5e6c84;
        text-align: start;
    }
`

const ModalBody = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 15px;
`

const From = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`

const TitleIcon = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    gap:14px;
    img{
        height: 15px;
    }
    *{
        font-size: 16px;
        font-weight: 600;
        margin:0;
        color:#172b4d;
    }
`

const Description = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap:10px;
    >div{
        width: 100%;
    }
`

const FromList = styled.span`
    display: flex;
    gap:5px;
    align-items: center;
    text-align: start;
    width: 100%;
    padding:5px;
    box-sizing: border-box;
    margin-left: 5px;
    color:grey;
    img{
        height: 14px;
    }
`

const Underline = styled.span`
    text-decoration: underline;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    width: 90%;
    div{
        width: 100%;
    }
    h3{
        font-size: 1.5rem;
    }
`

const This = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 100%;
`

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 768px;
    max-width: 90%;
    height: 100%;
    border: 1px solid #ccc;
    background-color: #f4f5f7;
    padding: 1rem;
    border-radius: 2px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    gap:15px;
`

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.512);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1;
    overflow: auto;
    padding: 0;
    margin: 0;
    border: 0;
    border-radius: 0;
    box-shadow: 0 0 0 0;
    background-clip: border-box;
    transition: all 0.3s ease-in-out;
`


export default CardModal;
