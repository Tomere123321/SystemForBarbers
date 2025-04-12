const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'client', required: true },
    barber: { type: mongoose.Schema.Types.ObjectId, ref: 'barber', required: true },
})

const appointmentsModel = mongoose.model('appointment', appointmentsSchema);

module.exports = appointmentsModel;