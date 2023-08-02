import { useRouteError, Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyles } from "../styles/GlobalStyles";

import { ReactComponent as SadFaceIcon } from '../assets/sad-face.svg';

export function PageNotFound() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <>
      <GlobalStyles />
      <Container>
        <SadFaceIcon />
        <Error>404</Error>
        <Title>Page not found</Title>
        <Description>
          The page you are looking for doesn't exist or an
          other error occurred.<br />
          <Link to="/">Get back to the main page</Link>
        </Description>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;
`;

const Error = styled.span`
  font-size: 4rem;
  font-weight: bold;
`;

const Title = styled.h1`
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
  text-align: center;
  line-height: 1.5;
`;