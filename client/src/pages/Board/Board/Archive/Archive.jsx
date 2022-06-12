import React, { useState, useEffect } from 'react';
import Button from '../../../../components/buttons/BlueLink';
import { Restore, Delete, Title, From, Options, Elements, Element, Content, ArchiveWrapper, Widget, Error} from './styled';

const Archive = ({actions, cards, lists, activity}) => {

    const { deleteList, toggleListStatus, deleteCard, toggleCardStatus, getActivity } = actions;

    const [isOpen, setIsOpen] = useState(false);
    const [selectArchive, setSelectArchive] = useState('');

    let selected = selectArchive==='Cards' ? cards : lists;
    switch (selectArchive) {
        case 'Cards':
            selected = cards;
            break;
        case 'Lists':
            selected = lists;
            break;
        case 'Activity':
            selected = activity;
            break;
        default:
            selected = [];
            break;
    }

    useEffect(() => {
        getActivity()
    }, [])

    const handleDelete = (e) => {
        if(e.from) deleteCard(e.from._id, e._id);
        else deleteList(e._id);
    }

    const handleRestore = (e) => {
        if(e.from) toggleCardStatus(e.from._id, e._id);
        else toggleListStatus(e._id);
    }

    return (
        <ArchiveWrapper open={isOpen}>
            <Widget onClick={()=>setIsOpen(!isOpen)} open={isOpen}><span >{">"}</span></Widget>
            <Content open={isOpen}>
                <Title>Archive</Title>
                <Button onClick={()=>setSelectArchive('Activity')}>View Activity</Button>
                <Button onClick={()=>setSelectArchive('Lists')}>View Lists</Button>
                <Button onClick={()=>setSelectArchive('Cards')}>View Cards</Button>
                {selected.length?<Title>{selectArchive}</Title>:null}
                <Elements>
                    {selectArchive==='Activity'?
                        activity.map((e,i)=>
                            <Element key={i}>
                                <From>{e.text}</From>
                                <From>{e.date.split('T').join(', ').replaceAll('Z','')}</From>
                            </Element>
                        )
                    :selected.length?selected.map((e, i)=>
                            <Element key={i}>
                                <Title>
                                    {e.title}
                                    {e.from&&<From>, from list {e.from.title}{lists.find(list=>list._id===e.from._id)&&' (archived)'}</From>}
                                    {e.cards?.length?<From>, contains {e.cards.length} cards</From>:null}
                                </Title>
                                
                                <Options>
                                    <Restore onClick={()=>handleRestore(e)}>
                                        Restore
                                    </Restore>
                                    <Delete onClick={()=>handleDelete(e)}>
                                        Delete
                                    </Delete>
                                </Options>
                            </Element>
                        )
                    :(selectArchive&&<Error>No archived {selectArchive.toLowerCase()}</Error>)}
                </Elements>
            </Content>
        </ArchiveWrapper>
    )
}

export default Archive