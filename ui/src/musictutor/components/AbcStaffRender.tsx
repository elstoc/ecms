import abcjs from 'abcjs';
import { useEffect, useRef } from 'react';

type AbcStaffRenderProps = {
  tune: string;
};

export const AbcStaffRender = ({ tune }: AbcStaffRenderProps) => {
  const staffRef = useRef(null);

  useEffect(() => {
    if (staffRef.current) {
      abcjs.renderAbc(staffRef.current, tune, { scale: 1.5, staffwidth: 150, minPadding: 8 });
    }
  }, [tune]);

  return <div ref={staffRef} />;
};
