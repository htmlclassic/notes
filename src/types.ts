export interface INote {
  id: number;
  title: string;
  text: string;
  bgColor: string;
}

export interface InoteUpdatePayload {
  id: number;
  title?: string;
  text?: string;
  bgColor?: string;
}

export type ActionType = InoteCreate | InoteDelete | InoteUpdate;

interface InoteCreate {
  type: 'note/created';
}

interface InoteDelete {
  type: 'note/deleted';
  payload: number;
}

interface InoteUpdate {
  type: 'note/updated';
  payload: InoteUpdatePayload;
}