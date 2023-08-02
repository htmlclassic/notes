import styled from "styled-components";

import { ReactComponent as TrashIcon } from '../assets/trash-icon.svg';
import { ReactComponent as ColorPlateIcon } from '../assets/color-icon.svg';
import { ReactComponent as RestoreIcon } from '../assets/restore-icon.svg';
import { ReactComponent as ChartLabelsIcon } from '../assets/chart-labels.svg';
import { ReactComponent as SelectionIcon } from '../assets/selection-icon.svg';
import { ReactComponent as PinIcon } from '../assets/pin-icon.svg';

// basic style for all buttons
export const Button = styled.button`
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

  svg {
    width: 15px;
  }

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

interface IButton {
  disabled?: boolean;
  title: string;
  onClick: (() => void) | ( (e: React.MouseEvent) => void );
  onMouseDown?: (e: React.MouseEvent) => void;
}

interface PinNoteButtonI {
  pinned: boolean;
}

export function PinNoteButton(props: PinNoteButtonI & IButton) {
  return (
    <StyledPinNoteButton {...props}>
      <PinIcon />
    </StyledPinNoteButton>
  );
}

const StyledPinNoteButton = styled(Button)<PinNoteButtonI>`
  svg .inner {
    ${({ pinned }) => pinned && 'fill: black;'}
  }
`;

export function RestoreNotesButton(props: IButton) {
  return (
    <StyledRestoreNotesButton {...props}>
      <RestoreIcon />
    </StyledRestoreNotesButton>
  );
}

const StyledRestoreNotesButton = styled(Button)``;

export function DeleteNotesButton(props: IButton) {
  return (
    <StyledDeleteNotesButton {...props}>
      <TrashIcon />
    </StyledDeleteNotesButton>
  );
}

const StyledDeleteNotesButton = styled(Button)``;

interface ChangeBgColorButtonI {
  active: boolean;
}

export function ChangeBgColorButton(props: ChangeBgColorButtonI & IButton) {
  return (
    <StyledChangeBgColorButton {...props}>
      <ColorPlateIcon />
    </StyledChangeBgColorButton>
  );
}

const StyledChangeBgColorButton = styled(Button)<ChangeBgColorButtonI>`
  background-color: rgba(0, 0, 0, ${({active}) => active ? '0.1' : '0'});
`;

export function EditLabelsButton(props: IButton) {
  return (
    <StyledEditLabelsButton {...props}>
      <ChartLabelsIcon />
    </StyledEditLabelsButton>
  );
}

const StyledEditLabelsButton = styled(Button)`
  transform: rotate(-45deg);
`;

interface SelectNotesButtonI {
  isSelected: boolean;
}

export function SelectNotesButton(props: SelectNotesButtonI & IButton) {
  return (
    <StyledSelectNotesButton {...props}>
      <SelectionIcon />
    </StyledSelectNotesButton>
  );
}

const StyledSelectNotesButton = styled(Button)<SelectNotesButtonI>`
  .inner {
    transition: all 0.3s;
    transform: scale(0);
    transform-origin: 50% 50%;

    ${({ isSelected }) => isSelected && (
      `
        transform: scale(0.6);
      `
    )}
  }
`;