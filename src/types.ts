export interface INote {
  id: string;
  title: string;
  text: string;
  bgColor: string;
  labels: string[];
}

export interface IactionDelete {
  type: string;
  payload: string;
}

export interface IactionUpdate {
  type: string;
  payload: {
    id: string;
    title?: string;
    text?: string;
    bgColor?: string;
    label?: string;
  };
}

export interface IactionUpdatePayload {
  id: string;
  title?: string;
  text?: string;
  bgColor?: string;
}

export type LabelsType = string[];