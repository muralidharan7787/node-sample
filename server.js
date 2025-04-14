// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve uploaded files statically
app.use('/videos', express.static(path.join(__dirname, 'uploads')));
app.use('/videos', express.static('videos'));

// Multer setup for storing video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // your folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowedExt = /mp4|mov|avi|mkv/;
    const extname = allowedExt.test(path.extname(file.originalname).toLowerCase());

    const allowedMimeTypes = [
      'video/mp4',
      'video/quicktime',     // .mov
      'video/x-msvideo',     // .avi
      'video/x-matroska'     // .mkv
    ];
    const mimetype = allowedMimeTypes.includes(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only video files are allowed!'));
  }
});

// Route for uploading a video
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file uploaded.' });
  }
  res.json({
    message: 'Video uploaded successfully',
    filename: req.file.filename,
    url: `/videos/${req.file.filename}`
  });
});


// Existing user route
app.use('/users', userRoutes);

app.get('/list-videos', (req, res) => {
  const videosDir = path.join(__dirname, 'uploads'); // Use 'uploads' since that's your folder

  fs.readdir(videosDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan folder' });
    }

    // Filter only video files
    const videoFiles = files.filter(file =>
      /\.(mp4|mov|avi|mkv)$/i.test(file)
    );

    // Generate full URLs
    const fileUrls = videoFiles.map(file =>
      `${req.protocol}://${req.get('host')}/videos/${file}`
    );

    res.json({ videos: fileUrls });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
