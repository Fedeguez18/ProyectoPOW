"use client";

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';

export default function BackButton({ href = '/exhibiciones', className = '', children = 'Volver a Exhibiciones', title, ariaLabel }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    // Si hay historial, vamos hacia atrás; si no, llevamos al href proporcionado
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push(href);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e);
        }
      }}
      className={className || 'aestheticBackLink'}
      title={title || ariaLabel || 'Volver a la lista de exhibiciones'}
      aria-label={ariaLabel || title || 'Volver a la lista de exhibiciones'}
    >
      {/* Simple textual back arrow for clear affordance */}
      <span className="backIcon">&lt;</span>
      <span>{children}</span>
    </button>
  );
}

BackButton.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
};
