import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { toRem } from '../../styles/utils'

import { Input } from '../../components/Input';

import { INote } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { updateNote } from './notesSlice';
import { selectLabels } from '../labels/labelsSlice';

import { Toolbar } from './Toolbar';
import { Backdrop } from '@mui/material';

import { UpdateNotesLabelsContext } from '../../app/context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NOTE_HEIGHT, NOTE_WIDTH } from './styles';

const TRANSITION_TIME = 0.2;
let zIndex = 100;

interface NoteProps {
  note: INote;
  isActive: boolean;
  isSelected: boolean;
  handleDelete: () => void;
  handleClick: () => void;
}

const NOTE_MAX_WIDTH = '670px';
const NOTE_MAX_HEIGHT = '630px';

export function Note({
  note,
  isActive,
  isSelected,
  handleDelete,
  handleClick,
} : NoteProps) {

  const wrapperRef = useRef(null);
  const noteRef = useRef<HTMLDivElement>(null!);
  const contentWrapper = useRef<HTMLDivElement | null>(null);
  const isEmpty = note.title === '' && note.text === '';

  const { open } = useContext(UpdateNotesLabelsContext);

  const [bgColor, setBgColor] = useState(note.bgColor);
  const allLabels = useSelector(selectLabels);
  const dispatch = useDispatch();

  const labelsList =
    note.labels.map(id => {
      const label = allLabels.find(label => label.id === id);

      return (
        <Label
          key={id}
          to={label ? `/labels/${label.name}` : null}
          onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
        >
          {label?.name}
        </Label>
      );
    });
  

  useEffect(() => {
    if (isActive) {
      openNote();
      document.body.style.overflow = 'hidden';
    } else {
      closeNote();
      document.body.style.overflow = ''; 
    }
  }, [isActive]);

  const openNote = () => {
    const ACTIVE_WIDTH = '90vw';
    const ACTIVE_HEIGHT = '70vh';
    const [x, y] = getTranslateCoords(noteRef.current, ACTIVE_WIDTH, ACTIVE_HEIGHT);

    noteRef.current.style.width = ACTIVE_WIDTH;
    noteRef.current.style.height = ACTIVE_HEIGHT;
    noteRef.current.style.zIndex = ++zIndex + '';
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

      if (contentWrapper.current) {
        contentWrapper.current.scrollTop = 0;
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
    <Wrapper ref={wrapperRef} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <Backdrop open={isActive} sx={{
        zIndex: zIndex,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        cursor: 'pointer'
      }} />
      <StyledNote
        active={isActive}
        selected={isSelected}
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
        <Content 
          ref={contentWrapper}
          active={isActive}
          empty={isEmpty && !isActive}
        >
          {
            isEmpty && !isActive
            ?
              <span style={{ userSelect: 'none' }}>Empty note</span>
            :
              <>
                <StyledTitleInput
                  initialValue={note.title}
                  placeholder="Title"
                  handleChange={handleInputTitleChange}
                  disable={!isActive}
                />
                <StyledTextInput
                  initialValue={note.text}
                  placeholder="Text"
                  handleChange={handleInputTextChange}
                  disable={!isActive}
                />
              </>
          }
        </Content>
        <Labels active={isActive}>
          {
            labelsList.length ? labelsList : null
          }
        </Labels>
        <Toolbar
          noteId={note.id}
          isNoteSelected={isSelected}
          isNotePinned={note.pinned}
          openUpdateNotesLabels={() => open([ note ])}
          setBgColor={setBgColor}
          handleDelete={handleDelete}
        />
      </StyledNote>
    </Wrapper>
  );
}

function getViewportCenterCoords() {
  return [window.innerWidth / 2, window.innerHeight / 2];
}

// calculates coordinates to center an element in a viewport based on an element's size
function getTranslateCoords(element: HTMLElement, width: string, height: string) {
  let w = convertToPixels(width);
  let h = convertToPixels(height);
  const maxw = parseFloat(NOTE_MAX_WIDTH);
  const maxh = parseFloat(NOTE_MAX_HEIGHT);

  if (w > maxw) w = maxw;
  if (h > maxh) h = maxh;

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
  width: ${NOTE_WIDTH};
  height: ${NOTE_HEIGHT};
  position: relative;
`;

interface IStyledNote {
  bgColor: string;
  active: boolean;
  selected: boolean;
}

const StyledNote = styled.div<IStyledNote>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  height: 100%;
  width: 100%;
  max-width: ${NOTE_MAX_WIDTH};
  max-height: ${NOTE_MAX_HEIGHT};
  padding: 14px 0 5px;
  border-radius: 10px;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;

  border: ${({ selected }) => selected ?
    '2px solid rgba(0, 0, 0, 1)' : '2px solid transparent' 
  };

  transition: all 0.15s;

  ${({ bgColor, active, selected }) => {
    if (bgColor === '#ffffff' && !active && !selected) {
      return 'border: 2px solid rgba(0, 0, 0, 0.1);';
    }
  }}

  position: absolute;

  // make it easy
  &:hover {
    border: ${({ active, selected }) => {
      if (selected) {
        return;
      }

      if (active) {
        return `2px solid transparent`;
      } else {
        return `2px solid rgba(0, 0, 0, 0.4)`;
      }
    }}
  };

  ${({ active }) => active ?
    `
      cursor: auto;
    ` : ''
  }
`;

interface IContent {
  active: boolean;
  empty: boolean;
}

const Content = styled.div<IContent>`
  padding: 0 ${SIDE_PADDING};
  display: flex;
  
  div:nth-of-type(2) {
    flex-grow: 1;
  }

  flex-direction: column;
  flex-grow: 1;

  overflow: ${({ active }) => active ? 'auto' : 'hidden'};

  ${({ empty }) => empty && (
    `
      justify-content: center;
      align-items: center;
    `
  )}
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

const Label = styled(Link)<any>`
  cursor: pointer;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  user-select: none;

  transition: all 0.15s;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.7);
  }

  text-decoration: none;
  color: black;

  white-space: nowrap;
`;


const StyledTitleInput = styled(Input)<any>`
  font-size: ${toRem(22)};
  font-size: 1.2rem;
`;

const StyledTextInput = styled(Input)<any>`
  line-height: 1.5;
`;