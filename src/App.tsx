import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";

import { nanoid } from '@reduxjs/toolkit';

import { useDispatch } from "react-redux";
import { createNote } from "./features/notes/notesSlice";
import { updateActiveNoteId } from "./features/activeNoteId/activeNoteIdSlice";
import { Outlet, NavLink } from "react-router-dom";

export default function App() {
  const dispatch = useDispatch();

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
              onClick={() => {
                const id = nanoid();

                dispatch(createNote(id));
                dispatch(updateActiveNoteId(id));
              }}
            >
              <AddNoteButton>Add a note</AddNoteButton>
            </Item>
            <Item>
              <StyledNavLink to="/">Notes</StyledNavLink>
            </Item>
            <Item>
              <StyledNavLink to="archived">Archived notes</StyledNavLink>
            </Item>
          </ul>
        </Sidebar>
        <Main>
          <Outlet />
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

const StyledNavLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;

  &.active {
    background-color: #feefc3;
  }
`;

const Item = styled.li`
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
    border: 2px dashed orange;
    
    &:hover {
      background-color: #ffd988;
    }
  }

  &:hover {
    border: 2px solid orange;
  }
`;