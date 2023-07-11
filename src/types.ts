export interface INote {
  id: string;
  title: string;
  text: string;
  bgColor: string;
  trashed: boolean;
  labels: string[];
}

export interface ILabel {
  id: string;
  name: string;
}

export interface IactionUpdatePayload {
  id: string;
  title?: string;
  text?: string;
  bgColor?: string;
  label?: string;
}

export interface IRootState {
  notes: INote[];
  labels: ILabel[];
  activeNoteId: string;
}