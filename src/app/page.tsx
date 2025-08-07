'use client';
import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react';
import { ShoppingBagIcon, StarIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Material = {
  id: string;
  title: string;
  brand: string;
  description: string;
  perunit: string;
  price: number;
  publish: boolean;
};

type Menu = {
  id: string;
  title: string;
  price: number;
  publish: boolean;
  menuMaterials: {
    material: Material;
  }[];
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}

export default function Home() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/published');
        const data = await response.json();
        setMaterials(data.materials || []);
        setMenus(data.menus || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white border-16 border-green-600 flex items-center justify-center" style={{ borderWidth: '16px' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading coffee shop...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white border-16 border-green-600" style={{ borderWidth: '16px' }}>
      {' '}
      {/* Hero Section */}{' '}
      <div className="relative overflow-hidden bg-white border-b-8 border-green-600 min-h-screen flex items-center">
        {' '}
        {/* Coffee Cup Illustrations - Multiple Positions */}
        <div className="absolute inset-0 z-0">
          {/* Keep White Background */}
          <div className="absolute inset-0 bg-white"></div>

          {/* Coffee Cup 1 - Top Left - Realistic Style */}
          <div className="absolute top-16 left-12 opacity-25 transform rotate-12 scale-75">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 35 L20 85 Q20 95 30 95 L85 95 Q95 85 95 85 L95 35 Z" fill="#8B4513" stroke="#654321" strokeWidth="2" />
              <path d="M95 50 Q110 50 110 65 Q110 80 95 80" stroke="#654321" strokeWidth="4" fill="none" />
              <ellipse cx="57.5" cy="40" rx="32" ry="8" fill="#2F1B14" />
              <path d="M50 30 Q52 25 50 20" stroke="#D3D3D3" strokeWidth="3" fill="none" opacity="0.7" />
              <path d="M57 30 Q59 25 57 20" stroke="#D3D3D3" strokeWidth="3" fill="none" opacity="0.7" />
              <path d="M64 30 Q66 25 64 20" stroke="#D3D3D3" strokeWidth="3" fill="none" opacity="0.7" />
            </svg>
          </div>

          {/* Coffee Cup 2 - Top Right - Outline Style */}
          <div className="absolute top-20 right-16 opacity-30 transform -rotate-15 scale-90">
            <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 40 L25 100 Q25 110 35 110 L100 110 Q110 100 110 100 L110 40 Z" fill="none" stroke="#059669" strokeWidth="4" />
              <path d="M110 55 Q125 55 125 70 Q125 85 110 85" stroke="#059669" strokeWidth="4" fill="none" />
              <ellipse cx="67.5" cy="45" rx="38" ry="10" fill="#CD853F" opacity="0.6" />
              <path d="M58 35 Q60 28 58 22" stroke="#888888" strokeWidth="2.5" fill="none" />
              <path d="M67 35 Q69 28 67 22" stroke="#888888" strokeWidth="2.5" fill="none" />
              <path d="M76 35 Q78 28 76 22" stroke="#888888" strokeWidth="2.5" fill="none" />
            </svg>
          </div>

          {/* Coffee Cup 3 - Bottom Left - Filled Style */}
          <div className="absolute bottom-24 left-20 opacity-35 transform rotate-6 scale-110">
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 50 L30 120 Q30 130 40 130 L115 130 Q125 120 125 120 L125 50 Z" fill="#DC2626" stroke="#B91C1C" strokeWidth="3" />
              <path d="M125 65 Q145 65 145 85 Q145 105 125 105" stroke="#B91C1C" strokeWidth="5" fill="none" />
              <ellipse cx="77.5" cy="55" rx="42" ry="12" fill="#1F1F1F" />
              <path d="M65 42 Q68 35 65 28" stroke="#E5E5E5" strokeWidth="4" fill="none" />
              <path d="M77 42 Q80 35 77 28" stroke="#E5E5E5" strokeWidth="4" fill="none" />
              <path d="M89 42 Q92 35 89 28" stroke="#E5E5E5" strokeWidth="4" fill="none" />
            </svg>
          </div>

          {/* Coffee Cup 4 - Bottom Right - Gradient Style */}
          <div className="absolute bottom-32 right-24 opacity-28 transform -rotate-8 scale-85">
            <svg width="130" height="130" viewBox="0 0 130 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EAB308" />
                  <stop offset="100%" stopColor="#CA8A04" />
                </linearGradient>
              </defs>
              <path d="M22 38 L22 95 Q22 105 32 105 L95 105 Q105 95 105 95 L105 38 Z" fill="url(#cupGradient)" stroke="#A16207" strokeWidth="2" />
              <path d="M105 53 Q120 53 120 68 Q120 83 105 83" stroke="#A16207" strokeWidth="4" fill="none" />
              <ellipse cx="63.5" cy="43" rx="36" ry="9" fill="#451A03" />
            </svg>
          </div>

          {/* Coffee Cup 5 - Center Left - Minimalist Style */}
          <div className="absolute top-1/2 left-8 transform -translate-y-1/2 opacity-20 rotate-45 scale-70">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 30 L18 75 Q18 82 25 82 L72 82 Q80 75 80 75 L80 30 Z" fill="none" stroke="#92400E" strokeWidth="3" />
              <path d="M80 42 Q92 42 92 55 Q92 68 80 68" stroke="#92400E" strokeWidth="3" fill="none" />
              <ellipse cx="49" cy="34" rx="28" ry="6" fill="#8B4513" opacity="0.7" />
            </svg>
          </div>

          {/* Coffee Cup 6 - Center Right - Decorative Style */}
          <div className="absolute top-1/3 right-12 opacity-32 transform -rotate-30 scale-65">
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 32 L20 80 Q20 88 28 88 L78 88 Q86 80 86 80 L86 32 Z" fill="#065F46" stroke="#047857" strokeWidth="3" />
              <path d="M86 45 Q98 45 98 58 Q98 71 86 71" stroke="#047857" strokeWidth="4" fill="none" />
              <ellipse cx="53" cy="36" rx="30" ry="7" fill="#CD853F" />
              {/* Coffee Bean Pattern */}
              <circle cx="45" cy="60" r="2" fill="#8B4513" opacity="0.6" />
              <circle cx="55" cy="65" r="2" fill="#8B4513" opacity="0.6" />
              <circle cx="50" cy="70" r="2" fill="#8B4513" opacity="0.6" />
            </svg>
          </div>

          {/* Enhanced Coffee Beans - More Visible */}
          <div className="absolute top-1/4 left-1/4 opacity-40">
            <div className="w-6 h-8 bg-amber-800 rounded-full transform rotate-12 shadow-lg border border-amber-900"></div>
          </div>
          <div className="absolute top-3/4 right-1/3 opacity-35">
            <div className="w-4 h-6 bg-amber-900 rounded-full transform -rotate-45 shadow-lg border border-amber-800"></div>
          </div>
          <div className="absolute bottom-1/3 left-1/3 opacity-45">
            <div className="w-5 h-7 bg-amber-700 rounded-full transform rotate-25 shadow-lg border border-amber-600"></div>
          </div>
          <div className="absolute top-2/3 right-1/4 opacity-30">
            <div className="w-4 h-6 bg-amber-800 rounded-full transform -rotate-60 shadow-lg border border-amber-900"></div>
          </div>
          <div className="absolute top-1/2 left-2/3 opacity-38">
            <div className="w-5 h-7 bg-amber-900 rounded-full transform rotate-30 shadow-lg border border-amber-800"></div>
          </div>

          {/* Coffee Bean SVG Illustrations */}
          {/* Coffee Bean 1 - Top Center */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-30 rotate-45 scale-75">
            <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="20" cy="30" rx="18" ry="28" fill="#8B4513" stroke="#654321" strokeWidth="2" />
              <path d="M20 8 Q20 30 20 52" stroke="#654321" strokeWidth="3" fill="none" />
              <ellipse cx="20" cy="30" rx="12" ry="22" fill="#A0522D" opacity="0.6" />
            </svg>
          </div>

          {/* Coffee Bean 2 - Right Side */}
          <div className="absolute top-1/3 right-8 opacity-25 transform -rotate-30 scale-90">
            <svg width="35" height="55" viewBox="0 0 35 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="17.5" cy="27.5" rx="16" ry="26" fill="#CD853F" stroke="#8B4513" strokeWidth="2" />
              <path d="M17.5 6 Q17.5 27.5 17.5 49" stroke="#8B4513" strokeWidth="2.5" fill="none" />
              <ellipse cx="17.5" cy="27.5" rx="10" ry="20" fill="#D2691E" opacity="0.5" />
            </svg>
          </div>

          {/* Coffee Bean 3 - Left Side */}
          <div className="absolute bottom-1/4 left-6 opacity-32 transform rotate-60 scale-80">
            <svg width="38" height="58" viewBox="0 0 38 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="19" cy="29" rx="17" ry="27" fill="#A0522D" stroke="#654321" strokeWidth="2" />
              <path d="M19 7 Q19 29 19 51" stroke="#654321" strokeWidth="3" fill="none" />
              <ellipse cx="19" cy="29" rx="11" ry="21" fill="#8B4513" opacity="0.7" />
            </svg>
          </div>

          {/* Coffee Bean 4 - Bottom Center */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 opacity-28 rotate-15 scale-85">
            <svg width="42" height="62" viewBox="0 0 42 62" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="21" cy="31" rx="19" ry="29" fill="#D2691E" stroke="#A0522D" strokeWidth="2" />
              <path d="M21 8 Q21 31 21 54" stroke="#A0522D" strokeWidth="3" fill="none" />
              <ellipse cx="21" cy="31" rx="13" ry="23" fill="#CD853F" opacity="0.6" />
            </svg>
          </div>

          {/* Coffee Bean 5 - Top Left Corner */}
          <div className="absolute top-8 left-8 opacity-35 transform -rotate-45 scale-70">
            <svg width="32" height="48" viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="16" cy="24" rx="14" ry="22" fill="#8B4513" stroke="#654321" strokeWidth="2" />
              <path d="M16 6 Q16 24 16 42" stroke="#654321" strokeWidth="2.5" fill="none" />
              <ellipse cx="16" cy="24" rx="9" ry="17" fill="#A0522D" opacity="0.8" />
            </svg>
          </div>

          {/* Coffee Bean 6 - Top Right Corner */}
          <div className="absolute top-10 right-10 opacity-30 transform rotate-75 scale-65">
            <svg width="36" height="54" viewBox="0 0 36 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="18" cy="27" rx="16" ry="25" fill="#CD853F" stroke="#8B4513" strokeWidth="2" />
              <path d="M18 7 Q18 27 18 47" stroke="#8B4513" strokeWidth="3" fill="none" />
              <ellipse cx="18" cy="27" rx="10" ry="19" fill="#D2691E" opacity="0.6" />
            </svg>
          </div>

          {/* Coffee Bean 7 - Bottom Left */}
          <div className="absolute bottom-12 left-12 opacity-33 transform rotate-105 scale-75">
            <svg width="34" height="52" viewBox="0 0 34 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="17" cy="26" rx="15" ry="24" fill="#A0522D" stroke="#654321" strokeWidth="2" />
              <path d="M17 6 Q17 26 17 46" stroke="#654321" strokeWidth="2.5" fill="none" />
              <ellipse cx="17" cy="26" rx="10" ry="18" fill="#8B4513" opacity="0.7" />
            </svg>
          </div>

          {/* Coffee Bean 8 - Bottom Right */}
          <div className="absolute bottom-8 right-8 opacity-27 transform -rotate-15 scale-80">
            <svg width="40" height="58" viewBox="0 0 40 58" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="20" cy="29" rx="18" ry="27" fill="#D2691E" stroke="#A0522D" strokeWidth="2" />
              <path d="M20 7 Q20 29 20 51" stroke="#A0522D" strokeWidth="3" fill="none" />
              <ellipse cx="20" cy="29" rx="12" ry="21" fill="#CD853F" opacity="0.5" />
            </svg>
          </div>

          {/* Scattered Small Coffee Beans */}
          <div className="absolute top-1/5 left-1/5 opacity-40 transform rotate-30 scale-50">
            <svg width="28" height="42" viewBox="0 0 28 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="14" cy="21" rx="12" ry="19" fill="#8B4513" />
              <path d="M14 5 Q14 21 14 37" stroke="#654321" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="absolute top-2/3 left-1/6 opacity-35 transform -rotate-60 scale-45">
            <svg width="26" height="40" viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="13" cy="20" rx="11" ry="18" fill="#A0522D" />
              <path d="M13 4 Q13 20 13 36" stroke="#654321" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="absolute top-1/6 right-1/5 opacity-38 transform rotate-90 scale-55">
            <svg width="30" height="44" viewBox="0 0 30 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="15" cy="22" rx="13" ry="20" fill="#CD853F" />
              <path d="M15 5 Q15 22 15 39" stroke="#8B4513" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="absolute bottom-1/5 right-1/6 opacity-32 transform -rotate-45 scale-48">
            <svg width="24" height="38" viewBox="0 0 24 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="12" cy="19" rx="10" ry="17" fill="#D2691E" />
              <path d="M12 4 Q12 19 12 34" stroke="#A0522D" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Enhanced Steam Effects */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 opacity-25">
            <div className="flex space-x-2">
              <div className="w-2 h-20 bg-gray-400 rounded-full shadow-sm"></div>
              <div className="w-2 h-24 bg-gray-300 rounded-full shadow-sm"></div>
              <div className="w-2 h-22 bg-gray-400 rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
        {/* Content Overlay */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
          {' '}
          <div className="text-center">
            {' '}
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-yellow-300 mb-6 stroke-red-600 drop-shadow-2xl relative z-20"
              style={{ textShadow: '3px 3px 0px #dc2626, -1px -1px 0px #dc2626, 1px -1px 0px #dc2626, -1px 1px 0px #dc2626' }}
            >
              {' '}
              SENJA DI MENTARI{' '}
            </h1>{' '}
            <p className="text-xl sm:text-2xl text-green-800 font-bold mb-8 max-w-3xl mx-auto drop-shadow-lg relative z-20 bg-white/90 rounded-lg py-4 px-6 border-4 border-green-600">
              Where every cup tells a story of sunrise and sunset flavors
            </p>{' '}
            <div className="flex justify-center items-center relative z-20">
              {' '}
              <Link href="/payment">
                <Button
                  size="lg"
                  className="bg-red-600 text-white font-black hover:bg-red-500 border-4 border-yellow-400 shadow-2xl text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300"
                  startContent={<QrCodeIcon className="w-6 h-6" />}
                >
                  PAYMENT & DONATION
                </Button>
              </Link>
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </div>{' '}
      {/* Self Service Materials Section */}{' '}
      <section id="materials-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {' '}
        <div className="text-center mb-12">
          {' '}
          <div className="flex items-center justify-center mb-4">
            {' '}
            <ShoppingBagIcon className="w-8 h-8 text-red-600 mr-3" />{' '}
            <h2
              className="text-3xl sm:text-4xl font-black text-yellow-300 drop-shadow-lg"
              style={{ textShadow: '2px 2px 0px #dc2626, -1px -1px 0px #dc2626, 1px -1px 0px #dc2626, -1px 1px 0px #dc2626' }}
            >
              SELF SERVICE MATERIALS
            </h2>{' '}
          </div>{' '}
          <p className="text-lg text-green-800 font-semibold max-w-2xl mx-auto drop-shadow-md"> Premium coffee beans and fresh ingredients for your perfect brew at home </p>{' '}
        </div>{' '}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {' '}
          {materials.map((material) => (
            <Card key={material.id} className="hover:shadow-xl transition-shadow duration-300 bg-white border-4 border-green-600 shadow-lg">
              {' '}
              <CardHeader className="pb-3 bg-gradient-to-r from-green-400 to-green-500">
                {' '}
                <div className="flex justify-between items-start w-full">
                  {' '}
                  <div>
                    {' '}
                    <h3 className="text-xl font-black text-white drop-shadow-md">{material.title}</h3>{' '}
                    <Chip size="sm" variant="flat" className="mt-1 bg-red-600 text-white font-bold">
                      {' '}
                      {material.brand}{' '}
                    </Chip>{' '}
                  </div>{' '}
                  <div className="text-right">
                    {' '}
                    <p className="text-2xl font-black text-yellow-300 drop-shadow-md">{formatPrice(material.price)}</p>{' '}
                    <p className="text-sm text-white font-semibold">{material.perunit}</p>{' '}
                  </div>{' '}
                </div>{' '}
              </CardHeader>{' '}
              <CardBody className="pt-0 bg-green-50">
                {' '}
                <p className="text-green-800 font-semibold mb-4">{material.description}</p>{' '}
              </CardBody>{' '}
            </Card>
          ))}{' '}
        </div>{' '}
      </section>{' '}
      {/* Crafted Menu Section */}{' '}
      <section id="menu-section" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-500 via-red-600 to-red-700">
        {' '}
        <div className="max-w-7xl mx-auto">
          {' '}
          <div className="text-center mb-12">
            {' '}
            <div className="flex items-center justify-center mb-4">
              {' '}
              <h2
                className="text-3xl sm:text-4xl font-black text-yellow-300 drop-shadow-lg"
                style={{ textShadow: '3px 3px 0px #059669, -1px -1px 0px #059669, 1px -1px 0px #059669, -1px 1px 0px #059669' }}
              >
                CRAFTED BY OUR BARISTAS
              </h2>{' '}
            </div>{' '}
            <p className="text-lg text-white font-bold max-w-2xl mx-auto drop-shadow-md"> Expertly crafted beverages made with love and precision, just for you </p>{' '}
          </div>{' '}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {' '}
            {menus.map((menu) => {
              return (
                <Card key={menu.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border-4 border-yellow-400 shadow-2xl">
                  {' '}
                  <CardHeader className="pb-3 bg-gradient-to-r from-yellow-400 to-yellow-500">
                    {' '}
                    <div className="flex justify-between items-start w-full">
                      {' '}
                      <div className="flex-1">
                        {' '}
                        <h3 className="text-xl font-black text-red-700 mb-2 drop-shadow-sm">{menu.title}</h3>{' '}
                        <div className="flex flex-wrap gap-2">
                          {' '}
                          {menu.menuMaterials.map((menuMaterial) => (
                            <Chip key={menuMaterial.material.id} size="sm" variant="flat" className="bg-green-600 text-white font-bold">
                              {' '}
                              {menuMaterial.material.title}{' '}
                            </Chip>
                          ))}{' '}
                        </div>{' '}
                      </div>{' '}
                      <div className="text-right ml-4">
                        {' '}
                        <p className="text-2xl font-black text-red-700">{formatPrice(menu.price)}</p>{' '}
                        <div className="flex items-center mt-1">
                          {' '}
                          <StarIcon className="w-4 h-4 text-red-600 fill-current" /> <StarIcon className="w-4 h-4 text-red-600 fill-current" />{' '}
                          <StarIcon className="w-4 h-4 text-red-600 fill-current" /> <StarIcon className="w-4 h-4 text-red-600 fill-current" />{' '}
                          <StarIcon className="w-4 h-4 text-red-600 fill-current" />{' '}
                        </div>{' '}
                      </div>{' '}
                    </div>{' '}
                  </CardHeader>{' '}
                  <CardBody className="pt-0 bg-green-50">
                    {' '}
                    <div className="mb-4">
                      {' '}
                      <p className="text-sm text-red-700 font-bold mb-2">Made with:</p>{' '}
                      <ul className="text-sm text-green-800 font-semibold">
                        {' '}
                        {menu.menuMaterials.map((menuMaterial) => (
                          <li key={menuMaterial.material.id} className="flex justify-between items-center py-1">
                            {' '}
                            <span>
                              • {menuMaterial.material.title} ({menuMaterial.material.brand})
                            </span>{' '}
                            <span className="text-red-600 font-bold">{menuMaterial.material.perunit}</span>{' '}
                          </li>
                        ))}{' '}
                      </ul>{' '}
                    </div>{' '}
                  </CardBody>{' '}
                </Card>
              );
            })}{' '}
          </div>{' '}
        </div>{' '}
      </section>{' '}
      {/* Footer */}{' '}
      <footer className="bg-green-700 text-white py-12 border-t-16 border-yellow-400" style={{ borderTopWidth: '16px' }}>
        {' '}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {' '}
          <div className="text-center">
            {' '}
            <h3
              className="text-2xl font-black mb-4 text-yellow-300 drop-shadow-lg"
              style={{ textShadow: '2px 2px 0px #dc2626, -1px -1px 0px #dc2626, 1px -1px 0px #dc2626, -1px 1px 0px #dc2626' }}
            >
              SENJA DI MENTARI
            </h3>{' '}
            <p className="text-white font-bold mb-6 drop-shadow-md"> Brewing the perfect moments from sunrise to sunset </p>{' '}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:space-x-6 sm:gap-0">
              {' '}
              <Button variant="light" className="text-yellow-300 hover:text-green-800 font-bold border-2 border-yellow-400 hover:bg-yellow-400 w-full sm:w-auto">
                {' '}
                ABOUT US{' '}
              </Button>{' '}
              <Button variant="light" className="text-yellow-300 hover:text-green-800 font-bold border-2 border-yellow-400 hover:bg-yellow-400 w-full sm:w-auto">
                {' '}
                CONTACT{' '}
              </Button>{' '}
              <Button variant="light" className="text-yellow-300 hover:text-green-800 font-bold border-2 border-yellow-400 hover:bg-yellow-400 w-full sm:w-auto">
                {' '}
                HOURS{' '}
              </Button>{' '}
              <Link href="/payment" className="w-full sm:w-auto">
                <Button
                  variant="light"
                  className="text-yellow-300 hover:text-green-800 font-bold border-2 border-yellow-400 hover:bg-yellow-400 w-full sm:w-auto"
                  startContent={<QrCodeIcon className="w-4 h-4" />}
                >
                  PAYMENT
                </Button>
              </Link>
            </div>{' '}
            <div className="mt-8 pt-8 border-t border-yellow-400 text-center text-yellow-200">
              {' '}
              <p className="font-bold">&copy; 2025 Senja di Mentari Coffee Shop. All rights reserved.</p>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </footer>{' '}
    </div>
  );
}
