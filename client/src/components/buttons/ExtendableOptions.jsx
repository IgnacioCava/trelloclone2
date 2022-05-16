import { useState, useRef } from 'react';
import Close from './Close'
import { ellipsisIcon } from '../../assets';
import { Text, Safe, Archive, Delete, Extendable, Overcast, Ellipsis } from './styled';

const ExtendableOptions = ({archive, erase, elementName}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [isSafeOpen, setIsSafeOpen] = useState(false);
    const modal = useRef(null);

    const OpenOptions = (el) => {
        document.addEventListener('click', (e)=>{
            if(!modal.current?.contains(e.target)){
                setIsOpen(false);
                setIsSafeOpen(false);
            }
        });
        setIsOpen(true)
    };
    const CloseOptions = (el) => {
        document.removeEventListener('click', (e)=>{
            if(!modal.current?.contains(e.target)){
                setIsOpen(false);
                setIsSafeOpen(false);
            }
        })
        setIsOpen(false);
    }
    
    const handleErase = () => {
        erase()
        setIsOpen(false);
    }

    const handleArchive = () => {
        archive()
        setIsOpen(false);
    }

    return (
        <Extendable ref={modal}>
                <Ellipsis src={ellipsisIcon} alt='ellipsisIcon'  onClick={OpenOptions}/>
                {isOpen ? (
                    <Overcast >
                        <Close onClick={CloseOptions}/>
                        {archive&&<Archive onClick={handleArchive}>Archive</Archive>}
                        {erase&&<Delete onClick={()=>setIsSafeOpen(true)}>Delete</Delete>}
                        
                        {isSafeOpen?
                        <Safe>
                            <Text>
                                Are you sure you want to delete this{elementName?' '+elementName:''}?
                                <div>                
                                    <Delete onClick={handleErase}>
                                        Yes
                                    </Delete>
                                    <Archive onClick={()=>setIsSafeOpen(false)}>
                                        No
                                    </Archive>                  
                                </div>
                            </Text>
                        </Safe>:null}
                        
                    </Overcast>
                ) : null}
        </Extendable>
    )
}

export default ExtendableOptions;


