import { ContentWithSidebar } from '@/site/components/ContentWithSidebar';

import { StaffRender } from './StaffRender';

const tune = 'L: 1/4\n' + "F,E''";

export const MusicTutor = () => {
  return (
    <ContentWithSidebar sidebar={null}>
      <StaffRender tune={tune} />
    </ContentWithSidebar>
  );
};
