import React from 'react';

export interface WindowProps {
  children: React.ReactNode
}

export const Window = () => (
  <div className="Window">
    <div>Logo</div>
    <div>Title</div>
    <div>Buttons</div>
  </div>
);
