import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import { LabelsList } from "./features/labels/LabelsList";
import { NoteList } from "./features/notes/NoteList";
import { AddNoteButton } from "./components/AddNoteButton";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <span>Если что-то поломалось нажми на эту кнопку и перезагрузи страницу через Ctrl+F5, мб поможет</span>
          <button onClick={() => localStorage.clear()} style={{ padding: 5 }}><b>Delete all data</b></button>
        </Header>
        <Wrapper>
          <Sidebar>
            <AddNoteButton />
            <LabelsList />
          </Sidebar>
          <Main>
            <NoteList />
          </Main>
        </Wrapper>
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
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const HEADER_HEIGHT = '70px';
const STYLED_HEADER_ZINDEX = 20;

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: ${STYLED_HEADER_ZINDEX};
  background-color: white;
  border-bottom: 2px solid lightgray;
  height: ${HEADER_HEIGHT};
`;

const StyledSideBar = styled.div`
  z-index: ${STYLED_HEADER_ZINDEX - 1};
  background-color: white;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex-shrink: 0;
  overflow: hidden;

  @media only screen and (max-width: 640px)  {
    width: 70px;
  }
`;

const Main = styled.div`
  flex-grow: 1;
  padding: 30px;
  overflow: auto;
`;