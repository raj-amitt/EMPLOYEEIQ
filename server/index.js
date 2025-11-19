import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import connectToDatabase from './db/db.js'


connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter); //basically adding a prefix to all routes in authRouter
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})