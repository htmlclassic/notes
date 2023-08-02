import { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

interface InputProps {
  initialValue: string;
  placeholder: string;
  disable: boolean;
  handleChange: (value: string) => void;
  className: string;
}

// this component (div with contenteditable=true) should be fully uncontrolled because when you set
// innerHTML, cursor jumps at the beginning of a div
export function Input({
  initialValue,
  placeholder,
  disable,
  handleChange,
  className,
}: InputProps) {
  const [showPlaceholder, setShowPlaceholder] = useState(initialValue === '');
  const ref: any = useRef(null);

  useEffect(() => {
    ref.current.innerHTML = initialValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
      <Wrapper disable={disable} >
        <Placeholder show={showPlaceholder}>{placeholder}</Placeholder>
        <StyledInput
          ref={ref}
          contentEditable
          onPaste={(e) => {
            // I know this solution is deprecated but I can't find any workaround at the moment
            e.preventDefault();
            const text = e.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
          }}

          onInput={e => {
            const value = (e.target as HTMLElement).innerHTML;
            
            console.log(value.trim() === '')

            if (value.trim() === '') {
              setShowPlaceholder(true);
            } else {
              setShowPlaceholder(false);
            }

            handleChange(value);
          }}

          className={className}
          suppressContentEditableWarning={true}
        ></StyledInput>
      </Wrapper>
  );
}

const VERTICAL_PADDING = '15px';

const StyledInput = styled.div`
  padding: ${VERTICAL_PADDING} 0;
  outline: none;
  height: 100%;
`;

const Wrapper = styled.div<any>`
  transition: all 0.3s;
  position: relative;
  z-index: 1;

  ${({ disable }) => disable && (
    `
      &::before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        position: absolute;
      }
    `
  )}
`;

const Placeholder = styled.span<any>`
  top: ${VERTICAL_PADDING};
  font-weight: 300;
  position: absolute;
  z-index: -1;
  color: #747474;
  visibility: ${({ show }) => show ? 'visible' : 'hidden'};
`;