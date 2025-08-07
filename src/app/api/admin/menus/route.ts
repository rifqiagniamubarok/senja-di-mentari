import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

// GET /api/admin/menus - Get all menus
export async function GET() {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        menuMaterials: {
          include: {
            material: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(menus);
  } catch (error) {
    console.error('Error fetching menus:', error);
    return NextResponse.json({ error: 'Failed to fetch menus' }, { status: 500 });
  }
}

// POST /api/admin/menus - Create new menu
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, price, materialIds } = body;

    const menu = await prisma.menu.create({
      data: {
        title,
        price: parseInt(price),
      },
    });

    // Create menu-material relationships
    if (materialIds && materialIds.length > 0) {
      await prisma.menuMaterial.createMany({
        data: materialIds.map((materialId: string) => ({
          menuId: menu.id,
          materialId,
        })),
      });
    }

    const menuWithMaterials = await prisma.menu.findUnique({
      where: { id: menu.id },
      include: {
        menuMaterials: {
          include: {
            material: true,
          },
        },
      },
    });

    return NextResponse.json(menuWithMaterials, { status: 201 });
  } catch (error) {
    console.error('Error creating menu:', error);
    return NextResponse.json({ error: 'Failed to create menu' }, { status: 500 });
  }
}
