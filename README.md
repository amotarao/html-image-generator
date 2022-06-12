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
