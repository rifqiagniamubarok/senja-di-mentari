'use client';
import { Card, CardBody, CardHeader, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Chip, Select, SelectItem } from '@heroui/react';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  publish: boolean;
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

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    materialIds: [] as string[],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [menusResponse, materialsResponse] = await Promise.all([fetch('/api/admin/menus'), fetch('/api/admin/materials')]);

      const menusData = await menusResponse.json();
      const materialsData = await materialsResponse.json();

      setMenus(menusData);
      setMaterials(materialsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedMenu(null);
    setIsEditing(false);
    setFormData({
      title: '',
      price: '',
      materialIds: [],
    });
    onOpen();
  };

  const handleEdit = (menu: Menu) => {
    setSelectedMenu(menu);
    setIsEditing(true);
    setFormData({
      title: menu.title,
      price: menu.price.toString(),
      materialIds: menu.menuMaterials.map((mm) => mm.material.id),
    });
    onOpen();
  };

  const handleView = (menu: Menu) => {
    setSelectedMenu(menu);
    setIsEditing(false);
    setFormData({
      title: menu.title,
      price: menu.price.toString(),
      materialIds: menu.menuMaterials.map((mm) => mm.material.id),
    });
    onOpen();
  };

  const handleDelete = (menu: Menu) => {
    setSelectedMenu(menu);
    onDeleteOpen();
  };

  const handleSubmit = async () => {
    try {
      const url = selectedMenu ? `/api/admin/menus/${selectedMenu.id}` : '/api/admin/menus';

      const method = selectedMenu ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchData();
        onClose();
      } else {
        console.error('Error saving menu');
      }
    } catch (error) {
      console.error('Error saving menu:', error);
    }
  };

  const handleTogglePublish = async (menu: Menu) => {
    try {
      const response = await fetch(`/api/admin/menus/${menu.id}/publish`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publish: !menu.publish }),
      });

      if (response.ok) {
        await fetchData();
      } else {
        console.error('Error toggling publish status');
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedMenu) return;

    try {
      const response = await fetch(`/api/admin/menus/${selectedMenu.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchData();
        onDeleteClose();
      } else {
        console.error('Error deleting menu');
      }
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <AdminNavbar />
        <div className="border-16 border-green-600 border-t-0 min-h-screen p-8 flex items-center justify-center" style={{ borderWidth: '16px', borderTopWidth: '0' }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading menus...</p>
          </div>
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Menu Management</h1>
              <p className="text-gray-600">Manage your coffee menu items</p>
            </div>
            <div className="flex gap-4">
              <Button color="success" startContent={<PlusIcon className="h-5 w-5" />} onPress={handleCreate}>
                Add Menu Item
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2 border-red-200">
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Total Menu Items</h3>
                <p className="text-3xl font-bold text-red-600">{menus.length}</p>
              </CardBody>
            </Card>
            <Card className="border-2 border-red-200">
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Published</h3>
                <p className="text-3xl font-bold text-success">{menus.filter((m) => m.publish).length}</p>
              </CardBody>
            </Card>
            <Card className="border-2 border-red-200">
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Unpublished</h3>
                <p className="text-3xl font-bold text-secondary">{menus.filter((m) => !m.publish).length}</p>
              </CardBody>
            </Card>
            <Card className="border-2 border-red-200">
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Avg Price</h3>
                <p className="text-3xl font-bold text-red-600">{menus.length > 0 ? formatPrice(menus.reduce((sum, m) => sum + m.price, 0) / menus.length) : formatPrice(0)}</p>
              </CardBody>
            </Card>
          </div>

          {/* Menus Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menus.map((menu) => (
              <Card key={menu.id} className="border-2 border-red-200 hover:border-red-400 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{menu.title}</h3>
                      <p className="text-xl font-bold text-red-600">{formatPrice(menu.price)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Chip color={menu.publish ? 'success' : 'default'} size="sm" variant="flat">
                          {menu.publish ? 'Published' : 'Unpublished'}
                        </Chip>
                      </div>
                    </div>
                    <Chip color="danger" size="sm">
                      ID: {menu.id}
                    </Chip>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="mb-4">
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
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" color="default" variant="flat" startContent={<EyeIcon className="h-4 w-4" />} onPress={() => handleView(menu)}>
                      View
                    </Button>
                    <Button size="sm" color="warning" variant="flat" startContent={<PencilIcon className="h-4 w-4" />} onPress={() => handleEdit(menu)}>
                      Edit
                    </Button>
                    <Button size="sm" color={menu.publish ? 'secondary' : 'success'} variant="flat" onPress={() => handleTogglePublish(menu)}>
                      {menu.publish ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button size="sm" color="danger" variant="flat" startContent={<TrashIcon className="h-4 w-4" />} onPress={() => handleDelete(menu)}>
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Menu Form Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
              <ModalHeader>{selectedMenu && !isEditing ? 'Menu Details' : selectedMenu ? 'Edit Menu' : 'Create New Menu'}</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input label="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} isReadOnly={!!(selectedMenu && !isEditing)} />
                  <Input
                    label="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    isReadOnly={!!(selectedMenu && !isEditing)}
                  />
                  <Select
                    label="Materials"
                    placeholder="Select materials for this menu"
                    selectionMode="multiple"
                    selectedKeys={formData.materialIds}
                    onSelectionChange={(keys) => setFormData({ ...formData, materialIds: Array.from(keys) as string[] })}
                    isDisabled={!!(selectedMenu && !isEditing)}
                  >
                    {materials.map((material) => (
                      <SelectItem key={material.id}>
                        {material.title} ({material.brand}) - {formatPrice(material.price)}
                      </SelectItem>
                    ))}
                  </Select>
                  {selectedMenu && !isEditing && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Current materials:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedMenu.menuMaterials.map((menuMaterial) => (
                          <Chip key={menuMaterial.material.id} color="warning" variant="flat" size="sm">
                            {menuMaterial.material.title} ({menuMaterial.material.brand})
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {selectedMenu && !isEditing ? 'Close' : 'Cancel'}
                </Button>
                {(!selectedMenu || isEditing) && (
                  <Button color="success" onPress={handleSubmit}>
                    {selectedMenu ? 'Update' : 'Create'}
                  </Button>
                )}
                {selectedMenu && !isEditing && (
                  <Button color="warning" onPress={() => setIsEditing(true)}>
                    Edit
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
            <ModalContent>
              <ModalHeader>Confirm Delete</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete "{selectedMenu?.title}"?</p>
                <p className="text-sm text-gray-500">This action cannot be undone.</p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onDeleteClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={confirmDelete}>
                  Delete
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
