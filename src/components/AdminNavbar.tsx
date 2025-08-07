'use client';
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Chip } from '@heroui/react';
import { HomeIcon, CubeIcon, BookOpenIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    // Clear any stored auth <data value=""></data>
    // localStorage.removeItem('admin_session');
    // sessionStorage.clear();
    // // Redirect to login page
    // window.location.href = '/login';
    await signOut();
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: HomeIcon,
      color: 'default' as const,
    },
    {
      name: 'Materials',
      href: '/admin/materials',
      icon: CubeIcon,
      color: 'success' as const,
    },
    {
      name: 'Menus',
      href: '/admin/menus',
      icon: BookOpenIcon,
      color: 'danger' as const,
    },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-white border-b-4 border-green-600 shadow-lg" maxWidth="full">
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        <NavbarBrand>
          <Link href="/admin" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <HomeIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="font-black text-green-600 text-lg">SENJA DI MENTARI</p>
              <p className="text-sm text-gray-600 font-semibold">Admin Panel</p>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <NavbarItem key={item.name} isActive={isActive}>
              <Link href={item.href}>
                <Button
                  variant={isActive ? 'solid' : 'flat'}
                  color={isActive ? item.color : 'default'}
                  startContent={<Icon className="h-4 w-4" />}
                  className={`font-semibold ${isActive ? 'shadow-lg' : ''}`}
                >
                  {item.name}
                </Button>
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>

      {/* Right side content */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <Chip color="warning" variant="flat" className="font-bold">
            Admin Mode
          </Chip>
        </NavbarItem>
        <NavbarItem>
          <Button color="danger" variant="flat" startContent={<ArrowRightOnRectangleIcon className="h-4 w-4" />} onPress={handleSignOut} className="font-semibold">
            Sign Out
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-white border-r-4 border-green-600">
        <div className="flex flex-col gap-4 p-4">
          <div className="pb-4 border-b border-gray-200">
            <Chip color="warning" variant="flat" className="font-bold">
              Admin Mode
            </Chip>
          </div>

          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <NavbarMenuItem key={item.name}>
                <Link href={item.href} className="w-full">
                  <Button
                    variant={isActive ? 'solid' : 'flat'}
                    color={isActive ? item.color : 'default'}
                    startContent={<Icon className="h-5 w-5" />}
                    className={`w-full justify-start font-semibold ${isActive ? 'shadow-lg' : ''}`}
                    onPress={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Button>
                </Link>
              </NavbarMenuItem>
            );
          })}

          <NavbarMenuItem className="pt-4 border-t border-gray-200">
            <Button
              color="danger"
              variant="flat"
              startContent={<ArrowRightOnRectangleIcon className="h-5 w-5" />}
              onPress={handleSignOut}
              className="w-full justify-start font-semibold"
            >
              Sign Out
            </Button>
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </Navbar>
  );
}
