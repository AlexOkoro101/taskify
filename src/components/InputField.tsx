import React, { useRef } from 'react';
import './styles.css';

interface Props {
  todo: string;
  settodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({todo, settodo, handleAdd}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="input" onSubmit={(e) => {
      handleAdd(e)
      inputRef.current?.blur();
      }}>
      <input ref={inputRef} type="text" value={todo} onChange={(e) => settodo(e.target.value)} placeholder="Enter a task" className="input__box" />
      <button className="input__submit" type="submit">Go</button>
    </form>
  )
};

export default InputField;