import React, { useState } from "react";
import Close from "../../../../../../components/buttons/Close";
import Button from "../../../../../../components/buttons/BlueLink";
import MemberIcon from "../../../../../../components/icons/MemberIcon";
import { Buttons, Color, Colors, Info, Title, CheckIcon, Option, Icons, ChoiceModal} from "./styled";

const ModalOption = ({type, icon, onClick, card, members, open, outerOpen}) => {

    const [isOpen, setOpen] = useState(open||false);

    const [colors] = useState(['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'grey', 'black', 'brown', 'indigo', 'lime', 'magenta', 'olive', 'teal', 'violet', 'cyan']);
    
    const [chosenColor, setChosenColor] = useState(card.label||{});
    const handleColor = (e) => setChosenColor({...chosenColor, ...e})

    const [checklistTitle, setChecklistTitle] = useState('');
    const handleChecklistTitle = (e) => setChecklistTitle(e.target.value);

    return (
        <Option>
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
                                <MemberIcon member={member}/>
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
                    {colors.map((color, i) => <Color key={i} color={color} chosenColor={chosenColor.color===color} onClick={()=>handleColor({color})}/>)}
                    <Color><Close onClick={()=>handleColor({color:''})}/></Color>
                </Colors>
                <input type='text' placeholder='Label text' value={chosenColor.text} onChange={(e)=>handleColor({text:e.target.value})}/>
                <Buttons>
                    <Button onClick={()=>onClick({label:chosenColor})} alternate={(card.label?.text!==chosenColor.text||card.label?.color!==chosenColor.color)&&'green'}>{card.label?.text||card.label?.color?'Edit':'Add'} label</Button>
                    <Button disabled={!card.label?.text&&!card.label?.color} onClick={()=>{
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
                <input type='text' placeholder='Checklist title' value={checklistTitle} onChange={handleChecklistTitle}/>
                <Button onClick={()=>onClick(checklistTitle)}>Add checklist</Button>
            </ChoiceModal>
            :null}
        </Option>
    )
}

export default ModalOption;
