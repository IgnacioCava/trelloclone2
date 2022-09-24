import React, { useState } from "react";
import MemberIcon from "../../../../components/icons/MemberIcon";
import { UserData, Email, Search, User, Found, Input } from './styled'

const AutoCompleteInput = ({members, actions}) => {
    const { findUsers, addMember } = actions;

    const [foundUsers, setFound] = useState([]);
    
    const handleSearch = async (e) => {
        const search = e.target.value;
        setFound(foundUsers.filter(e => e.email.includes(search)))
        const found = await findUsers(search||'*');
        setFound(found.length? found.filter(e=>!members.map(member=>member.user).includes(e._id)) : []);
    }

    const handleAdd = (user) => {
        addMember(user);
        setFound([]);
    }

    return (
        <Search>
            <Input type="text" placeholder="Add members by email" onChange={handleSearch} onBlur={(e)=>{e.target.value=''}}/>
                {foundUsers.length?
                    <Found>
                        {foundUsers.map((user, i)=>
                            <User key={i} onClick={()=>handleAdd(user)}>
                                <MemberIcon member={{...user, color: 'lightblue'}}/>
                                <UserData>
                                    <span>{user.username}</span>
                                    <Email>{user.email}</Email>
                                </UserData>
                            </User>
                        )} 
                    </Found>:null
                }
        </Search>
    )
}

export default AutoCompleteInput;