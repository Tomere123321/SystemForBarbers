const barbersService = require('../Service/barbersService');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const barbers = await barbersService.getAllBarbers();
        return res.status(200).json(barbers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching barbers', error });
        console.log('Error fetching barbers:', error.message);
        
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const barber = await barbersService.getBarberById(id);
        return res.status(200).json(barber);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching barber by Id', error });
        console.log('Error fetching barber: by Id ', error.message);
    }
})

router.post('/add', async (req, res) => {
    try {
        const newBarber = req.body;
        const createdBarber = await barbersService.createBarber(newBarber);
        return res.status(201).json({createdBarber});

    } catch (error) {
        res.status(500).json({ message: 'Error creating barber', error });
        console.log('Error creating barber:', error.message);
        
    }
})

router.put('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBarber = req.body;
        const updatedBarberResponse = await barbersService.updateBarber(id, updatedBarber);
        return res.status(200).json(updatedBarberResponse);
    } catch (error) {
        res.status(500).json({ message: 'Error updating barber', error });
        console.log('Error updating barber:', error.message);
        
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBarber = await barbersService.deleteBarber(id);
        return res.status(200).json(deletedBarber);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting barber', error });
        console.log('Error deleting barber:', error.message);
        
    }
})

module.exports = router;