import { NextResponse } from 'next/server';
import { getMaterials, getMenus } from '@/lib/actions';

export async function GET() {
  try {
    const [materials, menus] = await Promise.all([getMaterials(), getMenus()]);

    return NextResponse.json({
      materials,
      menus,
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
