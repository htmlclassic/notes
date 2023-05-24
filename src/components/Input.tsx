import { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

interface InputProps {
  initialValue: string;
  placeholder: string;
  handleChange: (value: string) => void;
  className: string;
}

export function Input({
  initialValue,
  placeholder,
  handleChange,
  className 
}: InputProps) {

  const [showPlaceholder, setShowPlaceholder] = useState(initialValue === '');
  const ref: any = useRef(null);

  useEffect(() => {
    ref.current.innerHTML = initialValue;
  },[initialValue])

  return(
      <Wrapper>
        <Placeholder show={showPlaceholder}>{placeholder}</Placeholder>
        <div
          ref={ref}
          contentEditable={true}

          onInput={e => {
            const target = e.target as HTMLElement;
            const value = target.innerHTML;
            
            if (value === '') {
              setShowPlaceholder(true);
            } else {
              setShowPlaceholder(false);
            }

            handleChange(value);
          }}

          className={className}
          suppressContentEditableWarning={true}
        ></div>
      </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const Placeholder = styled.span<any>`
  font-weight: 300;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  z-index: -1;
  color: #b1b1b1;
  visibility: ${({ show }) => show ? 'visible' : 'hidden'};
`;