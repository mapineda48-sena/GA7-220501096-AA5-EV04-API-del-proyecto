import express from "express";
import db from "../models";

const app = express.Router();

// CREAR una nueva Persona
app.post('/personas', async (req, res) => {
    try {
        const nuevaPersona = await db.Persona.create(req.body);
        res.status(201).send(nuevaPersona);
    } catch (error) {
        res.status(400).send(error);
    }
});

// LEER todas las Personas
app.get('/personas', async (req, res) => {
    try {
        const personas = await db.Persona.findAll();
        res.send(personas);
    } catch (error) {
        res.status(500).send(error);
    }
});

// LEER una Persona por ID
app.get('/personas/:id', async (req, res) => {
    try {
        const persona = await db.Persona.findByPk(req.params.id);
        if (persona) {
            res.send(persona);
        } else {
            res.status(404).send({ message: 'Persona no encontrada' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

// ACTUALIZAR una Persona por ID
app.put('/personas/:id', async (req, res) => {
    try {
        const updated = await db.Persona.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated[0] > 0) {
            res.send({ message: 'Persona actualizada' });
        } else {
            res.status(404).send({ message: 'Persona no encontrada' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// ELIMINAR una Persona por ID
app.delete('/personas/:id', async (req, res) => {
    try {
        const deleted = await db.Persona.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.send({ message: 'Persona eliminada' });
        } else {
            res.status(404).send({ message: 'Persona no encontrada' });
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default app;