import { useDispatch } from "react-redux";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteNotesByLabelId } from '../notes/notesSlice';
import { deleteLabel, updateLabel } from "./labelsSlice";
import { ILabel } from '../../types';

import { Input, Button, NavLinkStyled } from "./styles";
import styled from "styled-components";

import { ReactComponent as LabelI } from './assets/label-icon.svg';
import { ReactComponent as EditI } from './assets/edit-icon.svg';
import { ReactComponent as DeleteI } from './assets/delete-icon.svg';

const LabelIcon = styled(LabelI)`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const EditIcon = styled(EditI)`
  width: 15px;
  height: 15px;
`;

const DeleteIcon = styled(DeleteI)`
  width: 15px;
  height: 15px;
`;

interface LabelProps {
  label: ILabel;
}

export function Label({ label: { id, name } }: LabelProps) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              navigate(`/${text}`);
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
      <LabelIcon />
      <NavLinkStyled
        to={`/${name}`}
      >
        { name }
      </NavLinkStyled>
      <Div>
        <Btn
          onClick={() => {
            setEdit(true);
          }}
        >
          <EditIcon />
        </Btn>
        <Btn
          onClick={() => {
            dispatch(deleteLabel(id));
            dispatch(deleteNotesByLabelId(id));
            navigate('/');
          }}
        >
          <DeleteIcon />
        </Btn>
      </Div>
    </>
  );
}

const Div = styled.div`
  display: flex;
  gap: 10px;
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