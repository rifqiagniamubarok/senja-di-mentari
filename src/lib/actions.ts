import { prisma } from '@/utils/prisma';

export async function getMaterials() {
  try {
    const materials = await prisma.material.findMany({
      orderBy: {
        id: 'asc',
      },
    });
    return materials;
  } catch (error) {
    console.error('Error fetching materials:', error);
    return [];
  }
}

export async function getMenus() {
  try {
    const menus = await prisma.menu.findMany({
      include: {
        menuMaterials: {
          include: {
            material: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
    return menus;
  } catch (error) {
    console.error('Error fetching menus:', error);
    return [];
  }
}

export async function getMenuWithMaterials(menuId: string) {
  try {
    const menu = await prisma.menu.findUnique({
      where: {
        id: menuId,
      },
      include: {
        menuMaterials: {
          include: {
            material: true,
          },
        },
      },
    });
    return menu;
  } catch (error) {
    console.error('Error fetching menu with materials:', error);
    return null;
  }
}
