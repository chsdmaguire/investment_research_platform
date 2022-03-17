const technicalCalcs = require('technicalindicators');

export default {
    doji(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.doji(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Doji", y])
                }
                });
        return data;
    },
    bearEngulf(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.bearishengulfingpattern(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Bear EP", y])
            };
        }
        return data;
    },
    bullEngulf(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.bullishengulfingpattern(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Bull EP", y])
            };
        }
        return data;
    },
    darkCloud(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.darkcloudcover(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "BEP", y])
            };
        }
        return data;
    },
    downTasuki(prices) {
        const data = [];
        const window = 3;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.downsidetasukigap(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "DTG", y])
            };
        }
        return data;
    },
    dragoDoj(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.dragonflydoji(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Dragon Doji", y])
                }
                });
        return data;
    },
    graveDoj(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.gravestonedoji(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Grave Doji", y])
                }
                });
        return data;
    },
    bullHaram(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.bullishharami(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "BH", y])
            };
        }
        return data;
    },
    
    bullHaramCross(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.bullishharamicross(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Bull HC", y])
            };
        }
        return data;
    },
    bearHaramCross(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.bearishharamicross(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "BHC", y])
            };
        }
        return data;
    },
    bullMarubozu(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.bullishmarubozu(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Bull MB", y])
                }
                });
        return data;
    },
    bearMarubozu(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.bullishmarubozu(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Bear MB", y])
                }
                });
        return data;
    },
    evDojStar(prices) {
        const data = [];
        const window = 3;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.eveningdojistar(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Evening DS", y])
            };
        }
        return data;
    },
    evStar(prices) {
        const data = [];
        const window = 3;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.eveningstar(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Evening Star", y])
            };
        }
        return data;
    },
    pierceLine(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.piercingline(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "PL", y])
            };
        }
        return data;
    },
    bullSpinTop(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.bullishspinningtop(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Bull ST", y])
                }
                });
        return data;
    },
    bearSpinTop(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.bearishspinningtop(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Bear ST", y])
                }
                });
        return data;
    },
    mornDojStar(prices) {
        const data = [];
        const window = 3;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.morningdojistar(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Morning DS", y])
            };
        }
        return data;
    },
    mornStar(prices) {
        const data = [];
        const window = 3;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.morningstar(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Morning Star", y])
            };
        }
        return data;
    },
    blackCrows(prices) {
        const data = [];
        const window = 3;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.threeblackcrows(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "3 Black Crows", y])
            };
        }
        return data;
    },
    whiteSoldiers(prices) {
        const data = [];
        const window = 3;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.threewhitesoldiers(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "3 White Soldiers", y])
            };
        }
        return data;
    },
    tweezTop(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.tweezertop(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Tweezer Top", y])
            };
        }
        return data;
    },
    tweezBottom(prices) {
        const data = [];
        const window = 2;
        let index = window -1;
        while(++index < prices.length) {
            const inputs = {
                open: [],
                high: [],
                low: [],
                close: [],
            };
            const windowSlice = prices.slice(index - window, index);
            const date = windowSlice.slice(-1)[0][0]
            windowSlice.forEach(item => {
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
            });
            const result = technicalCalcs.tweezerbottom(inputs);
            if(result) {
                const y = inputs.high[0]
                data.push([date, "Tweezer Top", y])
            };
        }
        return data;
    },
    bullHammer(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.bullishhammer(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Bull Hammer", y])
                }
                });
        return data;
    },
    bearHammer(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.bearishhammer(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Bear Hammer", y])
                }
                });
        return data;
    },
    hangMan(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.hangingman(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Hanging Man", y])
                }
                });
        return data;
    },
    shootStar(prices) {
        const data = [];
            prices.forEach(item => {
                const inputs = {
                    open: [],
                    high: [],
                    low: [],
                    close: [],
                };
                let date = 0;
                inputs.open.push(item[1]);
                inputs.high.push(item[2]);
                inputs.close.push(item[4]);
                inputs.low.push(item[3]);
                date = item[0]

                const result = technicalCalcs.shootingstar(inputs);
                if(result) {
                    const y = inputs.high[0]
                    data.push([date, "Shoot Star", y])
                }
                });
        return data;
    },
}