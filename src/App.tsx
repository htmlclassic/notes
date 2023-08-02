import { GlobalStyles } from "./styles/GlobalStyles";
import styled from "styled-components";
import { LabelsList } from "./features/labels/LabelsList";
import { NoteList } from "./features/notes/NoteList";
import { AddNoteButton } from "./components/AddNoteButton";
import { ControlPanel } from "./components/ControlPanel";
import { useDispatch, useSelector } from "react-redux";
import { removeSelection, selectSelectedNotes } from "./features/selectedNotes/selectedNotesSlice";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { UpdateNotesLabels } from "./components/UpdateNotesLabels/UpdateNotesLabels";
import { ReactComponent as MenuIcon } from './assets/menu-icon.svg';

import { UpdateNotesLabelsProvider } from "./app/context";

const SMALL_DEVICE_WIDTH = '640px';
const isDeviceSmall = window.innerWidth <= parseFloat(SMALL_DEVICE_WIDTH);

export default function App() {
  const dispatch = useDispatch();
  const selectedNotesIDs = useSelector(selectSelectedNotes);
  const selectionMode = !!selectedNotesIDs.length;
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(!isDeviceSmall);

  useEffect(() => {
    dispatch(removeSelection());
  }, [location, dispatch]);

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth <= parseFloat(SMALL_DEVICE_WIDTH)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, []);

  return (
    // maybe put UpdateNotesLabels component inside of this provider?
    <UpdateNotesLabelsProvider>
      <GlobalStyles />
      <Container>
        <UpdateNotesLabels />
        <Header>
          <ToggleMenuButton
            title={showMenu ? 'Hide menu' : 'Show menu'}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setShowMenu(show => !show);
            }}
            show={showMenu}
          >
            <MenuIcon />
          </ToggleMenuButton>
          <ControlPanel selectedNotesIDs={selectedNotesIDs} />
        </Header>
        <Wrapper>
          <Sidebar
            show={showMenu}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <AddNoteButton />
            <LabelsList />
          </Sidebar>
          <Main
            leftPadding={showMenu && !isDeviceSmall}
            onClick={() => {
              dispatch(removeSelection());
            }}
          >
            <NoteList selectionMode={selectionMode} />
          </Main>
        </Wrapper>
      </Container>
    </UpdateNotesLabelsProvider>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 40px;
  height: 40px;

  background-color: rgba(0, 0, 0, 0);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;

  overflow: hidden;

  transition: all 0.2s;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const ToggleMenuButton = styled(Button)<{ show: boolean; }>`
  display: flex;
  flex-shrink: 0;
  transition: all 0.3s;
  
  transform: rotate(
    ${({ show }) => show ? '0' : '90deg'}
  );

  svg rect {
    transition: all 0.3s;

    &:first-child {
      fill: ${({ show }) => show ? '#FFEA70' : 'rgba(0, 0, 0, 0)'};
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  min-width: 340px;
`;

const HEADER_HEIGHT = '70px';
const STYLED_HEADER_ZINDEX = 20;

const Wrapper = styled.div`
  position: relative;
  padding-top: ${HEADER_HEIGHT};

  @media screen and (max-width: ${SMALL_DEVICE_WIDTH}) {
    overflow: initial;
  }
`;

const BORDER_STYLE = '1px solid #ebebeb';

const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: column;
  align-items: center;
  justify-items: end;
  gap: 20px;

  padding: 0 20px;

  z-index: ${STYLED_HEADER_ZINDEX};
  background-color: white;
  border-bottom: ${BORDER_STYLE};
  height: ${HEADER_HEIGHT};
  overflow-y: auto;

  position: fixed;
  width: 100%;
`;

const SIDEBAR_WIDTH = '300px';
const SIDEBAR_TRANSITION = '0.1s';

const Sidebar = styled.div<any>`
  z-index: ${STYLED_HEADER_ZINDEX - 1};
  background-color: white;

  width: ${({ show }) => show ? SIDEBAR_WIDTH : '0'};
  transform: translateX(
      ${({ show }) => show ? '0' : '-100%'}
  );
  ${({ show }) => show ? `border: ${BORDER_STYLE};` : ''}
  border-top: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
  flex-shrink: 0;
  overflow: hidden;

  height: 100%;
  
  transition: width ${SIDEBAR_TRANSITION},
              height ${SIDEBAR_TRANSITION},
              transform ${SIDEBAR_TRANSITION};

  @media screen and (max-width: ${SMALL_DEVICE_WIDTH}) {
    position: fixed;
  }

  position: fixed;
`;

const Main = styled.div<{ leftPadding: boolean; }>`
  --padding: 30px;

  padding: var(--padding);
  transition: all ${SIDEBAR_TRANSITION};
  ${({ leftPadding }) => leftPadding && `padding-left: calc(${SIDEBAR_WIDTH} + var(--padding));`}
`;