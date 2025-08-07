import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await prisma.menuMaterial.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.material.deleteMany();

  // Seed Materials
  const materials = await prisma.material.createMany({
    data: [
      {
        title: 'Kintamani',
        brand: 'sakha',
        description: '100% Arabica coffee from Kintamani, Bali. Known for its bright acidity and fruity notes.',
        perunit: '10 - 12 grams',
        price: 8000,
      },
      {
        title: 'Gold Breakfast',
        brand: 'Arutala',
        description: '70% Arabica and 30% Robusta blend. A perfect morning coffee with a rich flavor.',
        perunit: '10 - 12 grams',
        price: 5000,
      },
      {
        title: 'Fresh milk',
        brand: 'Greenfields',
        description: 'Fresh milk from Greenfields, perfect for your coffee or as a drink on its own.',
        perunit: '100 ml',
        price: 2500,
      },
    ],
  });

  console.log(`Created ${materials.count} materials`);

  // Get created materials to use their IDs
  const createdMaterials = await prisma.material.findMany({
    orderBy: { id: 'asc' },
  });

  // Seed Menus
  const menu1 = await prisma.menu.create({
    data: {
      title: 'Espresso Full Arabica',
      price: 10000,
    },
  });

  const menu2 = await prisma.menu.create({
    data: {
      title: 'Espresso Blend',
      price: 7000,
    },
  });

  const menu3 = await prisma.menu.create({
    data: {
      title: 'Latte with coffee Blend',
      price: 13000,
    },
  });

  const menu4 = await prisma.menu.create({
    data: {
      title: 'Latte with full arabica',
      price: 15000,
    },
  });

  console.log('Created 4 menus');

  // Create Menu-Material relationships
  const menuMaterials = await prisma.menuMaterial.createMany({
    data: [
      // Espresso Full Arabica uses Kintamani (material id 1)
      { menuId: menu1.id, materialId: createdMaterials[0].id },

      // Espresso Blend uses Gold Breakfast (material id 2)
      { menuId: menu2.id, materialId: createdMaterials[1].id },

      // Latte with coffee Blend uses Gold Breakfast + Fresh milk (material ids 2, 3)
      { menuId: menu3.id, materialId: createdMaterials[1].id },
      { menuId: menu3.id, materialId: createdMaterials[2].id },

      // Latte with full arabica uses Kintamani + Fresh milk (material ids 1, 3)
      { menuId: menu4.id, materialId: createdMaterials[0].id },
      { menuId: menu4.id, materialId: createdMaterials[2].id },
    ],
  });

  console.log(`Created ${menuMaterials.count} menu-material relationships`);

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
