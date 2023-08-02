export interface INote {
  id: string;
  title: string;
  text: string;
  bgColor: string;
  order: number;
  trashed: boolean;
  pinned: boolean;
  modifiedDate: number;
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
}

export interface IRootState {
  notes: INote[];
  labels: ILabel[];
  selectedNotes: string[];
  activeNoteId: string;
}