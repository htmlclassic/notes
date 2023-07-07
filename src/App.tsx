import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";

import { nanoid } from '@reduxjs/toolkit';

import { useDispatch } from "react-redux";
import { createNote } from "./features/notes/notesSlice";
import { updateActiveNoteId } from "./features/activeNoteId/activeNoteIdSlice";
import { LabelsList } from "./features/labels/LabelsList";
import { NoteList } from "./features/notes/NoteList";
import { useNavigate, useParams } from "react-router-dom";
import { createLabel } from "./features/labels/labelsSlice";
import { RESERVED_ARCHIVED_NOTES_LABEL } from "./features/labels/labelsSlice";

console.log(RESERVED_ARCHIVED_NOTES_LABEL);

export default function App() {
  const { label } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddNote = () => {
    const id = nanoid();
                
    dispatch(createLabel(label));
    dispatch(createNote({ id, label }));
    dispatch(updateActiveNoteId(id));

    navigate(`/${label || ''}`);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <h1>Header</h1>
        </Header>
        <Sidebar>
          <ul>
            <Item disabled={label === RESERVED_ARCHIVED_NOTES_LABEL}>
              <AddNoteButtonStyled
                onClick={handleAddNote}
                disabled={label === RESERVED_ARCHIVED_NOTES_LABEL}
              >
                Add a note
              </AddNoteButtonStyled>
            </Item>
            <LabelsList />
          </ul>
        </Sidebar>
        <Main>
          <NoteList />
        </Main>
      </Container>
    </>
  );
}

interface Props {
  children: React.ReactNode
}

function Header({ children }: Props) {
  return (
    <StyledHeader>
      {children}
    </StyledHeader>
  );
}

function Sidebar({ children }: Props) {
  return(
    <StyledSideBar>
      {children}
    </StyledSideBar>
  );
}

const Container = styled.div`
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const HEADER_HEIGHT = '70px';
const SIDEBAR_WIDTH = '300px';
const STYLED_HEADER_ZINDEX = 20;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${STYLED_HEADER_ZINDEX};
  background-color: white;
  border-bottom: 2px solid lightgray;
  height: ${HEADER_HEIGHT};
  width: 100vw;
  position: fixed;
`;

const StyledSideBar = styled.div`
  z-index: ${STYLED_HEADER_ZINDEX - 1};
  background-color: white;
  width: ${SIDEBAR_WIDTH};
  top: ${HEADER_HEIGHT};
  position: fixed;
  height: 100vh;
  padding: 10px;
`;

const Main = styled.div`
  padding: 30px;
  padding-left: calc(30px + ${SIDEBAR_WIDTH});
  padding-top: calc(30px + ${HEADER_HEIGHT});
`;

const AddNoteButtonStyled = styled.button`
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  transition: border-color 0.3s;
  cursor: inherit;
  user-select: none;
  font-size: inherit;
`;

// this disabled prop is horrible :)
const Item = styled.li<any>`
  cursor: pointer;
  height: 50px;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.1s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    margin-bottom: 30px;
    border: 2px dashed ${({ disabled }) => disabled ? 'gray' : 'orange'};
    
    &:hover {
      background-color: ${({ disabled }) => disabled ? 'transparent' : '#ffd988'};
    }
  }

  &:hover {
    ${({ disabled }) => disabled || 'border: 2px solid orange;'}
  }
`;