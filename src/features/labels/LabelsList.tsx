import styled from 'styled-components';
import { useSelector } from "react-redux";
import { selectLabels } from "./labelsSlice";
import { useEffect } from 'react';
import { Label } from './Label';
import { CreateLabel } from './CreateLabel';
import { NavLinkStyled } from './styles';

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
    <ul>
      <CreateLabel /><br />
      <Item>
        <NavLinkStyled to={`/`} >
          <span style={{flexGrow: 1}}>Notes</span>
        </NavLinkStyled>
      </Item>
      <Item>
        <NavLinkStyled to={`/archived`} >
          <span style={{flexGrow: 1}}>Trash</span>
        </NavLinkStyled>
      </Item>
      { labelsList }
    </ul>
  );
}

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
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  &:hover {
    background-color: rgba(150, 150, 150, 0.1);
  }
`;