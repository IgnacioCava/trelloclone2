import styled from "styled-components";
import Close from '../../../components/buttons/Close';
import ListTitle from './ListTitle';

const List = ({list, actions}) => {
    const { deleteList, renameList } = actions;

    return (
        <ListContainer>
            <SupDiv>
                <ListTitle title={list.title} rename={(title)=>renameList(list._id, title)}/>
            </SupDiv>
            {list._id}
            {list.cards.map((card, i)=>
                    <div key={i}>
                        <button onClick={()=>{}}>x</button>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
            )}
            <Close onClick={()=>deleteList(list._id)}/>
        </ListContainer>
    )
}

const SupDiv = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    *{margin: 0}
    h3{
        font-weight: normal;
        font-size: 1.2rem;
        text-align: start;
        word-break: break-all;
    }
`

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    width: 272px;
    height: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 5px;
    margin: 0 4px;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    padding:10px;
    box-sizing: border-box;
`

export default List