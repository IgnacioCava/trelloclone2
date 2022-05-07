import styled from "styled-components";
import Close from "../../../../../components/buttons/Close";
import { useState } from "react";
import Button from "../../../../../components/buttons/BlueLink";

const ModalOption = ({type, icon, onClick, card, members, list, open, outerOpen}) => {

    const [isOpen, setOpen] = useState(open||false);

    const [colors, setColors] = useState(['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'grey', 'black', 'brown', 'indigo', 'lime', 'magenta', 'olive', 'teal', 'violet', 'cyan']);
    const [chosenColor, setChosenColor] = useState(card.label);

    const handleColor = (e) => setChosenColor({...chosenColor, ...e})

    return (
        <Option >
            {!isOpen?
            <Info onClick={()=>setOpen(true)}>
                <img src={icon} alt={type}/>
                {type}
            </Info>
            :type==='Members'?
                <ChoiceModal>
                    <Title>
                        <h5>Members</h5>
                        <Close onClick={()=>open?outerOpen(false):setOpen(false)}/>
                    </Title>
                    <Icons>
                        {members.map((member, i) => (
                            <CheckIcon key={i}>
                                <MemberIcon color={member.color} title={member.username}> 
                                    {member.username.charAt(0)}
                                </MemberIcon>
                                <input type='checkbox' checked={card.members.findIndex(e=>e.user===member.user)>-1} onChange={()=>onClick(member)}/>
                            </CheckIcon>
                        ))}
                    </Icons>
                </ChoiceModal>
            :type==='Labels'?
            <ChoiceModal>
                <Title>
                    <h5>Labels</h5>
                    <Close onClick={()=>open?outerOpen(false):setOpen(false)}/>
                </Title>
                <Colors>
                    {colors.map((color, i) => <Color key={i} color={color} onClick={()=>handleColor({color})} style={{borderRadius:chosenColor.color===color?'50%':'10%'}}/>)}
                </Colors>
                <input type='text' placeholder='Label text' value={chosenColor.text} onChange={(e)=>handleColor({text:e.target.value})}/>
                <Buttons>
                    <Button onClick={()=>onClick({label:chosenColor})}>Add label</Button>
                    <Button onClick={()=>{
                        handleColor({color:'',text:''})
                        onClick({label:{color:'',text:''}})
                        }}>Remove label</Button>
                </Buttons>
            </ChoiceModal>
            :type==='Checklist'?
            <ChoiceModal>
                <Title>
                    <h5>Checklist</h5>
                    <Close onClick={()=>open?outerOpen(false):setOpen(false)}/>
                </Title>
                <input type='text' placeholder='Checklist title' value={chosenColor.text} onChange={(e)=>handleColor({text:e.target.value})}/>
                <Button onClick={()=>alert('Placeholder')}>Add checklist</Button>
            </ChoiceModal>
            :null}
        </Option>
    )
}

const Buttons = styled.div`
    display: flex;
    gap:10px;
    div{
        display:flex;
        font-size:14px;
        margin: 0;
        width: 50%;
        border-radius: 3px;
    }
`

const Color = styled.div`
    background-color: ${props => props.color};
    width: 25px;
    height: 25px;
    border-radius: 10%;
`


const Colors = styled.span`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    gap:5px;
    justify-content: flex-start;
`

const Info = styled.div`
    display: flex;
    padding: 0 12px;
    align-items: center;
    gap: 15px;
    width: 100%;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    line-height: 1;
    width: 100%;
    gap:10px;
    justify-content: space-between;
    img{
        height: unset !important;
    }
`

const CheckIcon = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
    gap:15px;
    input{
        height: 20px;
        width: 20px;
    }
`

const Option = styled.div`
    display: flex;
    flex-direction: row;
    height: fit-content;
    line-height: 32px;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    font-size: 14px;
    color: rgb(23, 43, 77);
    background-color: #091e420a;
    gap:8px;
    box-sizing: border-box;
    border-radius: 3px;
    img{
        height: 16px;
    }
    :hover{
        background-color: rgba(0, 0, 0, 0.08);
    }
`

const Icons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    align-items: center;
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

const ChoiceModal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    left:0;
    top:0;
    width: 100%;
    gap:5px;
    background-color: white;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    padding:10px;
    >div{
        width: 100%;
        margin:0;
        font-size: 14px;
    }
    h5{
        margin:0;
        color: grey;
        font-size: normal;
        font-weight: 600;
    }
    >input{
        outline: none;
        border: 1px solid grey;
        padding: 10px 10px;
        border-radius: 3px;
        box-sizing: border-box;
        width: 100%;
        transition: 0.2s;
        :focus {
            border: 1px solid #2a73e2;
        }
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


export default ModalOption;
