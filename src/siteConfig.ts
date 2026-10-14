// All the business details in one place. Edit here and the whole site updates.

export const SITE = {
  name: "Double D's Burgers",
  tagline: 'Double Up on',
  taglineAccent: 'Delicious',

  phone: '0452 053 271',
  phoneHref: 'tel:+61452053271',
  email: 'ddoubledeezburgers@gmail.com', // TODO: swap when the new email is set up

  address: {
    street: '103 Hume Highway',
    suburb: 'Canley Vale NSW',
  },

  instagram: {
    handle: 'ddoubledsburgers', // no @
    // Live feed via Behold (https://behold.so). Paste the Feed ID here;
    // leave empty to show placeholder tiles that link to the profile.
    beholdFeedId: 'piIeOGhIMJgtVarqvKrf',
  },

  // Banner across the top of the site. Shows until `hideFrom`, then disappears.
  grandOpening: {
    date: '2026-10-17', // Saturday 17 October (Sydney time). Banner text and countdown use this.
    hideFrom: '2026-10-18T00:00:00+11:00', // midnight going into the 18th, AEDT
  },
};

export const addressQuery = encodeURIComponent(
  `${SITE.address.street}, ${SITE.address.suburb}`,
);
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${addressQuery}`;
export const mapEmbedUrl = `https://www.google.com/maps?q=${addressQuery}&output=embed`;
export const instagramUrl = `https://www.instagram.com/${SITE.instagram.handle}/`;

export const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
