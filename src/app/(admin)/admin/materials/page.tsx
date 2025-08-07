'use client';
import { Card, CardBody, CardHeader, Button, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Chip } from '@heroui/react';
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
  publish: boolean;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    description: '',
    perunit: '',
    price: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch('/api/admin/materials');
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error('Error fetching materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedMaterial(null);
    setIsEditing(false);
    setFormData({
      title: '',
      brand: '',
      description: '',
      perunit: '',
      price: '',
    });
    onOpen();
  };

  const handleEdit = (material: Material) => {
    setSelectedMaterial(material);
    setIsEditing(true);
    setFormData({
      title: material.title,
      brand: material.brand,
      description: material.description,
      perunit: material.perunit,
      price: material.price.toString(),
    });
    onOpen();
  };

  const handleView = (material: Material) => {
    setSelectedMaterial(material);
    setIsEditing(false);
    setFormData({
      title: material.title,
      brand: material.brand,
      description: material.description,
      perunit: material.perunit,
      price: material.price.toString(),
    });
    onOpen();
  };

  const handleDelete = (material: Material) => {
    setSelectedMaterial(material);
    onDeleteOpen();
  };

  const handleSubmit = async () => {
    try {
      const url = selectedMaterial ? `/api/admin/materials/${selectedMaterial.id}` : '/api/admin/materials';

      const method = selectedMaterial ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchMaterials();
        onClose();
      } else {
        console.error('Error saving material');
      }
    } catch (error) {
      console.error('Error saving material:', error);
    }
  };

  const handleTogglePublish = async (material: Material) => {
    try {
      const response = await fetch(`/api/admin/materials/${material.id}/publish`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publish: !material.publish }),
      });

      if (response.ok) {
        await fetchMaterials();
      } else {
        console.error('Error toggling publish status');
      }
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const confirmDelete = async () => {
    if (!selectedMaterial) return;

    try {
      const response = await fetch(`/api/admin/materials/${selectedMaterial.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchMaterials();
        onDeleteClose();
      } else {
        console.error('Error deleting material');
      }
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white border-16 border-green-600 p-8 flex items-center justify-center" style={{ borderWidth: '16px' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading materials...</p>
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
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Materials Management</h1>
              <p className="text-gray-600">Manage your coffee materials inventory</p>
            </div>
            <div className="flex gap-4">
              <Button color="success" startContent={<PlusIcon className="h-5 w-5" />} onPress={handleCreate}>
                Add Material
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-2 border-green-200">
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Total Materials</h3>
                <p className="text-3xl font-bold text-green-600">{materials.length}</p>
              </CardBody>
            </Card>
            <Card className="border-2 border-green-200">
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Published</h3>
                <p className="text-3xl font-bold text-success">{materials.filter((m) => m.publish).length}</p>
              </CardBody>
            </Card>
            <Card className="border-2 border-green-200">
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Unpublished</h3>
                <p className="text-3xl font-bold text-secondary">{materials.filter((m) => !m.publish).length}</p>
              </CardBody>
            </Card>
            <Card className="border-2 border-green-200">
              <CardBody className="text-center">
                <h3 className="text-lg font-semibold text-gray-800">Avg Price</h3>
                <p className="text-3xl font-bold text-green-600">
                  {materials.length > 0 ? formatPrice(materials.reduce((sum, m) => sum + m.price, 0) / materials.length) : formatPrice(0)}
                </p>
              </CardBody>
            </Card>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card key={material.id} className="border-2 border-green-200 hover:border-green-400 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{material.title}</h3>
                      <p className="text-sm text-gray-500">Brand: {material.brand}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Chip color={material.publish ? 'success' : 'default'} size="sm" variant="flat">
                          {material.publish ? 'Published' : 'Unpublished'}
                        </Chip>
                      </div>
                    </div>
                    <Chip color="success" size="sm">
                      ID: {material.id}
                    </Chip>
                  </div>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{material.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Per unit: {material.perunit}</p>
                      <p className="text-lg font-bold text-green-600">{formatPrice(material.price)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Button size="sm" color="default" variant="flat" startContent={<EyeIcon className="h-4 w-4" />} onPress={() => handleView(material)}>
                      View
                    </Button>
                    <Button size="sm" color="warning" variant="flat" startContent={<PencilIcon className="h-4 w-4" />} onPress={() => handleEdit(material)}>
                      Edit
                    </Button>
                    <Button size="sm" color={material.publish ? 'secondary' : 'success'} variant="flat" onPress={() => handleTogglePublish(material)}>
                      {material.publish ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button size="sm" color="danger" variant="flat" startContent={<TrashIcon className="h-4 w-4" />} onPress={() => handleDelete(material)}>
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {/* Material Form Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalContent>
              <ModalHeader>{selectedMaterial && !isEditing ? 'Material Details' : selectedMaterial ? 'Edit Material' : 'Create New Material'}</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    isReadOnly={!!(selectedMaterial && !isEditing)}
                  />
                  <Input
                    label="Brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    isReadOnly={!!(selectedMaterial && !isEditing)}
                  />
                  <Textarea
                    label="Description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    isReadOnly={!!(selectedMaterial && !isEditing)}
                  />
                  <Input
                    label="Per Unit"
                    value={formData.perunit}
                    onChange={(e) => setFormData({ ...formData, perunit: e.target.value })}
                    isReadOnly={!!(selectedMaterial && !isEditing)}
                  />
                  <Input
                    label="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    isReadOnly={!!(selectedMaterial && !isEditing)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {selectedMaterial && !isEditing ? 'Close' : 'Cancel'}
                </Button>
                {(!selectedMaterial || isEditing) && (
                  <Button color="success" onPress={handleSubmit}>
                    {selectedMaterial ? 'Update' : 'Create'}
                  </Button>
                )}
                {selectedMaterial && !isEditing && (
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
                <p>Are you sure you want to delete "{selectedMaterial?.title}"?</p>
                <p className="text-sm text-gray-500">This action cannot be undone and will remove this material from all menus.</p>
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
