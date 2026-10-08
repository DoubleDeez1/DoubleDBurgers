# Double D's Burgers

Website for Double D's Burgers. Plain HTML/CSS/JS, no build step, so it can be hosted free on GitHub Pages.

## Structure

```
index.html            the page
assets/css/style.css  styles (neon purple + gold theme)
assets/js/main.js     settings: Instagram handle + live feed ID
assets/img/           logos and icons
```

## Editing

- **Menu:** edit the `#menu` section in `index.html`. Each item is one `<li class="menu__item">`.
- **Instagram:** set `INSTAGRAM_HANDLE` in `assets/js/main.js`.
- **Live Instagram photos:** create a free feed at [behold.so](https://behold.so), connect the Instagram account, and paste the Feed ID into `BEHOLD_FEED_ID` in `assets/js/main.js`. Until then, placeholder tiles link to the profile.

## Hosting (GitHub Pages)

Repo **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main`, folder `/ (root)`. The site goes live at `https://doubledeez1.github.io/doubledburgers/`.
