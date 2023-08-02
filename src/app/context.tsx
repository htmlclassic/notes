import { createContext, useState } from 'react';
import { INote } from '../types';

interface I {
  open: (notes: INote[]) => void;
  close: () => void;
  show: boolean;
  notes: INote[];
}
const UpdateNotesLabelsContext = createContext<I>(null!);

function UpdateNotesLabelsProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [notes, setNotes] = useState<INote[]>([]);

  const open = (notes: INote[]) => {
    setShow(true);
    setNotes(notes);
  }
  
  const close = () => setShow(false);

  return (
    <UpdateNotesLabelsContext.Provider value={{
      open,
      close,
      show,
      notes
    }}>
      {children}
    </UpdateNotesLabelsContext.Provider>
  );
}

export { UpdateNotesLabelsProvider, UpdateNotesLabelsContext };