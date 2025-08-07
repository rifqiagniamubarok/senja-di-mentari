import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

// PATCH /api/admin/menus/[id]/publish - Toggle publish status
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { publish } = body;

    const menu = await prisma.menu.update({
      where: { id: params.id },
      data: { publish },
      include: {
        menuMaterials: {
          include: {
            material: true,
          },
        },
      },
    });

    return NextResponse.json(menu);
  } catch (error) {
    console.error('Error updating menu publish status:', error);
    return NextResponse.json({ error: 'Failed to update publish status' }, { status: 500 });
  }
}
