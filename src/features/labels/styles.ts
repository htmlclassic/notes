import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavLinkStyled = styled(NavLink)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  gap: 10px;
  align-items: center;
  border-radius: inherit;

  text-decoration: none;
  color: black;

  border: 1px solid transparent;

  text-overflow: ellipsis;
  white-space: nowrap;

  user-select: none;
`;

export const Input = styled.input`
  font-size: inherit;
  padding: 10px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 100%;

  transition: all 0.3s;

  &:focus {
    border-color: black;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;

  transition: all 0.3s;

  &:hover {
    border-color: black;
  }
`;