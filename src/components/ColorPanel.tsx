import styled from 'styled-components';

interface ColorPanelProps {
  show: boolean;
  onClick: (color: string) => void;
}

export function ColorPanel({ show, onClick }: ColorPanelProps) {
  const colors = [
    {
      id: 0,
      name: 'white',
      value: '#ffffff'
    },
    {
      id: 1,
      name: 'red',
      value: '#ffada6'
    },
    {
      id: 2,
      name: 'orange',
      value: '#fbbc04'
    },
    {
      id: 3,
      name: 'yellow',
      value: '#fff475'
    },
    {
      id: 4,
      name: 'green',
      value: '#ccff90'
    },
    {
      id: 5,
      name: 'teal',
      value: '#a7ffeb'
    },
    {
      id: 6,
      name: 'blue',
      value: '#cbf0f8'
    },
    {
      id: 7,
      name: 'dark blue',
      value: '#aecbfa'
    },
    {
      id: 8,
      name: 'purple',
      value: '#d7aefb'
    },
    {
      id: 9,
      name: 'pink',
      value: '#fdcfe8'
    },
    {
      id: 10,
      name: 'brown',
      value: '#e6c9a8'
    },
    {
      id: 11,
      name: 'gray',
      value: '#e8eaed'
    },
  ];

  return (
    <StyledColorPanel
      onClick={ (e: React.MouseEvent) => e.stopPropagation() }
      show={show}
    >
      {
        colors.map(color =>
          <Color 
            key={color.id}
            color={color.value}
            onClick={ () => onClick(color.value) }
          />
        )
      }
    </StyledColorPanel>
  );
}

const StyledColorPanel = styled.div<any>`
  padding: 5px;
  position: absolute;
  z-index: 100;
  bottom: -10px;
  left: -2px;
  transform: translateY(100%);
  background-color: #ffffff;
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  display: ${({ show }) => show ? 'flex' : 'none'};;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  overflow: auto;
  width: calc(100% + 4px);
`;

const Color = styled.button`
  background-color: ${({ color }) => color};
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 30px;
  height: 30px;
  cursor: pointer;

  transition: border 0.1s;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 1);
  }
`;