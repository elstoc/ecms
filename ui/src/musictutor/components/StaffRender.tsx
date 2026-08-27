import abcjs from 'abcjs';
import { useEffect, useRef } from 'react';

type StaffRenderProps = {
  tune: string;
};

export const StaffRender = ({ tune }: StaffRenderProps) => {
  const staffRef = useRef(null);

  useEffect(() => {
    if (staffRef.current) {
      abcjs.renderAbc(staffRef.current, tune, { scale: 2, staffwidth: 200 });
    }
  }, [tune]);

  return (
    <div>
      <div style={{ width: '100px' }} ref={staffRef}></div>
    </div>
  );
};
