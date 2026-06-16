import React from 'react';
import Image from 'next/image';

export default function FortisLogo({ size = 'md', className = '' }) {
  const sizes = {
    sm: { width: 40, height: 40 },
    md: { width: 80, height: 80 },
    lg: { width: 120, height: 120 },
    xl: { width: 160, height: 160 },
  };

  const sizeConfig = sizes[size] || sizes.md;

  return (
    <div className={`relative ${className}`}>
      <Image
        src={process.env.NEXT_PUBLIC_FORTIS_LOGO_URL || '/placeholder-logo.png'}
        alt="FORTIS INVICTA LTD"
        width={sizeConfig.width}
        height={sizeConfig.height}
        priority
        className="object-contain"
      />
    </div>
  );
}