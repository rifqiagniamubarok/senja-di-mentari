'use client';
import { Card, CardBody, CardHeader, Button, Chip } from '@heroui/react';
import { ShoppingBagIcon, StarIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
const data = {
  matrials: [
    {
      id: 1,
      title: 'Kintamani',
      brand: 'sakha',
      description: '100% Arabica coffee from Kintamani, Bali. Known for its bright acidity and fruity notes.',
      perunit: '10 - 12 grams',
      price: 8000,
      publish: true,
    },
    {
      id: 2,
      title: 'Gold Breakfast',
      brand: 'Arutala',
      description: '70% Arabica and 30% Robusta blend. A perfect morning coffee with a rich flavor.',
      perunit: '10 - 12 grams',
      price: 5000,
      publish: true,
    },
    {
      id: 3,
      title: 'Fresh milk',
      brand: 'Greenfields',
      description: 'Fresh milk from Greenfields, perfect for your coffee or as a drink on its own.',
      perunit: '100 ml',
      price: 2500,
      publish: true,
    },
  ],
  menus: [
    { id: 1, title: 'Espresso Full Arabica', matrials: [1], price: 10000, publish: true },
    { id: 2, title: 'Espresso Blend', matrials: [2], price: 7000, publish: true },
    { id: 3, title: 'Latte with coffee Blend', matrials: [2, 3], price: 13000, publish: true },
    { id: 4, title: 'Latte with full arabica', matrials: [1, 3], price: 15000, publish: true },
  ],
};
function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
}
function getMaterialsByIds(ids: number[]) {
  return data.matrials.filter((material) => ids.includes(material.id));
}
export default function Home() {
  return (
    <div className="min-h-screen bg-white border-16 border-green-600" style={{ borderWidth: '16px' }}>
      {' '}
      {/* Hero Section */}{' '}
      <div className="relative overflow-hidden bg-white border-b-8 border-green-600">
        {' '}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          {' '}
          <div className="text-center">
            {' '}
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-yellow-300 mb-6 stroke-red-600 drop-shadow-2xl"
              style={{ textShadow: '3px 3px 0px #dc2626, -1px -1px 0px #dc2626, 1px -1px 0px #dc2626, -1px 1px 0px #dc2626' }}
            >
              {' '}
              SENJA DI MENTARI{' '}
            </h1>{' '}
            <p className="text-xl sm:text-2xl text-green-800 font-bold mb-8 max-w-3xl mx-auto drop-shadow-lg"> Where every cup tells a story of sunrise and sunset flavors </p>{' '}
            <div className="flex justify-center items-center">
              {' '}
              <Link href="/payment">
                <Button
                  size="lg"
                  className="bg-red-600 text-white font-black hover:bg-red-500 border-4 border-yellow-400 shadow-2xl text-lg px-8 py-4"
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
          {data.matrials
            .filter((material) => material.publish)
            .map((material) => (
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
            {data.menus
              .filter((menu) => menu.publish)
              .map((menu) => {
                const menuMaterials = getMaterialsByIds(menu.matrials);
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
                            {menuMaterials.map((material) => (
                              <Chip key={material.id} size="sm" variant="flat" className="bg-green-600 text-white font-bold">
                                {' '}
                                {material.title}{' '}
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
                          {menuMaterials.map((material) => (
                            <li key={material.id} className="flex justify-between items-center py-1">
                              {' '}
                              <span>
                                • {material.title} ({material.brand})
                              </span>{' '}
                              <span className="text-red-600 font-bold">{material.perunit}</span>{' '}
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
