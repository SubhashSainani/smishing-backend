import "dotenv/config";
import express from "express";
import connectDB from "./configs/db.config.js";
import authRoute from "./routes/auth.route.js";
import spamRoute from "./routes/spam.route.js";
import contactRoute from "./routes/contact.route.js";
import securityMiddleware from "./middlewares/security.middleware.js";
import { apiLimiter, authLimiter } from "./middlewares/rateLimiter.middleware.js";

// calling body-parser to handle the Request Object from POST requests
import bodyParser from "body-parser";

const app = express();

// Apply security headers middleware
app.use(securityMiddleware);

// Apply general rate limiter
app.use(apiLimiter);

// Parse incoming JSON requests
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to MongoDB
connectDB();

// Mount auth routes at /api/auth
app.use("/api/auth", authLimiter, authRoute);

// Mount contact routes at /api/contact
app.use("/api/contact", contactRoute);

// Mount spam routes at /api/spam
app.use('/api/spam', spamRoute)

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        service: 'smishing-backend'
    });
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Prod Server is running on port ${PORT}`);
});

export default app;
