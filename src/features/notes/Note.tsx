import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { toRem } from '../../styles/utils'

import { Input } from '../../components/Input';
import { ColorPanel } from '../../components/ColorPanel';

import { ReactComponent as TrashIcon } from './assets/trash-icon.svg';
import { ReactComponent as ColorPlateIcon } from './assets/color-icon.svg';

import { INote } from '../../types';
import { useDispatch } from 'react-redux';
import { updateNote } from './notesSlice';

const TRANSITION_TIME = 0.2;
let zIndex = 100;

interface NoteProps {
  note: INote;
  isActive: boolean;
  handleDelete: () => void;
  handleClick: () => void;
}

export function Note({
  note,
  isActive,
  handleDelete,
  handleClick
} : NoteProps) {

  const wrapperRef = useRef(null);
  const noteRef: any = useRef(null);
  const [showColorPanel, setShowColorPanel] = useState(false);
  const [bgColor, setBgColor] = useState(note.bgColor);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isActive) {
      openNote();
    } else {
      closeNote(); 
    }
  }, [isActive]);

  useEffect(() => {
    const handler = () => setShowColorPanel(false);

    window.addEventListener('click', handler);

    return () => window.removeEventListener('click', handler);
  }, []);

  const openNote = () => {
    const ACTIVE_WIDTH = '35vw';
    const ACTIVE_HEIGHT = '70vh';
    const [x, y] = getTranslateCoords(noteRef.current, ACTIVE_WIDTH, ACTIVE_HEIGHT);

    noteRef.current.style.width = ACTIVE_WIDTH;
    noteRef.current.style.height = ACTIVE_HEIGHT;
    noteRef.current.style.zIndex = ++zIndex;
    noteRef.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const closeNote = () => {
    noteRef.current.style.width = '';
    noteRef.current.style.height = '';
    noteRef.current.style.transform = ``;

    setTimeout(() => {
      if (noteRef.current) {
        noteRef.current.style.zIndex = '';
      }
    }, TRANSITION_TIME * 1000);
  };

  const handleInputTitleChange = (title: string) => {
    dispatch(updateNote({
      id: note.id,
      title,
    }));
  };

  const handleInputTextChange = (text: string) => {
    dispatch(updateNote({
      id: note.id,
      text,
    }));
  };

  return (
    <Wrapper ref={wrapperRef}>
      <StyledNote
        active={isActive}
        bgColor={bgColor}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          
          // 0 === primary mouse button (left button)
          if (e.button === 0) {
            handleClick();
          }
        }}
        ref={noteRef}
      >
        <Content active={isActive}>
          <StyledTitleInput
            initialValue={note.title}
            placeholder="Title"
            handleChange={handleInputTitleChange}
            />
          <StyledTextInput
            initialValue={note.text}
            placeholder="Text"
            handleChange={handleInputTextChange}
          />
        </Content>
        <Labels active={isActive}>
          {
            note.labels.map(label => <Label>{label}</Label>)
          }
        </Labels>
        <Toolbar onMouseDown={e => e.stopPropagation()}>
            <ChangeBgColorBtn onClick={e => {
              e.stopPropagation();
              setShowColorPanel(!showColorPanel);
            }}>
              <ColorPlateIcon />
            </ChangeBgColorBtn>
            <DeleteNoteBtn
              onClick={handleDelete}
            >
              <TrashIcon />
            </DeleteNoteBtn>
            <ColorPanel
              onClick={color => {
                setShowColorPanel(false);
                setBgColor(color);
                dispatch(updateNote({
                  id: note.id,
                  bgColor: color
                }));
              }}
              show={showColorPanel}
            />
        </Toolbar>
      </StyledNote>
    </Wrapper>
  );
}

function getViewportCenterCoords() {
  return [window.innerWidth / 2, window.innerHeight / 2];
}

// calculates coordinates to center an element in a viewport based on an element's size
function getTranslateCoords(element: HTMLElement, width: string, height: string) {
  const w = convertToPixels(width);
  const h = convertToPixels(height);

  const rect = element.getBoundingClientRect();
  const [x, y] = [rect.left, rect.top];
  const [vx, vy] = getViewportCenterCoords();

  return [vx - x - (w / 2), vy - y - (h / 2)];
}

function convertToPixels(value: string) {
  const vw1 = window.innerWidth / 100;
  const vh1 = window.innerHeight / 100;

  if (value.includes('px')) return parseFloat(value);
  if (value.includes('vw')) return parseFloat(value) * vw1;
  if (value.includes('vh')) return parseFloat(value) * vh1;

  return 0;
}

/* ============= STYLES ============= */

const SIDE_PADDING = '17px';

const Wrapper = styled.div`
  width: 270px;
  height: 350px;
  position: relative;
`;

interface IStyledNote {
  bgColor: string;
  active: boolean;
}

const StyledNote = styled.div<IStyledNote>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
  width: 100%;
  padding: 14px 0 5px;
  border-radius: 10px;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.15s;
  ${({ bgColor, active }) => {
    if (bgColor === '#ffffff' && !active) {
      return 'border: 2px solid rgba(0, 0, 0, 0.1);';
    }
  }}

  position: absolute;

  &:hover {
    border: ${({ active }) => active ?
    `2px solid transparent` : `2px solid rgba(0, 0, 0, 0.5)`}
  };

  ${({ active }) => active ?
    `
      box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.5);
      cursor: auto;
    ` : ''
  }
`;

interface IContent {
  active: boolean;
}

const Content = styled.div<IContent>`
  padding: 0 ${SIDE_PADDING};
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  overflow: ${({ active }) => active ? 'auto' : 'hidden'};
`;



interface ILabels {
  active: boolean;
}

const Labels = styled.ul<ILabels>`
  --fontSize: 1rem;
  --sidePadding: 5px;
  --onelineHeight: calc(
    var(--sidePadding) * 2
    + var(--fontSize)
    + 4px
  );

  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 0 var(--sidePadding);
  overflow-y: ${({ active }) => active ? 'auto' : 'hidden'};
  flex-shrink: 0;
  max-height: ${({ active }) => active ? '100px' : 'var(--onelineHeight)'};
`;

const Label = styled.li`
  cursor: pointer;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;

  transition: all 0.15s;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
  }

  white-space: nowrap;
`;

const TOOLBAR_SIDE_PADDING = '5px'; // px

const Toolbar = styled.div`
  padding: 0 ${TOOLBAR_SIDE_PADDING};
  display: flex;
  justify-content: space-between;
  gap: 3px;
`;

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

  transition: all ${TRANSITION_TIME}s;

  & svg {
    width: 15px;
  }

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DeleteNoteBtn = styled(Button)`
  
`;

const ChangeBgColorBtn = styled(Button)`

`;

const StyledTitleInput = styled(Input)<any>`
  outline: none;
  font-size: ${toRem(22)};
`;

const StyledTextInput = styled(Input)<any>`
  outline: none;
  line-height: 1.5;
`;