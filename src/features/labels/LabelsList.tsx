import styled from 'styled-components';
import { useSelector } from "react-redux";
import { selectLabels } from "./labelsSlice";
import { useEffect } from 'react';
import { Label } from './Label';
import { CreateLabel } from './CreateLabel';
import { NavLinkStyled } from './styles';
import { SIDEBAR_PADDING } from '../../styles/globalVars';

import { Routes } from "../../index";

import { ReactComponent as TrashIcon } from './assets/trash-icon.svg';
import { ReactComponent as AllIcon } from './assets/all-icon.svg';

const ICON_SIZE = {
  width: 17,
  height: 17,
};

export function LabelsList() {
  const labels = useSelector(selectLabels);

  useEffect(() => {
    localStorage.setItem('labels', JSON.stringify(labels));
  }, [labels]);

  const labelsList = labels.map(label => 
    <Item key={label.id}>
      <Label label={label} />
    </Item>
  );

  return (
    <>
      <CreateLabel />
      <List>
        <Item>
          <NavLinkStyled to={Routes.root} >
            <Div><AllIcon style={ICON_SIZE} /></Div>
            <span style={{flexGrow: 1, textAlign: 'center'}}>All notes</span>
          </NavLinkStyled>
        </Item>
        <Item style={{marginBottom: 10}}>
          <NavLinkStyled to={Routes.trash} >
            <Div><TrashIcon style={ICON_SIZE} /></Div>
            <span style={{flexGrow: 1, textAlign: 'center'}}>Trash</span>
          </NavLinkStyled>
        </Item>
        { labelsList }
      </List>
    </>
  );
}

const Div = styled.div`
  display: flex;
  position: absolute;
`;

const List = styled.ul`
  overflow: auto;
  padding: ${SIDEBAR_PADDING};
`;

const Item = styled.li`
  position: relative;
  cursor: pointer;
  height: 50px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: all 0.1s;

  display: flex;
  align-items: center;
  justify-content: center;

  & .active {
    border: 1px solid rgba(0, 0, 0, 0.3);
  }

  &:hover {
    background-color: rgba(150, 150, 150, 0.1);
  }
`;