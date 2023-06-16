export interface INote {
  id: number;
  title: string;
  text: string;
  bgColor: string;
}

export interface IAction {
  type: 'note/created' | 'note/updated' | 'note/deleted';
  payload?: any;
}

export interface IupdateNote {
  id: number;
  title?: string;
  text?: string;
  bgColor?: string;
}