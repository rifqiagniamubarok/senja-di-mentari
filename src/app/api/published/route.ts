import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET() {
  try {
    const [materials, menus] = await Promise.all([
      prisma.material.findMany({
        where: { publish: true },
        orderBy: { id: 'asc' },
      }),
      prisma.menu.findMany({
        where: { publish: true },
        include: {
          menuMaterials: {
            include: {
              material: true,
            },
          },
        },
        orderBy: { id: 'asc' },
      }),
    ]);

    return NextResponse.json({
      materials,
      menus,
    });
  } catch (error) {
    console.error('Error fetching published data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
