import { INote, IAction, IupdateNote } from "./types";

export const actions = {
  createNote: () => {
    const action: IAction = {
      type: 'note/created'
    };

    return action;
  },

  updateNote: (payload: IupdateNote) => {
    const action: IAction = {
      type: 'note/updated',
      payload
    };

    return action;
  },

  deleteNote: (noteId: number) => {
    const action: IAction = {
      type: 'note/deleted',
      payload: noteId
    };

    return action;
  },
};

export function notesReducer(notes: INote[], action: IAction) {
  switch (action.type) {
    case 'note/created': {
      const nextNotes = [
        ...notes,
        {
          id: getNextId(),
          title: '',
          text: '',
          bgColor: '#ffffff'
        }
      ];

      return nextNotes;
    }
    case 'note/deleted': {
      console.log(notes)

      const nextNotes = notes.filter(note => note.id !== action.payload);

      console.log(nextNotes);
      
      return nextNotes;
    }
    case 'note/updated': {
      // I'm mutating state on intention
      // I don't want my components to rerender because I use div[contentedtiable=true]
      // when this div is getting rerendered, cursor jumps to the beginning of the div
      notes.forEach(note => {
        if (note.id === action.payload.id) {
          if (action.payload.title) note.title = action.payload.title;
          if (action.payload.text) note.text = action.payload.text;
          if (action.payload.bgColor) note.bgColor = action.payload.bgColor;  
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