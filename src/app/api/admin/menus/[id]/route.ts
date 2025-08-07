import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

// GET /api/admin/menus/[id] - Get single menu
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const menu = await prisma.menu.findUnique({
      where: { id: params.id },
      include: {
        menuMaterials: {
          include: {
            material: true,
          },
        },
      },
    });

    if (!menu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}

// PUT /api/admin/menus/[id] - Update menu
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { title, price, materialIds } = body;

    // Update menu
    const menu = await prisma.menu.update({
      where: { id: params.id },
      data: {
        title,
        price: parseInt(price),
      },
    });

    // Delete existing menu-material relationships
    await prisma.menuMaterial.deleteMany({
      where: { menuId: params.id },
    });

    // Create new menu-material relationships
    if (materialIds && materialIds.length > 0) {
      await prisma.menuMaterial.createMany({
        data: materialIds.map((materialId: string) => ({
          menuId: params.id,
          materialId,
        })),
      });
    }

    const menuWithMaterials = await prisma.menu.findUnique({
      where: { id: params.id },
      include: {
        menuMaterials: {
          include: {
            material: true,
          },
        },
      },
    });

    return NextResponse.json(menuWithMaterials);
  } catch (error) {
    console.error('Error updating menu:', error);
    return NextResponse.json({ error: 'Failed to update menu' }, { status: 500 });
  }
}

// DELETE /api/admin/menus/[id] - Delete menu
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // First delete related menu materials
    await prisma.menuMaterial.deleteMany({
      where: { menuId: params.id },
    });

    // Then delete the menu
    await prisma.menu.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu:', error);
    return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 });
  }
}
