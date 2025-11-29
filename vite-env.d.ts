/// <reference types="vite/client" />

declare module 'react-dom/client' {
  import React from 'react';
  export interface Root {
    render(children: React.ReactNode): void;
    unmount(): void;
  }
  export function createRoot(container: Element | DocumentFragment, options?: any): Root;
  export function hydrateRoot(container: Element | DocumentFragment, initialChildren: React.ReactNode, options?: any): Root;
}

declare module 'react-icons/fa' {
  import { IconType } from 'react-icons';
  export const FaBolt: IconType;
  export const FaBox: IconType;
  export const FaChartLine: IconType;
  export const FaIndustry: IconType;
  export const FaLock: IconType;
}
