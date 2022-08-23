# Raw

Files in the raw directory are being packed in combined files to (the `public/assets/` folder) improve loading times in the client.

The directories are setup per category.

## Sounds

Sounds are packed with gulp's `pack-sounds` task, triggered by `npm run pack` or run seperately `npx gulp pack-sounds`.

## Sprites

See [sprites/README.md](sprites/README.md)
