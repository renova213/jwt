import express from 'express';
import cors from 'cors';
import corsMiddleware from './src/middleware/cors.js';
import * as dotenv from 'dotenv';
import connectDB from './src/config/connect.js';
import notFoundMiddleware from './src/middleware/not_found.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from './swagger.json' assert { type: "json" };
import authRoute from './src/route/auth.js';
import facilityRoute from './src/route/facility.js';

dotenv.config();
const port=process.env.PORT||4000;
const app=express();

app.use(cors(corsMiddleware));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send("Vaccine Api"));

app.use(authRoute);
app.use(facilityRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(notFoundMiddleware);

const start=async () => {
    try {
        await connectDB(process.env.MONGO_URI).then(() => console.log("Connected")).catch((err) => {
            console.log(err);
            process.exit();
        });
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
