import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

// GET /api/admin/materials/[id] - Get single material
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const material = await prisma.material.findUnique({
      where: { id },
    });

    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    return NextResponse.json(material);
  } catch (error) {
    console.error('Error fetching material:', error);
    return NextResponse.json({ error: 'Failed to fetch material' }, { status: 500 });
  }
}

// PUT /api/admin/materials/[id] - Update material
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, brand, description, perunit, price } = body;

    const material = await prisma.material.update({
      where: { id },
      data: {
        title,
        brand,
        description,
        perunit,
        price: parseInt(price),
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.error('Error updating material:', error);
    return NextResponse.json({ error: 'Failed to update material' }, { status: 500 });
  }
}

// DELETE /api/admin/materials/[id] - Delete material
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // First delete related menu materials
    await prisma.menuMaterial.deleteMany({
      where: { materialId: id },
    });

    // Then delete the material
    await prisma.material.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Error deleting material:', error);
    return NextResponse.json({ error: 'Failed to delete material' }, { status: 500 });
  }
}
