# Alone Citizen Atmospheric Gallery

Static MVP for a cinematic photo gallery with theme-based atmospheres and animated transitions.

## How To Use

Open `index.html` in a browser, or serve the folder with any static server.

The first version already includes 10 real photos in `assets/`.

Photos are configured in `app.js`. Each item supports:

- `title`
- `theme`: `sunset`, `sunrise`, `clouds`, `moon`, `stars`, or `city`
- `meta`
- `text`
- `gradient`
- optional `url`
- optional `frame`, for example `3 / 4`, `9 / 16`, or `16 / 7`
- optional `position`, for example `50% 43%`

To use real photos later, place images in `assets/` and add a `url`, for example:

```js
url: "./assets/sunset-01.jpg"
```

The `Add` button lets you preview a local image in the browser and assign a theme. This preview is temporary because there is no backend yet.
