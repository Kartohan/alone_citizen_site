# alone.citizen Atmospheric Gallery

Static cinematic photo gallery with an intro screen, theme-based atmospheres,
animated transitions, and responsive desktop/mobile controls.

The site can run as a plain static gallery, or connect to Supabase for a
persistent admin panel, image storage, and analytics.

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

Use `admin.html` for persistent photo management after Supabase is configured.

## Supabase Admin

1. Create a Supabase project.
2. Open the SQL editor and run `supabase-schema.sql`.
3. Create your Auth user in Supabase.
4. Run the final admin insert shown at the bottom of `supabase-schema.sql` with
   your email.
5. Put the project URL and anon key in `supabase-config.js`.
6. Open `admin.html`, sign in, and add photos.

Images are stored in the public `gallery-images` Storage bucket. Photo metadata
lives in `gallery_photos`, while page and photo views are written to
`analytics_events`. If Supabase is not configured or has no published photos
yet, the public gallery keeps using the bundled local photos.

## Import Bundled Photos

After Supabase is configured, import the 20 local `assets/` photos into the
database with:

```sh
SUPABASE_URL="https://your-project.supabase.co" \
SUPABASE_ANON_KEY="your-publishable-or-anon-key" \
SUPABASE_ADMIN_EMAIL="admin@example.com" \
SUPABASE_ADMIN_PASSWORD="admin-password" \
node scripts/import-local-photos.mjs
```

The import uses the existing `fallbackPhotos` metadata from `app.js`, uploads
files to `gallery-images/local/`, and inserts rows into `gallery_photos`. It
skips photos that already have the same `storage_path`. Add `--replace` to
delete and re-import matching local photos.
