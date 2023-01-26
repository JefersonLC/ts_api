import * as multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (_req, _file, cb): void {
    const root: string = path.resolve(__dirname, '../../..');
    const dir: string = path.join(root, '/public/images/products');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (_req, file, cb): void {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

export const upload: multer.Multer = multer.default({ storage: storage });
