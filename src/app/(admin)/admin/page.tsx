'use client';
import { Card, CardBody, CardHeader, Chip, Button } from '@heroui/react';
import { useEffect, useState } from 'react';
import AdminNavbar from '@/components/AdminNavbar';

type Material = {
  id: string;
  title: string;
  brand: string;
  description: string;
  perunit: string;
  price: number;
};

type Menu = {
  id: string;
  title: string;
  price: number;
  menuMaterials: {
    material: Material;
  }[];
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function AdminPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/admin/data');
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
      <div className="min-h-screen bg-white border-16 border-green-600 p-8 flex items-center justify-center" style={{ borderWidth: '16px' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <AdminNavbar />
      <div className="border-16 border-green-600 border-t-0 min-h-screen p-8" style={{ borderWidth: '16px', borderTopWidth: '0' }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your coffee materials and menu items</p>

            {/* Quick Actions */}
            <div className="flex gap-4 mt-6">
              <Button color="success" variant="flat" onPress={() => (window.location.href = '/admin/materials')}>
                Manage Materials
              </Button>
              <Button color="danger" variant="flat" onPress={() => (window.location.href = '/admin/menus')}>
                Manage Menus
              </Button>
            </div>
          </div>

        {/* Materials Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-green-600 text-white px-3 py-1 rounded-lg mr-3">Materials</span>
            <Chip color="success" variant="flat">
              {materials.length} items
            </Chip>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card key={material.id} className="border-2 border-green-200 hover:border-green-400 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800">{material.title}</h3>
                    <p className="text-sm text-gray-500">Brand: {material.brand}</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Per unit: {material.perunit}</p>
                      <p className="text-lg font-bold text-green-600">{formatPrice(material.price)}</p>
                    </div>
                    <Chip color="success" size="sm">
                      ID: {material.id}
                    </Chip>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Menus Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-lg mr-3">Menu Items</span>
            <Chip color="danger" variant="flat">
              {menus.length} items
            </Chip>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menus.map((menu) => (
              <Card key={menu.id} className="border-2 border-red-200 hover:border-red-400 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{menu.title}</h3>
                      <p className="text-xl font-bold text-red-600">{formatPrice(menu.price)}</p>
                    </div>
                    <Chip color="danger" size="sm">
                      ID: {menu.id}
                    </Chip>
                  </div>
                </CardHeader>
                <CardBody>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Materials used:</p>
                    <div className="flex flex-wrap gap-2">
                      {menu.menuMaterials.map((menuMaterial) => (
                        <Chip key={menuMaterial.material.id} color="warning" variant="flat" size="sm">
                          {menuMaterial.material.title} ({menuMaterial.material.brand})
                        </Chip>
                      ))}
                    </div>
                    {menu.menuMaterials.length === 0 && <p className="text-sm text-gray-500 italic">No materials assigned</p>}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-yellow-200">
            <CardBody className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Total Materials</h3>
              <p className="text-3xl font-bold text-yellow-600">{materials.length}</p>
            </CardBody>
          </Card>
          <Card className="border-2 border-yellow-200">
            <CardBody className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Total Menu Items</h3>
              <p className="text-3xl font-bold text-yellow-600">{menus.length}</p>
            </CardBody>
          </Card>
          <Card className="border-2 border-yellow-200">
            <CardBody className="text-center">
              <h3 className="text-lg font-semibold text-gray-800">Avg Menu Price</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {menus.length > 0 ? formatPrice(menus.reduce((sum, menu) => sum + menu.price, 0) / menus.length) : formatPrice(0)}
              </p>
            </CardBody>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
}
