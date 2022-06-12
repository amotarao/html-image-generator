# HTML Image Generator

HTML Template (with CSS, Assets) + Data => Image

## Setup

### Use template

[Genearte repository from template!](https://github.com/amotarao/html-image-generator-template/generate)

### Setup manually

```bash
$ yarn add html-image-generator
```

#### Set type on package.json

```json
{
  "...": "...",
  "type": "module",
  "...": "..."
}
```

#### Decide the template name

Add `[template-name]` directory

#### Add scripts on package.json

```json
{
  "...": "...",
  "scripts": {
    "...": "...",
    "dev": "html-image-generator dev [template-name]",
    "generate": "html-image-generator generate [template-name]",
    "...": "..."
  },
  "...": "..."
}
```

#### Add files

- `[template-name]/template.html`
- `[template-name]/data.js`
- `[template-name]/options.yaml`
- `[template-name]/assets/[some asset files]`

#### Run script

```bash
$ yarn dev
# OR
$ yarn generate
```

## Files

### `template.html`

Add HTML template with [mustache.js](https://github.com/janl/mustache.js).

Use `{{ assetsDir }}` for assets directory.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
    <style>
      .title {
        font-size: 100px;
        font-family: 'Roboto', sans-serif;
      }
      .image {
        width: 300px;
        height: 300px;
      }
      .logo {
        width: 100px;
        height: 20px;
      }
    </style>
  </head>
  <body>
    <h1 class="title">{{ title }}</h1>
    <img class="image" src="{{ image }}" />
    <img class="logo" src="{{ assetsDir }}/logo.png" />
  </body>
</html>
```

### `data.js`

```js
export default [
  {
    title: 'Apple',
    image: 'https://example.com/images/apple.png',
    dist: 'dist/apple.png',
  },
  {
    title: 'Banana',
    image: 'https://example.com/images/banana.png',
    dist: 'dist/banana.png',
  },
  {
    title: 'Candy',
    image: 'https://example.com/images/candy.png',
    dist: 'dist/candy.png',
  },
];

// OR

export default async () => {
  const res = await fetch('SOME_API');
  const { contents } = await res.json();

  return contents.map((content) => ({
    title: content.title,
    image: content.image.url,
    dist: `dist/${content.id}.png`,
  }));
};
```

### `options.yaml`

```yaml
width: 1200 # required
height: 630 # required
type: png # optional: png, jpeg or webp. NOT jpg.
quality: 70 # optional: valid with jpeg and webp
```

## Development mode

```bash
$ yarn dev
```

Run script and watch `[template-name]/_dev.[jpeg, png or webp]`
