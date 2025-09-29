import { Outlet } from 'react-router-dom';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { DesktopMenu } from './DesktopMenu/DesktopMenu';

export const Layout = () => {
  return (
    <>
      <DesktopMenu />
      <MobileMenu />
      <Outlet />
    </>
  );
};
