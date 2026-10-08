// Menu items. Placeholder until the real menu is ready.
// Leave price as '' to show "$—".

export interface MenuItem {
  name: string;
  price: string;
  description?: string;
}

export interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const MENU: MenuGroup[][] = [
  // Column 1
  [
    {
      title: 'Burgers',
      items: [
        { name: 'The Double D', price: '', description: 'Two smashed patties, double cheese, house sauce.' },
        { name: 'Classic Cheese', price: '', description: 'Description coming soon.' },
        { name: 'Burger Name', price: '', description: 'Description coming soon.' },
        { name: 'Burger Name', price: '', description: 'Description coming soon.' },
      ],
    },
  ],
  // Column 2
  [
    {
      title: 'Sides',
      items: [
        { name: 'Fries', price: '' },
        { name: 'Loaded Fries', price: '' },
        { name: 'Side Name', price: '' },
      ],
    },
    {
      title: 'Drinks',
      items: [
        { name: 'Soft Drinks', price: '' },
        { name: 'Shakes', price: '' },
      ],
    },
  ],
];
