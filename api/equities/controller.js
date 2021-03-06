const axios = require('axios');
require('dotenv').config();
const pool = require('../db');
const queries = require("./queries");

// search query
const basicSearch = async(req, res) => {
    pool.query(queries.newSearch, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

// STOCK MAIN PAGE NEWS API REQUESTS
const topNews = async (req, res) => {
    const category = req.params.category;
 pool.query(queries.topNews, [category], (error, results) => {
    if(error) throw error
    return res.status(200).json(results.rows)
    });
}


// IPO CALENDAR API
const getIpos = async (req, res) => {
pool.query(queries.getIpos, (error, results) => {
    if(error) throw error;
    return res.status(200).json(results.rows);
    })
}

// EARNINGS CALENDAR API
const getEarningsCalendar = async (req, res) => {
    pool.query(queries.getEarningsCalendar, (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// Analyst Recommendations API
const getAnalystRecs = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.getAnalystRecs, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

const mostRecentRec = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.mostRecentRec, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

//SENTIMENT ANALYSIS API
const sentimentAnalysis = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.sentimentAnalysis, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// STOCK SPECIFIC NEWS API
const stockNews = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.stockNews, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// INSIDER TRANSACTIONS API
const insideTransactions = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.insideTransactions, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// EARNINGS SURPRISES API
const earningsSurprise = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.earningsSurprise, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// STOCK CANDLESTICK CHART API
const stockCandleStick = async (req, res) => {
    ticker = req.params.ticker;
    date = req.params.date;
    freq = req.params.freq;
    pool.query(queries.stockCandleStick, [ticker, date, freq],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

const candles = async (req, res) => {
    ticker = req.params.ticker;
    date = req.params.date;
    pool.query(queries.candles, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// STOCK BASIC INFO
const basicInfo = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.basicInfo, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

const keyMarketFinancials = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.keyMarketFinancials, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// METRICS GRAPH
const finRatiosAnnual = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.finRatiosAnnual, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}
const specificRatioAnnual = async (req, res) => {
    ticker = req.params.ticker;
    fsli = req.params.fsli;
    pool.query(queries.specificRatioAnnual, [ticker, fsli],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

const finRatiosQuarter = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.finRatiosQuarter, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}
const specificRatioQuarter = async (req, res) => {
    ticker = req.params.ticker;
    fsli = req.params.fsli;
    pool.query(queries.specificRatioQuarter, [ticker, fsli],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// HISTORICAL FINANCIALS
// const historFinancials = async (req, res) => {
//     ticker = req.params.ticker;
//     stmt = req.params.stmt;
//     year = req.params.year;
//     form = req.params.form;
//     pool.query(queries.historFinancials, [ticker, stmt, year, form],  (error, results) => {
//         if(error) throw error;
//         return res.status(200).json(results.rows);
//         })
// }
// const financialYears = async (req, res) => {
//     ticker = req.params.ticker;
//     pool.query(queries.financialYears, [ticker],  (error, results) => {
//         if(error) throw error;
//         return res.status(200).json(results.rows);
//         })
// }

// const annualFinancials = async (req, res) => {
//     ticker = req.params.ticker;
//     form = req.params.form;
//     pool.query(queries.annualFinancials, [ticker, form],  (error, results) => {
//         if(error) throw error;
//         return res.status(200).json(results.rows);
//         })
//}

// cOMPETITORS LIST
const stockCompetitors = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.stockCompetitors, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// COMPS TABLE
const allComps = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.allComps, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

const tickerComps = async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.tickerComps, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })
}

// FINANCIAL STATEMENTS
const finStmtDates =  async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.finStmtDates, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })    
}

const histFinancial =  async (req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.histFinancial, [ticker],  (error, results) => {
        if(error) throw error;
        return res.status(200).json(results.rows);
        })    
}

// DCF MODEL 
const dcfInputs = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.dcfInputs, [ticker],  (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

const revDcf = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.revDcf, [ticker],  (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

const topTrending = async(req, res) => {
    pool.query(queries.topTrending,  (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

const similarCompanies = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.similarCompanies, [ticker], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

const bigMovers = async(req, res) => {
    pool.query(queries.bigMovers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

const patents = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.patents, [ticker], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

const comp = async(req, res) => {
    pool.query(queries.comp, (error, results) => {
        if (error) {
            console.log(error)
        };
        res.status(200).json(results.rows);
});
}

const dcf = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.dcf, [ticker], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

const betaCalc = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.betaCalc, [ticker], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
});
}

const otherDcfAss = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.otherDcfAss, [ticker], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const newInsiders = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.newInsiders, [ticker], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const margin = async(req, res) => {
    ticker = req.params.ticker;
    fsli = req.params.fsli;
    pool.query(queries.margin, [ticker, fsli], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const finChart1 = async(req, res) => {
    ticker = req.params.ticker;
    fsli1 = req.params.one;
    fsli2 = req.params.two;

    pool.query(queries.finChart1, [ticker, fsli1, fsli2], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const finChart2 = async(req, res) => {
    ticker = req.params.ticker;
    fsli1 = req.params.one;
    fsli2 = req.params.two;
    fsli3 = req.params.three;

    pool.query(queries.finChart2, [ticker, fsli1, fsli2, fsli3], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const socialMentions = async(req, res) => {
    ticker = req.params.ticker;
    source = req.params.source;
    pool.query(queries.socialMentions, [ticker, source], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const socialScore = async(req, res) => {
    ticker = req.params.ticker;
    source = req.params.source;
    pool.query(queries.socialScore, [ticker, source], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const bvPerShare = async(req, res) => {
    ticker = req.params.ticker;
    pool.query(queries.bvPerShare, [ticker], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const marketMetrics = async(req, res) => {
    ticker = req.params.ticker;
    fsli = req.params.fsli;
    pool.query(queries.marketMetrics, [ticker, fsli], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const marketMetrics2 = async(req, res) => {
    ticker = req.params.ticker;
    fsli = req.params.fsli;
    pool.query(queries.marketMetrics2, [ticker, fsli], (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

const screener = async(req, res) => {
    pool.query(queries.screener, (error, results) => {
        if (error) {
            console.log(error.message);
            throw error;
        } 
        res.status(200).json(results.rows);
});
}

module.exports = {
    basicSearch,
    topNews,
    getIpos,
    getEarningsCalendar,
    getAnalystRecs,
    mostRecentRec,
    sentimentAnalysis,
    stockNews,
    insideTransactions,
    earningsSurprise,
    stockCandleStick,
    basicInfo,
    finRatiosAnnual,
    specificRatioAnnual,
    finRatiosQuarter,
    specificRatioQuarter,
    stockCompetitors,
    allComps,
    tickerComps,
    keyMarketFinancials,
    finStmtDates,
    histFinancial,
    dcfInputs,
    revDcf,
    topTrending,
    similarCompanies,
    bigMovers,
    patents,
    comp,
    dcf,
    betaCalc,
    otherDcfAss,
    candles,
    newInsiders,
    margin,
    socialMentions,
    socialScore,
    finChart1,
    finChart2,
    bvPerShare,
    marketMetrics,
    marketMetrics2,
    screener
}