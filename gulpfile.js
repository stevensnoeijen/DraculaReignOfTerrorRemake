const gulp = require('gulp');
const texturePacker = require('gulp-free-tex-packer');
const run = require('gulp-run');
const audiosprite = require('gulp-audiosprite');

require('dotenv').config({
  path: '.gulp.env',
});

gulp.task('pack-sprites-units', function() {
  console.warn('Packing sprites is slow, this can take a few minutes!');
  return gulp.src('raw/sprites/units/*.*')
    .pipe(texturePacker({
      textureName: 'unit-spritesheet',
      textureFormat: 'png',
      removeFileExtension: true,
      prependFolderName: false,
      base64Export: false,
      tinify: true,
      tinifyKey: process.env.TINIFY_KEY,
      scale: 1,
      filter: 'none',
      exporter: 'JsonHash',
      fileName: 'pack-result',
      width: 2048,
      height: 2048,
      fixedSize: false,
      powerOfTwo: false,
      padding: 0,
      extrude: 0,
      allowRotation: true,
      allowTrim: true,
      trimMode: 'trim',
      alphaThreshold: '0',
      detectIdentical: true,
      packer: 'OptimalPacker',
      packerMethod: 'Automatic'
    }))
    .pipe(gulp.dest('public/assets/'));
});

gulp.task('add-animations-to-unit-spritesheet', () =>
  run(
    'ts-node -P tsconfig.node.json scripts/add-animations-to-unit-spritesheet'
  )
  .exec()
);

gulp.task(
  'pack-sprites',
  gulp.series(
    'pack-sprites-units',
    'add-animations-to-unit-spritesheet'
  )
);

gulp.task('pack-sounds', function() {
  return gulp.src('raw/sounds/*.mp3')
    .pipe(audiosprite({
      export: 'ogg,mp3',
      path: 'assets',
      output: 'sounds',
      log: 'notice'
    }))
    .pipe(gulp.dest('public/assets/'));
});

gulp.task('generate-animation-models', () =>
  run('ts-node -P tsconfig.node.json scripts/generate-animation-models.ts')
    .exec()
);

gulp.task(
  'pack',
  gulp.series(
    'pack-sounds',
    'pack-sprites',
    'generate-animation-models'
  )
);

gulp.task('index-components', () =>
    run('cti ./src/game/components -i *.spec.ts').exec()
);
gulp.task('index-systems', () =>
    run('cti ./src/game/systems -i *.spec.ts').exec()
);

gulp.task('index',
  gulp.series('index-components', 'index-systems')
);
