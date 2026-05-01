'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export default function BrandLogo({ className, imageClassName, priority = false }: BrandLogoProps) {
  return (
    <div className={cn('relative overflow-hidden bg-white', className)}>
      <Image
        src="/images/logo.png"
        alt="Avimed"
        fill
        priority={priority}
        sizes="80px"
        className={cn('object-contain', imageClassName)}
      />
    </div>
  );
}
