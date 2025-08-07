import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

// GET /api/admin/materials - Get all materials
export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json({ error: 'Failed to fetch materials' }, { status: 500 });
  }
}

// POST /api/admin/materials - Create new material
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, brand, description, perunit, price } = body;

    const material = await prisma.material.create({
      data: {
        title,
        brand,
        description,
        perunit,
        price: parseInt(price),
      },
    });

    return NextResponse.json(material, { status: 201 });
  } catch (error) {
    console.error('Error creating material:', error);
    return NextResponse.json({ error: 'Failed to create material' }, { status: 500 });
  }
}
