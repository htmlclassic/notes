import { AddLabelsButton, RemoveLabelsButton } from "./Buttons";
import { LabelState } from "./types";
import styled from "styled-components";
import { useState } from "react";

interface LabelProps {
  labelId: string;
  labelName: string;
  labelState: LabelState;
  isNoteSingle: boolean;
  handleChange: (opt: 0 | 1) => void;
}

export function Label({
  labelId,
  labelName,
  labelState,
  isNoteSingle,
  handleChange
}: LabelProps) {
  const [state, setState] = useState(labelState);
  const isChecked = state === LabelState.all;

  return (
    <LabelItem>
      {
        !isNoteSingle ?
        <Checkbox>
          <AddLabelsButton
            active={state === LabelState.all}
            onClick={() => {
              setState(LabelState.all);
              handleChange(LabelState.all);
            }}
            title="Add label to all notes"
          />
          <RemoveLabelsButton
            active={state === LabelState.none}
            onClick={() => {
              setState(LabelState.none);
              handleChange(LabelState.none);
            }}
            title="Remove label from all notes"
          />
        </Checkbox>
        :
        <input
          checked={isChecked}
          type="checkbox"
          id={labelId}
          onChange={() => {
            const nextState = isChecked ? LabelState.none : LabelState.all;

            setState(nextState);
            handleChange(nextState);
          }}
        />
      }
      <Lbl htmlFor={labelId}>{ labelName }</Lbl>
    </LabelItem>
  );
}

const Lbl = styled.label`
  flex-grow: 1;
  padding: 10px 0;
  user-select: none;
  margin-left: 15px;
`;

const LabelItem = styled.li`
  padding: 0 10px;
  transition: all 0.3s;
  border-radius: 5px;

  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(209, 209, 209, 0.3);
  }
`;

const Checkbox = styled.div`
  border-radius: 10px;
  padding: 5px;
  background-color: white;

  display: flex;
  gap: 10px
`;