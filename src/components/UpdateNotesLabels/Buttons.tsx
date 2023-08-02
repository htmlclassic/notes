import styled from "styled-components";

interface ButtonProps {
  active: boolean;
  title: string;
  onClick: () => void;
}

export function AddLabelsButton({
  active,
  title,
  onClick
}: ButtonProps) {
  return (
    <AddLabelsButtonStyled
      onClick={onClick}
      className={active ? "active" : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <rect className="horizontal-rect" />
      <rect className="vertical-rect" />
    </AddLabelsButtonStyled>
  );
}

export function RemoveLabelsButton({
  active,
  title,
  onClick
}: ButtonProps) {
  return (
    <RemoveLabelsButtonStyled
      onClick={onClick}
      className={active ? "active" : undefined}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    > 
      <title>{title}</title>
      <rect className="vertical-rect" />
    </RemoveLabelsButtonStyled>
  );
}

const RECT_WIDTH = "4px";
const BUTTON_SIZE = "20px";

const ChangeLabelsButton = styled.svg`
  width: ${BUTTON_SIZE};
  height: ${BUTTON_SIZE};
  cursor: pointer;

  &:hover rect {
    fill: #bebebe
  }

  rect {
    transition: all 0.2s;

    width: ${RECT_WIDTH};
    height: 100%;

    transform-origin: 50%;

    fill: #f3f3f3;
  }

  .horizontal-rect {
    transform: translateX(calc(50% - ${RECT_WIDTH} / 2));
  }

  .vertical-rect {
    transform: rotate(90deg) translateX(calc(50% - ${RECT_WIDTH} / 2));
  }
`;

const AddLabelsButtonStyled = styled(ChangeLabelsButton)`
  &.active rect {
    fill: #75ca8d;
  }
`;

const RemoveLabelsButtonStyled = styled(ChangeLabelsButton)`
  &.active rect {
    fill: #e78787;
  }
`;