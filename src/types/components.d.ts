// src/types/components.d.ts
/// <reference types="vite/client" />

import { ComponentPropsWithoutRef } from 'react';

declare module '@radix-ui/react-slot' {
  export interface SlotProps extends ComponentPropsWithoutRef<'div'> {
    children?: React.ReactNode;
  }
}

// Isso resolve os erros de import dos componentes shadcn
declare global {
  namespace React {
    interface HTMLAttributes<T> {
      className?: string;
    }
  }
}

// Extensão para os componentes do shadcn/ui
declare module '@/components/ui/*' {
  const content: any;
  export default content;
}

// Resolve alias para api e types
declare module '@/api/*' {
  const content: any;
  export default content;
}

declare module '@/types' {
  const content: any;
  export default content;
}