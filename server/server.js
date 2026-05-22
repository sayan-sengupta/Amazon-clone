require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const productRoutes=require('./routes/product.routes')
const { verifyToken } = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:4200',
    credentials: true,
  })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'amazon-clone-api' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes);

// Legacy routes for existing Angular app (Phase B will migrate to /api/auth)
app.post('/register', authRoutes.register);
app.post('/login', authRoutes.login);
app.post('/profile', verifyToken, authRoutes.legacyProfile);

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
