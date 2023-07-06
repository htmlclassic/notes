import { useState, useRef, useEffect } from 'react';
import styled from "styled-components";

interface InputProps {
  initialValue: string;
  placeholder: string;
  handleChange: (value: string) => void;
  className: string;
}

// this component (div with contenteditable=true) should be fully uncontrolled because when you set
// innerHTML, cursor jumps at the beginning of a div
export function Input({
  initialValue,
  placeholder,
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
      <Wrapper>
        <Placeholder show={showPlaceholder}>{placeholder}</Placeholder>
        <Div
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
        ></Div>
      </Wrapper>
  );
}

const Div = styled.div`
  padding: 15px 0;
`;

const Wrapper = styled.div<any>`
  transition: all 0.3s;
  position: relative;
  z-index: 1;
`;

const Placeholder = styled.span<any>`
  top: 50%;
  transform: translateY(-50%);
  font-weight: 300;
  position: absolute;
  z-index: -1;
  color: #b1b1b1;
  visibility: ${({ show }) => show ? 'visible' : 'hidden'};
`;