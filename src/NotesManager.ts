import { INote } from "./types";

interface IAction {
  type: 'add' | 'delete' | 'update';
  id ?: number;
  title ?: string;
  text ?: string;
  bgColor ?: string;
}

export function notesReducer(notes: INote[], action: IAction) {
  switch (action.type) {
    case 'add': {
      const nextNotes = [
        ...notes,
        {
          id: getNextId(),
          title: action.title,
          text: action.text,
          bgColor: '#ffffff'
        }
      ];

      return nextNotes;
    }
    case 'delete': {
      const nextNotes = notes.filter(note => note.id !== action.id);
      
      return nextNotes;
    }
    case 'update': {
      // I'm mutating state on intention
      // I don't want my components to rerender because I use div[contentedtiable=true]
      // when this div is getting rerendered, cursor jumps to the beginning of the div
      notes.forEach(note => {
        if (note.id === action.id) {
          if (action.title) note.title = action.title;
          if (action.text) note.text = action.text;
          if (action.bgColor) note.bgColor = action.bgColor;  
        }
      });

      localStorage.setItem('notes', JSON.stringify(notes));

      return notes;
    }
    default:
      // not sure I need this line anymore. I wrote it before I got into TypeScript
      throw new Error('Unknown action type: ' + action.type);
  }
}

export function getNotes(): INote[] | [] {
  const notes = localStorage.getItem('notes');

  return notes ? JSON.parse(notes) : [];
}

export function getNextId() {
  const id = getNotes().at(-1)?.id;

  if (!id) return 0;

  return id + 1;
}