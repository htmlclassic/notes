import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { createLabel, deleteLabel, updateLabel, selectLabels } from "./labelsSlice";
import { Navlink } from '../../components/Navlink';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateActiveLabel } from '../activeLabel/activeLabelSlice';

export function LabelsList() {
  const labels = useSelector(selectLabels);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (labelName: string) => {
    dispatch(deleteLabel(labelName));
    navigate('/');
  };

  useEffect(() => {
    localStorage.setItem('labels', JSON.stringify(labels));
  }, [labels]);

  return (
    <ul>
      <CreateLabelForm /><br />
      {
        labels.map((label: string) =>
          <Item key={label}>
            <Navlink
              to={`/notes?filter=${label}`}
              onClick={() => {
                dispatch(updateActiveLabel(label));
              }}
            >
              {label}
            </Navlink>
            {
              label !== 'All' && label !== 'Trash' ? 
              (
                <button
                  onClick={() => handleDelete(label)}
                >X</button>
              ) : null
            }
          </Item>
        )
      }
    </ul>
  );
}

function CreateLabelForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleSubmit = () => {
    dispatch(createLabel(value));
    setValue('');
  };
  
  return (
    <div>
      <input
        onChange={handleChange}
        value={value}
        type="text"
        placeholder='Enter label name'
      />
      <button onClick={handleSubmit}>Create label</button>
    </div>
  );
}

const Item = styled.li`
  cursor: pointer;
  height: 50px;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.1s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 2px solid orange;
  }
`;