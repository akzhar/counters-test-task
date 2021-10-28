import React from 'react';

type TLayoutProps = {
  children: React.ReactNode
};

const Layout: React.FC<TLayoutProps> = (props: TLayoutProps) => (
  <div className="layout">
    {props.children}
  </div>
);

export default Layout;
