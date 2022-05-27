import { SortableHandle } from "react-sortable-hoc";
import React from 'react';
import { Handle } from "./styled";
import { arrows } from "../../assets";

const DnDHandler = SortableHandle(({direction}) => <Handle src={arrows} alt="Drag to move" title= "Drag to move" direction={direction}/>);

export default DnDHandler;
