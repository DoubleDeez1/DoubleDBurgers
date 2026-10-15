// Menu items. Leave price as '' to show "TBA".
import theStapleImg from './assets/the-staple.webp';
import sweetHeatImg from './assets/sweet-heat.webp';
import truffleImg from './assets/truffle-in-paradise.webp';
import cheesePleaseImg from './assets/cheese-please.webp';
import getCluckedImg from './assets/get-clucked.webp';
import mexicanBowlImg from './assets/mexican-rice-bowl.webp';
import classicBowlImg from './assets/classic-rice-bowl.webp';
import stapleFriesImg from './assets/staple-loaded-fries.webp';
import chipsImg from './assets/chips.webp';
import sweetHeatFriesImg from './assets/sweet-heat-loaded-fries.webp';

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
  tags?: string[]; // small badges under the name, e.g. calories / protein
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
          price: '$16',
          description: `Smash Beef Patty · American Cheese · Onion · Dill Pickles · Crisp Lettuce · House-Made Staple Sauce · ${BUN}`,
          image: theStapleImg,
        },
        {
          name: 'Sweet Heat',
          price: '$17',
          description: `Marinated Grilled Chicken Breast · American Cheese · In-House Slaw · House-Made Chipotle Mayo · Infamous Hot Honey Drizzle · Honey Soy Chicken Chip Crunch · ${BUN}`,
          image: sweetHeatImg,
        },
        {
          name: 'Truffle in Paradise',
          price: '$18',
          description: `Smash Beef Patty with Onion & Jalapeño · American Cheese · Grilled Pineapple · Fresh Lettuce · House-Made Truffle Mayo · ${BUN}`,
          image: truffleImg,
        },
        {
          name: 'Cheese Please',
          price: '$18',
          description: `Smash Beef Patty · Double American Cheese · Dill Pickles · Onion · Mustard · Ketchup · ${BUN}`,
          image: cheesePleaseImg,
        },
        {
          name: 'Get Clucked',
          price: '$16',
          description: `Marinated Grilled Chicken Breast · American Cheese · Fresh Lettuce · House-Made Chilli Mayo · ${BUN}`,
          image: getCluckedImg,
        },
      ],
    },
    {
      title: 'Extras',
      items: [
        { name: 'Extra Protein', price: '$4', description: 'Beef Patty or Chicken Fillet' },
        { name: 'Make It a Meal', price: '$7', description: 'Golden Fries · Soft Drink' },
      ],
    },
  ],
  // Column 2
  [
    {
      title: 'Fries',
      items: [
        {
          name: 'Fries',
          price: '$5',
          description: 'Perfectly Crisp Golden Chips · Seasoned to Perfection',
          image: chipsImg,
        },
      ],
    },
    {
      title: 'Loaded Fries',
      items: [
        {
          name: 'The Staple Loaded Fries',
          price: '$18',
          description: 'Crispy Fries · Smashed Beef Patties · American Cheese · Onion · Dill Pickles · House-Made Staple Sauce',
          image: stapleFriesImg,
        },
        {
          name: 'Sweet Heat Loaded Fries',
          price: '$18',
          description: 'Crispy Fries · Marinated Grilled Chicken Breast · American Cheese · In-House Slaw · House-Made Chipotle Mayo · House-Made Hot Honey · Topped with Honey Soy Chicken Chip Crunch',
          image: sweetHeatFriesImg,
        },
      ],
    },
    {
      title: 'Rice Bowls',
      items: [
        {
          name: 'Classic Rice Bowl',
          price: '$18',
          tags: ['660 Calories', '68g Protein'],
          description: '200 g Jasmine Rice · 200 g Marinated Grilled Chicken Breast · Fresh Cucumber Salad · Topped with House-Made Staple Sauce',
          image: classicBowlImg,
        },
        {
          name: 'Mexican Rice Bowl',
          price: '$18',
          tags: ['700 Calories', '71g Protein'],
          description: '200 g Jasmine Rice · 200 g Marinated Grilled Chicken Breast · Corn Salsa · Infamous Hot Honey · House-Made Chipotle Mayo',
          image: mexicanBowlImg,
        },
      ],
    },
    {
      title: 'Drinks',
      items: [
        { name: 'Coke', price: '$3' },
        { name: 'Coke No Sugar', price: '$3' },
        { name: 'Schweppes Lemonade', price: '$3' },
        { name: 'Pepsi Max', price: '$3' },
        { name: 'Water', price: '$3' },
      ],
    },
  ],
];
