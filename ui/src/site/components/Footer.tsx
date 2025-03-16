import { useSiteConfig } from '../hooks/useSiteQueries';

import './Footer.scss';

export const Footer = () => {
    const siteConfig = useSiteConfig();
    return (
        <div className='footer'>
            {siteConfig.footerText}
        </div>
    );
};
