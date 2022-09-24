import { useContext } from "react";
import Close from "../../../../components/buttons/Close";
import CardTitle from "../CardTitle/CardTitle";
import CreateElement from "../.././Board/CreateElement/CreateElement";
import ModalOption from "./Components/ModalOption/ModalOption";
import React, { useRef, useState } from "react";
import ChecklistComponent from "./Components/Checklist/Checklist";
import Section from "./Components/Section/Section"
import MemberIcon from "../../../../components/icons/MemberIcon";
import { textIcon, checkIcon, plus, eyeIcon, userIcon, labelIcon, cardIcon } from '../../../../assets';
import { ScrollArea, TopData, Label, Icons, Data, ModalData, ModalOptions, ModalBody, From, FromList, Underline, Title, ModalContent, Modal, Positioner} from "./styled";
import { BoardContext } from "../../../../store/contexts/BoardStore";

const CardModal = ({close, list, card, members, user}) => {

    const { editCard, toggleCardMember, addChecklist} = useContext(BoardContext).dispatchedActions
    const modal = useRef(null);

    const [isOpen, setOpen] = useState(false);

    const handleToggleMembers = formData => toggleCardMember(formData, card._id, list._id)
    const handleEditCard = formData => editCard(formData, card._id, list._id)
    const handleAddChecklist = formData => addChecklist(formData, card._id, list._id)

    return (
        <Modal ref={modal} onClick={(e)=>e.target===modal.current? close() : null}>
            <ModalContent>
                <Section icon={cardIcon}>
                    <Positioner>
                    <From>
                        <Title>
                            <CardTitle title={card.title} rename={(title)=>handleEditCard({title})}/>
                        </Title>

                        <FromList>
                            from list <Underline>{list.title}</Underline> 
                            {card.members.findIndex(e=>e.user===user.id)>-1?<img src={eyeIcon} alt='eye' title='You are a member of this card'/>:null}
                        </FromList>
                    </From>
                    <Close onClick={close}/>
                    </Positioner>
                </Section>

                <ModalBody>
                    <ModalData>
                        <TopData>
                            <Data>
                                <h5>Members</h5>
                                <Icons>
                                    {members.map((member, i) => card.members.findIndex(e=>e.user===member.user)>-1?
                                        <MemberIcon key={i} member={member}/>
                                        :null
                                    )}
                                    <img src={plus} alt='plus' onClick={()=>setOpen(!isOpen)}/>
                                </Icons>
                                    <div>
                                        {isOpen?<ModalOption type='Members' icon={userIcon} card={card} members={members} onClick={handleToggleMembers} open={true} outerOpen={setOpen}/>:null}
                                    </div>
                            </Data>
                            {card.label&&Object.values(card.label).filter(e=>e).length?<Data>
                                <h5>Label</h5>
                                <Label color={card.label?.color}>
                                    {card.label?.text}
                                </Label>
                            </Data>:null}
                        </TopData>

                        <ScrollArea>
                            <Section title='Description' icon={textIcon}>
                                <CreateElement create={(name)=>handleEditCard({description:name})} name='description' area startingValue={card.description}/>
                            </Section>

                            <Section title='Checklists' icon={checkIcon}>
                                {card.checklists.map((checklist, i) => 
                                    <ChecklistComponent key={i} listId={list._id} cardId={card._id} checklist={checklist}/>
                                )}
                                <CreateElement create={(title)=>handleAddChecklist(title)} name='checklist' required/>
                            </Section>
                        </ScrollArea>
                    </ModalData>

                    <ModalOptions>
                        <span>Add to the card</span>
                        <div>
                            <ModalOption type='Members' icon={userIcon} list={list} card={card} members={members} onClick={handleToggleMembers}/>
                            <ModalOption type='Checklist' icon={checkIcon} card={card} members={members} onClick={handleAddChecklist}/>
                            <ModalOption type='Labels' icon={labelIcon} card={card} members={members} onClick={handleEditCard}/>
                        </div>
                    </ModalOptions>
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}

export default CardModal;