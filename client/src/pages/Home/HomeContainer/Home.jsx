import { useState, useEffect } from "react";
import { withBoard } from "../../../store/contexts/withBoard";
import { Link } from "react-router-dom";
import NewBoard from "../NewBoard/NewBoard";
import { HomeWrapper, Boards, BoardBox } from "./styled";
import FormInput from "../../../components/Inputs/FormInput";
import Button from "../../../components/buttons/BlueLink";
import styled from "styled-components";

const Home = withBoard(({state, actions}) =>{
    const { createBoard, getBoards, clear } = actions;
    const [ open, setOpen ] = useState(false);

    useEffect(() => {
        clear()
        getBoards()
    }, [])

    const [form, setForm] = useState({title:''})
    const handleChange = e => setForm({...form, title:e.target.value})

    return (
        <HomeWrapper>
            <h1>Boards</h1>

            <Line>
                <FormInput placeholder="Search by title" name='title' values={{form}} onChange={handleChange}/>
                <Button onClick={()=>setOpen(true)}>New Board</Button>
            </Line>

            <Boards>
                {state.boards.filter(e=>e.title.includes(form.title)).map((board, i)=>
                    <BoardBox key={i} width={24}><Link to={`/board/${board._id}`}><h1>{board.title}</h1></Link></BoardBox>
                )}
            </Boards>
            
            {open?<NewBoard close={()=>setOpen(false)} create={(e)=>createBoard(e)}/>:null}
        </HomeWrapper>
    );
})

const Line = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    width: 50%;
    min-width: 350px;
    *{
        width: 100%;
    }
`

export default Home;