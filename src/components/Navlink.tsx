/*
First I tried to use <NavLink> from 'react-router-dom' but its active class didn't work correctly.
It doesnt react when changing url parameters
*/

import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { updateActiveLabel } from "../features/activeLabel/activeLabelSlice";

interface NavlinkProps {
  children: React.ReactNode,
  to: string
  onClick: () => void;
}

// when label have a space, active class doesnt work
// because currentPath !== to aka my%20label !== my label
export function Navlink({ children, to, onClick }: NavlinkProps) {
  const location = useLocation();
  const currentPath = location.pathname + location.search;
  const isActive = currentPath === to;

  return (
    <>
      <StyledNavLink
        to={to}
        className={isActive ? 'active' : ''}
        onClick={onClick}
      >
        { children }
      </StyledNavLink>
    </>
  );
}

function extractLabel(url: string) {
  const equalSignIndex = url.indexOf('=');

  return url.slice(equalSignIndex + 1);
}

const StyledNavLink = styled(Link)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;

  transition: all 0.3s;

  &.active {
    background-color: #feefc3;
  }
`;