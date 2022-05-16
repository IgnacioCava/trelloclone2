import styled from 'styled-components';
import CardTitle from '../CardTitle/CardTitle';
import Close from '../../../../components/buttons/Close';

const Card = ({card, list, actions}) => {
    const { deleteCard, renameCard } = actions;

    return (
        <CardHolder>
            <Title>
                <CardTitle title={card.title} rename={(title)=>renameCard(list._id, card._id, title)}/>
                <Close onClick={()=>deleteCard(list._id, card._id)}/>
            </Title>
            <Divisor/>
            <p>
                id: {card._id}
            </p>
        </CardHolder>
    )
}

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