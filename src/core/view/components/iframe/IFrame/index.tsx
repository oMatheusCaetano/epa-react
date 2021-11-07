import React from 'react';
import Iframe from 'react-iframe';
import { URL } from '~/core/helpers';

// import { Container } from './styles';

export interface IFrameProps {
  href: string;
  id: string;
  fromLegacyEpa?: boolean;
  className?: string;
}

const IFrame: React.FC<IFrameProps> = ({ href, id, className, fromLegacyEpa, children }) => (
  <>
    <button type="button" data-bs-toggle="modal" data-bs-target={`#${id}`} className={className}>
      {children}
    </button>

    <div className="modal fade" id={id} aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <Iframe
            url={fromLegacyEpa ? URL.makeEPAPageUrl(href) : href}
            height="600vh"
            id={`iframe-${id}`}
            className="myClassname"
            position="relative"
          />
        </div>
      </div>
    </div>
  </>
);

export default IFrame;
