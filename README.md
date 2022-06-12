# HTML Image Generator

HTML Template (with CSS, Assets) + Data = Image

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

- `[template-name]`/template.html
- `[template-name]`/data.js
- `[template-name]`/options.yaml
- `[template-name]`/assets/`[some asset files]`

#### Run script

```bash
$ yarn dev
# OR
$ yarn generate
```

## Files

### `template.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet" />
    <style>
      h1 {
        font-size: 100px;
        font-family: 'Roboto', sans-serif;
      }
      img {
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <h1>{{ title }}</h1>
    <img src="{{ assetsDir }}/image.png" />
  </body>
</html>
```

### `data.js`

```js
export default [
  {
    title: 'Apple',
    dist: 'apple.png',
  },
  {
    title: 'Banana',
    dist: 'banana.png',
  },
  {
    title: 'Candy',
    dist: 'candy.png',
  },
];
```

```js
export default async () => {
  const res = await fetch('SOME_API');
  const { contents } = await res.json();

  return contents.map((content) => ({
    title: content.title,
    dist: `${content.id}.png`,
  }));
};
```

### `options.yaml`

```yaml
width: 1200 # required
height: 630 # required
type: jpeg # optional: jpeg (default), png, webp
quality: 70 # optional
```
