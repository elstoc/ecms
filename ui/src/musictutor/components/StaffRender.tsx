import abcjs from 'abcjs';
import { useEffect, useRef } from 'react';

type StaffRenderProps = {
  tune: string;
};

export const StaffRender = ({ tune }: StaffRenderProps) => {
  const staffRef = useRef(null);

  useEffect(() => {
    if (staffRef.current) {
      abcjs.renderAbc(staffRef.current, tune, { scale: 3 });
    }
  }, [tune]);

  return <div ref={staffRef}></div>;
};
