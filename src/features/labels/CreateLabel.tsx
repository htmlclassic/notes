import { useDispatch } from "react-redux";
import { createLabel } from "./labelsSlice";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { Input } from './styles';
import { SIDEBAR_PADDING } from '../../styles/globalVars';
import styled from "styled-components";
import { Routes } from "../../index";

export function CreateLabel() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value !== '') {
      // these chars are banned because they cause routing to break in a lot of cases
      const BANNED_CHARS = ['/', '#', '%', '?'];
      const containsBannedChars = /[/#%?]/.test(value);

      if (containsBannedChars) {
        alert(`You can't use: ${BANNED_CHARS.join(', ')} characters in your label name`);
        return;
      }

      const id = nanoid();

      dispatch(createLabel({ id, name: value }));
      setValue('');
      navigate(`${Routes.labels}/${value}`)
    }
  };
  
  return (
    <Div>
      <Label htmlFor="createLabelField">Create label</Label>
      <StyledInput
        onChange={handleChange}
        onKeyDown={handleSubmit}
        id="createLabelField"
        value={value}
        type="text"
        placeholder='Press Enter to submit'
        autoComplete="off"
      />
    </Div>
  );
}

const StyledInput = styled(Input)`
  border-radius: 5px;
  font-size: 0.9rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Div = styled.div`
  padding: ${SIDEBAR_PADDING};
`;