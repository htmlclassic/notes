export interface INote {
  id: string;
  title: string;
  text: string;
  bgColor: string;
  trashed: boolean;
  labels: string[];
}

export interface IactionUpdatePayload {
  id: string;
  title?: string;
  text?: string;
  bgColor?: string;
  label?: string;
}