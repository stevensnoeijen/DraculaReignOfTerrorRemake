# Dracula: Reign of Terror Remake

Dracula: Reign of Terror Remake is a remake of "Dracula: Reign of Terror" (a.k.a. Vlad Tepes Dracula) strategy game from 1997.

This game is in development, but not every actively.

I do not own any of the rights of the original game!

Take a peek of the current state of the game [here](https://stevensnoeijen.github.io/drotr/).

# Requirements

- node

# QuickStart

```
npm install
npm run dev
```

A browser tab will open, click "Run in web browser".

# Test

Currently only some unit-tests are available thought running `npm run test`.

All tests are automaticly ran at pr!

# Debug

To use debug options add `#/game?debug=<options>` and replace `<options>` to the url and refresh the page.
Example: `#/game?debug=grid`.

Current debug options are:

- `grid`, shows map grid of positions
- `aggro`, shows aggro radius of the units

Other options to use are:

- `#/game?showallhealth=true` to always show health of units

# Levels

To select a level add `#/game?level=<level>` and replace `<level>` to the url and refresh the page.

Current levels are:

- `randomunits` (default)
- `pathfinding`

# Pack

Assets (sprites and sounds) are packaged together to be more efficient.

Packing happens with all files in `raw/` to `/public/assets` by calling `npm run pack`.
Requirement to run this script is to copy `template.gulp.env` to `.gulp.env` and fill in the var `TINIFY_KEY`, get a key thought https://tinypng.com/developers .

Packing is done though gulp's `pack` task, see [gulpfile.js](./gulpfile.js).

You can also call other gulp tasks seperately if you want with `npx gulp <task>`.

Fully manually packing see [raw/README.md](raw/README.md)
