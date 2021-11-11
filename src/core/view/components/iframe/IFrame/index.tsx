import React, { useState } from 'react';
import Iframe from 'react-iframe';
import { URL } from '~/core/domain/helpers';

export interface IFrameProps {
  href: string;
  id: string;
  fromLegacyEpa?: boolean;
  className?: string;
}

const IFrame: React.FC<IFrameProps> = ({ href, id, className, fromLegacyEpa, children }) => {
  const [showFrame, setShowFrame] = useState(false);

  return (
    <>
      <button type="button" data-bs-toggle="modal" data-bs-target={`#${id}`} className={className} onClick={() => setShowFrame(true)}>
        {children}
      </button>

      <div className="modal fade" id={id} aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            {showFrame && (
            <Iframe
              url={fromLegacyEpa ? URL.makeEPAPageUrl(href) : href}
              height="600vh"
              id={`iframe-${id}`}
              position="relative"
            />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default IFrame;
