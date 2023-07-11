import { useDispatch } from "react-redux";
import { createLabel } from "./labelsSlice";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { Input } from './styles';
import { SIDEBAR_PADDING } from '../../styles/globalVars';

export function CreateLabel() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value !== '') {
      const id = nanoid();

      dispatch(createLabel({ id, name: value }));
      setValue('');
      navigate(`/${value}`)
    }
  };
  
  return (
    <div style={{ padding: SIDEBAR_PADDING }}>
      <Input
        onChange={handleChange}
        onKeyDown={handleSubmit}
        value={value}
        type="text"
        placeholder='Create label'
      />
    </div>
  );
}