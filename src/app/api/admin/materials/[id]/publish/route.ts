import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

// PATCH /api/admin/materials/[id]/publish - Toggle publish status
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { publish } = body;

    const material = await prisma.material.update({
      where: { id },
      data: { publish },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.error('Error updating material publish status:', error);
    return NextResponse.json({ error: 'Failed to update publish status' }, { status: 500 });
  }
}
