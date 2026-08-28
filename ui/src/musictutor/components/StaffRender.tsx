import abcjs from 'abcjs';
import { useEffect, useRef } from 'react';

type StaffRenderProps = {
  tune: string;
};

export const StaffRender = ({ tune }: StaffRenderProps) => {
  const staffRef = useRef(null);

  useEffect(() => {
    if (staffRef.current) {
      abcjs.renderAbc(staffRef.current, tune, { scale: 1.5, staffwidth: 150 });
    }
  }, [tune]);

  return <div ref={staffRef} />;
};
