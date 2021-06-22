import express from 'express';

const routes = express.Router();

routes.get("/test", (req, res) => {
    res.sendStatus(200);
})

export default routes;