import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import handleError from './middlewares/error.js';
dotenv.config();
import rateLimit from 'express-rate-limit';
import helmet from "helmet";
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

// Routes
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import couponRoutes from "./routes/couponRoutes.js"
import transactionRoutes from "./routes/transactionRoutes.js"

const app = express();
app.use(express.json());
app.use(cors());


// limiting the api calls from same ip preventing DDOS attack
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100
})
app.use(limiter)

// Use Helmet!
app.use(helmet());

// To remove data using these defaults or we can say that sql attacks prevention:
app.use(ExpressMongoSanitize());

// preventing cross site scripting attacks
app.use(xss())




// APi routes staretd=> 

app.get('/', (req, res) => {
  res.send('API is working fine 😀!!');
});



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/coupons', couponRoutes);
app.use('/api/v1/transactions', transactionRoutes);



// Middleware for error handling
app.use(handleError);
app.use((req, res, next) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });
});


export default app;