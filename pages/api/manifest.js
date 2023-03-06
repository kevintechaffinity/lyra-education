import { BuildThumbnail } from '../../utilities/cloudinary';

const isProd = process.env.NODE_ENV === 'production';

export default function handler(req, res) {
  const { name, description, color, url, banner } = req.query;
  return res.status(200).json({
    theme_color: `rgb(${color})`,
    background_color: '#ffffff',
    display: 'standalone',
    scope: '/',
    start_url: isProd ? url : '/',
    name,
    short_name: name,
    description,
    icons: [
      {
        src: BuildThumbnail(banner, 192, 192),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: BuildThumbnail(banner, 256, 256),
        sizes: '256x256',
        type: 'image/png',
      },
      {
        src: BuildThumbnail(banner, 384, 384),
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: BuildThumbnail(banner, 512, 512),
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  });
}
