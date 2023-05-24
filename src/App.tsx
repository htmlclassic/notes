import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import { NoteList } from './components/NoteList'
import { useState, useEffect, useReducer } from "react";
import { getNextId, getNotes, notesReducer } from './NotesManager';

import React from 'react';

export default function App() {
  const [notes, dispatch] = useReducer(notesReducer, getNotes());
  const [activeNoteId, setActiveNoteId] = useState(-1);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  });

  useEffect(() => {
    const handler = () => setActiveNoteId(-1);

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, []);

  const handleAdd = (title: string, text: string) => {
    dispatch({
      type: 'add',
      title,
      text
    });

    setActiveNoteId(getNextId());
  };

  const handleClick = (id: number) => {
    setActiveNoteId(id);
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
            <Item
              onClick={e => {
                e.stopPropagation(); 
                handleAdd('', '');
              }}
            >
              <AddNoteButton>Add a note</AddNoteButton>
            </Item>
          </ul>
        </Sidebar>
        <Main>
          <NoteList notes={notes} dispatch={dispatch} handleClick={handleClick} activeNoteId={activeNoteId} />
        </Main>
      </Container>
    </>
  );
}

interface Props {
  children: React.ReactNode
}

function AddNoteButton({ children }: Props) {
  return <AddNoteButtonStyled>{children}</AddNoteButtonStyled>
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

const Item = styled.li`
  cursor: pointer;
  padding: 15px;
  border-radius: 10px;
  transition: background-color 0.3s;
  background-color: #e9e9e9;

  &:hover {
    background-color: #feefc3;
  }
`;