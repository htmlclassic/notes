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
          Notes
        </NavLinkStyled>
      </Item>
      <Item>
        <NavLinkStyled to={`/archived`} >
          Trash
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
  border: 2px solid transparent;
  transition: all 0.1s;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;

  & .active {
    text-decoration: underline;
  }

  &:hover {
    background-color: rgba(189, 189, 189, 0.2);
  }
`;