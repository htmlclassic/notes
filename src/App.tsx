import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";

import { nanoid } from '@reduxjs/toolkit';

import { useDispatch, useSelector } from "react-redux";
import { createNote } from "./features/notes/notesSlice";
import { updateActiveNoteId } from "./features/activeNoteId/activeNoteIdSlice";
import { LabelsList } from "./features/labels/LabelsList";
import { NoteList } from "./features/notes/NoteList";
import { useNavigate, useParams } from "react-router-dom";
import { createLabel, selectLabels } from "./features/labels/labelsSlice";
import { RESERVED_ARCHIVED_NOTES_LABEL } from "./features/labels/labelsSlice";

export default function App() {
  let { label: labelName } = useParams();
  if (labelName === undefined) labelName = '';

  const labels = useSelector(selectLabels);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddNote = () => {
    const noteId = nanoid();
    const labelExist = labels.find(label => label.name === labelName);
    const labelId = labelExist ? labelExist.id : nanoid();

    if (labelName === '') {
      dispatch(createNote({ id: noteId, label: '' }));
    } else {
      dispatch(createNote({ id: noteId, label: labelId }));
    }

    dispatch(createLabel({ id: labelId, name: labelName as string }));
    dispatch(updateActiveNoteId(noteId));

    navigate(`/${labelName}`);
  };

  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <h1>Header</h1>
        </Header>
        <Sidebar>
          <AddNoteButtonStyled
            onClick={handleAddNote}
            disabled={labelName === RESERVED_ARCHIVED_NOTES_LABEL}
          >
            Add a note
          </AddNoteButtonStyled>
          <LabelsList />
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
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Main = styled.div`
  padding: 30px;
  padding-left: calc(30px + ${SIDEBAR_WIDTH});
  padding-top: calc(30px + ${HEADER_HEIGHT});
`;

const AddNoteButtonStyled = styled.button<any>`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: all 0.3s;
  user-select: none;
  font-size: inherit;

  display: inline-block;
  width: 100%;
  padding: 15px 0;
  cursor: pointer;

  ${({ disabled }) => disabled ?
    `cursor: not-allowed;` :
    
    `&:hover {
      background-color: #ffea70;
      border-color: transparent;
    }`
  }
`;