# Alone Citizen Atmospheric Gallery

Static cinematic photo gallery with an intro screen, theme-based atmospheres,
animated transitions, and responsive desktop/mobile controls.

## How To Use

Open `index.html` in a browser, or serve the folder with any static server.

The first version already includes 20 real photos in `assets/`.

## Controls

- Mouse wheel or the thumbnail arrows scroll the filmstrip.
- Main arrows, keyboard arrows, or mobile swipe change the active photo.
- Photos advance automatically every 7 seconds.
- Hold the left mouse button on the photo, or hold Space, to pause autoplay.
- The cursor becomes a circular timer only while it is over the active photo.
- The current title, tag, and date line stay under the photo.

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
