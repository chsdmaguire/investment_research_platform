const queries = require('./queries');
const pool = require('../db');

// CRYPTO
const getListing = async (req, res) => {
    pool.query(queries.cryptoListings, (error, results) => {
        if(error) throw error
        return res.status(200).json(results.rows)
        });
}

const cryptoCandleStick = async (req, res) => {
    ticker = req.params.ticker
    pool.query(queries.cryptoCandleStick, [ticker], (error, results) => {
        if(error) throw error
        return res.status(200).json(results.rows)
        });
}

const cryptoList = async (req, res) => {
    pool.query(queries.cryptoList, (error, results) => {
        if(error) throw error
        return res.status(200).json(results.rows)
        });
}


// ECON
const econData = async (req, res) => {
    const symbol = req.params.symbol;
    pool.query(queries.econData, [symbol], (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows)
    })
}

const econMetricList = async (req, res) => {
    pool.query(queries.econMetricList, (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows)
    })
}

const dbIndex = async (req, res) => {
    const series_id = req.params.series_id;
    const time = req.params.time;
    pool.query(queries.dbIndex, [series_id, time], (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows)
    })
}

const econNotes = async (req, res) => {
    const symbol = req.params.symbol;
    pool.query(queries.econNotes, [symbol], (error, results) => {
        if (error) throw error;
        return res.status(200).json(results.rows)
    })
}

const indiceCard = async (req, res) => {
    pool.query(queries.indiceCard, (error, results) => {
        if(error) throw error
        return res.status(200).json(results.rows)
        });
}

const allIndices = async (req, res) => {
    pool.query(queries.allIndices, (err, results) => {
        if (err) throw err
        return res.status(200).json(results.rows)
    })
}


module.exports = {
    getListing,
    cryptoCandleStick,
    cryptoList,
    dbIndex,
    econMetricList,
    econData,
    econNotes,
    indiceCard,
    allIndices
}