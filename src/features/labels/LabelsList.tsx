import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { createLabel, deleteLabel, selectLabels } from "./labelsSlice";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export function LabelsList() {
  const labels = useSelector(selectLabels);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleDelete = (labelName: string) => {
    dispatch(deleteLabel(labelName));
    // navigate('/');
  };

  useEffect(() => {
    localStorage.setItem('labels', JSON.stringify(labels));
  }, [labels]);

  const labelsList = labels.map((label: string) => 
    <Item key={label}>
      <NavLinkStyled
        to={`/${label}`}
      >
        { label }
      </NavLinkStyled>
    </Item>
  );

  return (
    <ul>
      <CreateLabelForm /><br />
      <Item>
        <NavLinkStyled to={`/`} >
          All notes
        </NavLinkStyled>
      </Item>
      <Item>
        <NavLinkStyled to={`/archived`} >
          Trashed notes
        </NavLinkStyled>
      </Item>
      { labelsList }
    </ul>
  );
}

function CreateLabelForm() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const handleSubmit = () => {
    dispatch(createLabel(value));
    setValue('');
    navigate(`/${value}`)
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

const NavLinkStyled = styled(NavLink)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.li`
  cursor: pointer;
  height: 50px;
  border-radius: 10px;
  border: 2px solid transparent;
  transition: all 0.1s;

  display: flex;
  align-items: center;
  justify-content: center;

  & .active {
    color: red;
  }

  &:hover {
    border: 2px solid orange;
  }
`;