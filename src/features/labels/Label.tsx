import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteLabel, updateLabel } from "./labelsSlice";
import { deleteLabelFromNotesById } from '../notes/notesSlice';
import { ILabel } from '../../types';

import { Input, Button, NavLinkStyled } from "./styles";
import styled from "styled-components";

import { ReactComponent as LabelI } from './assets/label-icon.svg';
import { ReactComponent as EditI } from './assets/edit-icon.svg';
import { ReactComponent as DeleteI } from './assets/delete-icon.svg';
import { Routes } from "../../index";

interface LabelProps {
  label: ILabel;
}

export function Label({ label: { id, name } }: LabelProps) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteLabel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    navigate(Routes.root);
    dispatch(deleteLabel(id));
    dispatch(deleteLabelFromNotesById(id));
  };

  if (edit) {
    return (
      <Wrapper>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value)
          }}
          type="text"
          value={text}
          autoFocus={true}
        />
        <Button
          onClick={() => {
            if (text !== '') {
              dispatch(updateLabel({ id, name: text }));
              navigate(`${Routes.labels}/${text}`);
              setEdit(false);
            }
        }}
        >
          Save
        </Button>
      </Wrapper>
    );
  }

  return (
    <>
      <NavLinkStyled
        to={`${Routes.labels}/${name}`}
      >
        <LabelIcon />
        <LabelName>{ name }</LabelName>
        <Div>
          <Btn
            title="Change name"
            onClick={() => {
              setEdit(true);
            }}
          >
            <EditIcon />
          </Btn>
          <Btn
            title="Delete"
            onClick={handleDeleteLabel}
          >
            <DeleteIcon />
          </Btn>
        </Div>
      </NavLinkStyled>
    </>
  );
}

const LABEL_ICON_SIZE = '20px';
const OTHER_ICON_SIZE = '15px';
const DIV_GAP = '10px';

const LabelName = styled.span`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LabelIcon = styled(LabelI)`
  width: ${LABEL_ICON_SIZE};
  height: ${LABEL_ICON_SIZE};
  flex-shrink: 0;
`;

const SIZE = `
  width: ${OTHER_ICON_SIZE};
  height: ${OTHER_ICON_SIZE};
`;

const EditIcon = styled(EditI)`
  display: flex;
  ${SIZE}
`;

const DeleteIcon = styled(DeleteI)`
  display: flex;
  ${SIZE}
`;

const Div = styled.div`
  display: flex;
  gap: ${DIV_GAP};
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  background: transparent;
  border: 1px solid transparent;
  padding: 5px;
  cursor: pointer;
  border-radius: 10%;
  flex-shrink: 0;

  transition: all 0.3s;

  &:hover {
    border-color: rgba(0, 0, 0, 1);
  }
`;