// Menu items. Leave price as '' to show "TBA".
import theStapleImg from './assets/the-staple.webp';
import sweetHeatImg from './assets/sweet-heat.webp';
import truffleImg from './assets/truffle-in-paradise.webp';
import cheesePleaseImg from './assets/cheese-please.webp';
import getCluckedImg from './assets/get-clucked.webp';

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  image?: string; // optional food photo (transparent cut-out works best)
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const BUN = 'Served on a Buttery Potato Bun';

export const MENU: MenuGroup[][] = [
  // Column 1
  [
    {
      title: 'Burgers',
      items: [
        {
          name: 'The Staple',
          price: '',
          description: `Smash Beef Patty · American Cheese · Diced Onion · Pickles · Crisp Lettuce · Signature Staple Sauce · ${BUN}`,
          image: theStapleImg,
        },
        {
          name: 'Sweet Heat',
          price: '',
          description: `Marinated Grilled Chicken Breast · American Cheese · In-House Slaw · House-Made Chipotle Mayo · Drizzle of Infamous Hot Honey · Honey Soy Chicken Chip Crunch · ${BUN}`,
          image: sweetHeatImg,
        },
        {
          name: 'Truffle In Paradise',
          price: '',
          description: `Smash Beef Patty with Onion & Jalapeño · American Cheese · Grilled Pineapple · Fresh Lettuce · House-Made Truffle Mayo · ${BUN}`,
          image: truffleImg,
        },
        {
          name: 'Cheese Please',
          price: '',
          description: `Smash Beef Patty · Double American Cheese · Pickles · Onion · Mustard · Ketchup · ${BUN}`,
          image: cheesePleaseImg,
        },
        {
          name: 'Get Clucked',
          price: '',
          description: `Marinated Grilled Chicken Breast · American Cheese · Fresh Lettuce · House-Made Chilli Mayo · ${BUN}`,
          image: getCluckedImg,
        },
      ],
    },
    {
      title: 'Extras',
      items: [
        { name: 'Add Beef Patty', price: '' },
        { name: 'Add Chicken Patty', price: '' },
        {
          name: 'Make it a Meal',
          price: '',
          description: 'Golden Fries · Soft Drink · Choice of Sauce',
        },
      ],
    },
  ],
  // Column 2
  [
    {
      title: 'Fries',
      items: [
        {
          name: 'Chips',
          price: '',
          description: 'Perfectly Crisp Golden Chips · Seasoned to Perfection',
        },
        {
          name: 'The Staple Loaded Fries',
          price: '',
          description: 'Crispy Fries · Smashed Beef Patties · American Cheese · Diced Onion · Pickles · House-Made Staple Sauce',
        },
        {
          name: 'Sweet Heat Loaded Fries',
          price: '',
          description: 'Crispy Fries · Marinated Grilled Chicken Breast · American Cheese · In-House Slaw · House-Made Chipotle Mayo · House-Made Hot Honey · Topped with a Honey Soy Chicken Chip Crunch',
        },
      ],
    },
    {
      title: 'Rice Bowls',
      items: [
        {
          name: 'Classic Rice Bowl',
          price: '',
          description: '200g Jasmine Rice · 200g Marinated Grilled Chicken Breast · Garden Salad · Topped with Staple Sauce',
        },
        {
          name: 'Mexican Rice Bowl',
          price: '',
          description: '200g Jasmine Rice · 200g Marinated Grilled Chicken Breast · Mexican Salsa · Hot Honey · Chipotle Sauce',
        },
      ],
    },
    {
      title: 'Drinks',
      items: [
        { name: 'Coke', price: '' },
        { name: 'Coke No Sugar', price: '' },
        { name: 'Schweppes Lemonade', price: '' },
        { name: 'Pepsi Max', price: '' },
        { name: 'Water', price: '' },
      ],
    },
  ],
];
