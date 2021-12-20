<template>
<v-container> 
    <v-card class="mx-auto justify-center" >
        <template v-if="periodType == 'annual'">
            <v-row align="center" justify="center"> 
                <v-container>      
                <v-tabs>
                    <v-tab>Income Statement</v-tab>
                    <v-tab>Balance Sheet</v-tab>
                    <v-tab>Cash Flow Statement</v-tab>
                    <v-spacer></v-spacer>
                <v-radio-group v-model="periodType" row>
                <v-radio
                v-for="(fp, idx) in fiscalPeriod"
                :key="idx"
                :label="fp.label"
                :value="fp.value"
                mandatory
                >
                </v-radio>
            </v-radio-group>

                <v-tab-item>
                    <v-data-table
                    :headers="headers"
                    :items="incomeStmt"
                    hide-default-footer
                    disable-pagination
                    disable-filtering
                    disable-sort
                    class="elevation-1">
                    </v-data-table>
                </v-tab-item>

                <v-tab-item>
                    <v-data-table
                    :headers="headers"
                    :items="balanceSheet"
                    hide-default-footer
                    disable-pagination
                    disable-filtering
                    disable-sort
                    class="elevation-1">
                    </v-data-table>
                </v-tab-item>

                <v-tab-item>
                    <v-data-table
                    :headers="headers"
                    :items="cashFlow"
                    hide-default-footer
                    disable-pagination
                    disable-filtering
                    disable-sort
                    class="elevation-1">
                    </v-data-table>
                </v-tab-item>
                </v-tabs>
                </v-container>
            </v-row>                
        </template>

        <template v-else>
            <v-row align="center" justify="center">  
                <v-container>     
                <v-tabs>
                    <v-tab>income Statement</v-tab>
                    <v-tab>Balance Sheet</v-tab>
                    <v-tab>Cash Flow Statement</v-tab>
                    <v-spacer></v-spacer>
                <v-radio-group v-model="periodType" row>
                <v-radio
                v-for="(fp, idx) in fiscalPeriod"
                :key="idx"
                :label="fp.label"
                :value="fp.value"
                mandatory
                >
                </v-radio>
            </v-radio-group>

                <v-tab-item>
                    <v-data-table
                    :headers="QuarterHeaders"
                    :items="quarterIncomeStmt"
                    hide-default-footer
                    disable-pagination
                    disable-filtering
                    calculate-widths
                    disable-sort
                    class="elevation-1">
                    </v-data-table>
                </v-tab-item>

                <v-tab-item>
                    <v-data-table
                    :headers="QuarterHeaders"
                    :items="quarterBalSheet"
                    hide-default-footer
                    disable-pagination
                    disable-filtering
                    disable-sort
                    class="elevation-1">
                    </v-data-table>
                </v-tab-item>

                <v-tab-item>
                    <v-data-table
                    :headers="QuarterHeaders"
                    :items="quarterCashFlow"
                    hide-default-footer
                    disable-pagination
                    disable-filtering
                    disable-sort
                    class="elevation-1">
                    </v-data-table>
                </v-tab-item>
            </v-tabs>
            </v-container>
        </v-row>                
    </template>
    </v-card>

</v-container>

</template>

<script>
const numeral = require('numeral');

export default {
    data() {
        return {
           allFinancials: [],
           incomeStmt: [],
            balanceSheet: [],
            cashFlow: [],
            quarterIncomeStmt: [],
            quarterBalSheet: [],
            quarterCashFlow: [],
            headers: [
                {text: 'Line Items', value:'fsli'},
            ],
            QuarterHeaders: [
                {text: 'Line Items', value:'fsli'},
            ],
            periodType: 'annual',

            dates: [],
            fiscalPeriod: [
                {label: 'Annual', value: 'annual'},
                {label: 'Quarter', value: 'quarter'}
            ],
            Annrevenue: {
                fsli: 'Revenue',
            }, 
            AnncostSales: {
                fsli: 'Cost of Sales'
            },                
            AnnGrossProfit: {
                fsli: 'Gross Profit'
            },
            AnnRandD: {
                fsli: 'R&D Expense'
            },
            AnnSgAndA: {
                fsli: 'SG&A Expense'
            },
            AnnOpEx: {
                fsli: 'Operating Expenses'
            },
            AnnOpInc: {
                fsli: 'Operating Income'
            },
            AnnIntExp: {
                fsli: 'Interest Expense'
            },
            AnnInteresInc: {
                fsli: 'Interest Income'
            },
            AnnOtherNonOpInc: {
                fsli: 'Other Non-Operating Income'
            },
            AnnIncBeforeTax: {
                fsli: 'Income Before Tax'
            },
            AnnTaxExp: {
                fsli: 'Tax Expense'
            },
            AnnNetInc: {
                fsli: 'Net Income'
            },
            AnnCash: {
                fsli: 'Cash & Equivalents'
            },
            AnnShortInv: {
                fsli: 'Short Term Investments'
            },
            AnnAr: {
                fsli: 'Net Accounts Receivable'
            }, 
            AnnInv: {
                fsli: 'Inventories'
            }, 
            AnnOtherCa: {
                fsli: 'Other Current Assets'
            }, 
            AnnTotCa: {
                fsli: 'Total Current Assets'
            },                        
            AnnLtInv: {
                fsli: 'Long Term Investments'
            }, 
            AnnPpe: {
                fsli: 'Property, Plant, Equipment'
            }, 
            AnnGoodwill: {
                fsli: 'Goodwill'
            }, 
            AnnIntangAss: {
                fsli: 'Intangible Assets'
            }, 
            AnnOthNca: {
                fsli: 'Other NonCurrent Assets'
            }, 
            AnnTotNca: {
                fsli: 'Total NonCurrent Assets'
            }, 
            AnnAssetTot: {
                fsli: 'Total Assets'
            }, 
            AnnAccPay: {
                fsli: 'Accounts Payable'
            }, 
            AnnDefRev: {
                fsli: 'Deferred Revenue'
            }, 
            AnnCurrDebt: {
                fsli: 'Current Debt'
            }, 
            AnnOthCurrLiab: {
                fsli: 'Other Current Liabilities'
            }, 
            AnnTotLiabil: {
                fsli: 'Total Current Liabilities'
            }, 
            AnnLtDebt: {
                fsli: 'Long-Term Debt'
            }, 
            AnnNonCurrLiab: {
                fsli: 'Other NonCurrent Liabilities'
            }, 
            AnnTotalNonCurrLiab: {
                fsli: 'Total NonCurrent Liabilities'
            },
            AnnTotLiab: {
                fsli: 'Total Liabilities'
            }, 
            AnnCommonStock: {
                fsli: 'Common Stock'
            }, 
            AnnRetainEarn: {
                fsli: 'Retained Earnings'
            }, 
            AnnShareEquity: {
                fsli: 'Total Shareholders Equity'
            },
            AnnDepDeplAmort: {
                fsli: 'Depreciation & Amortization'
            },
            AnnChangeAr: {
                fsli: 'Change in Receivables'
            },
            AnnChangeInv: {
                fsli: 'Change in Inventories'
            },
            AnnChangeOperAss: {
                fsli: 'Change in Operating Assets'
            },
            AnnChangeOperLiab: {
                fsli: 'Change in Operating Liabilities'
            },
            AnnPayOperAct: {
                fsli: 'Payments for Operating Activities'
            },
            AnnProceedsOperAct: {
                fsli: 'Proceeds From Operating Activities'
            },
            AnnCashFromOper: {
                fsli: 'Cash Flow From Operations'
            },
            AnnCapex: {
                fsli: 'Capital Expenditures'
            },
            AnnCashInv: {
                fsli: 'Cash Flow From Investing Activities'
            },
            AnnIssCommStock: {
                fsli: 'Proceeds From Issuance of Common Stock'
            },
            AnnDivPreferr: {
                fsli: 'Dividend Payout Preferred Stock'
            },
            AnnDivCommon: {
                fsli: 'Dividend Payout Common Stock'
            },
            // AnnTotDiv: {
            //     fsli: 'Total Dividends Paid'
            // },
            // AnnPayRepurchCommon: {
            //     fsli: 'Payments For Repurchase of Common Stock'
            // },
            // AnnPayPreferredPurch: {
            //     fsli: 'Payments For Repurchase of Preferred Stock'
            // },
            // AnnPayRepurchEquity: {
            //     fsli: 'Payments For Repurchase of Equity'
            // },
            AnnProceIssLtDebt: {
                fsli: 'Proceeds From Issuance of Long-Term Debt'
            },
            AnnProcPreferrIssuance: {
                fsli: 'Proceeds From Issuance of Preferred Stock'
            },
            AnnRepayShortDebt: {
                fsli: 'Proceeds From Repayments of Short-Term Debt'
            },
            AnnRepurchEquityProceed: {
                fsli: 'Payments for Repurchase of Equity'
            },
            AnnSaleTreasury: {
                fsli: 'Proceeds From Sale of Treasury Stock'
            },
            AnnCashFinancing: {
                fsli: 'Cash Flow From Financing Activities'
            },
            AnnChangeCashBal: {
                fsli: 'Change in Cash Balance'
            },
            Quartrevenue: {
                fsli: 'Revenue',
            }, 
            QuartcostSales: {
                fsli: 'Cost of Sales'
            },                
            QuartGrossProfit: {
                fsli: 'Gross Profit'
            },
            QuartRandD: {
                fsli: 'R&D Expense'
            },
            QuartSgAndA: {
                fsli: 'SG&A Expense'
            },
            QuartOpEx: {
                fsli: 'Operating Expenses'
            },
            QuartOpInc: {
                fsli: 'Operating Income'
            },
            QuartIntExp: {
                fsli: 'Interest Expense'
            },
            QuartInteresInc: {
                fsli: 'Interest Income'
            },
            QuartOtherNonOpInc: {
                fsli: 'Other Non-Operating Income'
            },
            QuartIncBeforeTax: {
                fsli: 'Income Before Tax'
            },
            QuartTaxExp: {
                fsli: 'Tax Expense'
            },
            QuartNetInc: {
                fsli: 'Net Income'
            },
            QuartCash: {
                fsli: 'Cash & Equivalents'
            },
            QuartShortInv: {
                fsli: 'Short Term Investments'
            },
            QuartAr: {
                fsli: 'Net Accounts Receivable'
            }, 
            QuartInv: {
                fsli: 'Inventories'
            }, 
            QuartOtherCa: {
                fsli: 'Other Current Assets'
            }, 
            QuartTotCa: {
                fsli: 'Total Current Assets'
            },                        
            QuartLtInv: {
                fsli: 'Long Term Investments'
            }, 
            QuartPpe: {
                fsli: 'Property, Plant, Equipment'
            }, 
            QuartGoodwill: {
                fsli: 'Goodwill'
            }, 
            QuartIntangAss: {
                fsli: 'Intangible Assets'
            }, 
            QuartOthNca: {
                fsli: 'Other NonCurrent Assets'
            }, 
            QuartTotNca: {
                fsli: 'Total NonCurrent Assets'
            }, 
            QuartAssetTot: {
                fsli: 'Total Assets'
            }, 
            QuartAccPay: {
                fsli: 'Accounts Payable'
            }, 
            QuartDefRev: {
                fsli: 'Deferred Revenue'
            }, 
            QuartCurrDebt: {
                fsli: 'Current Debt'
            }, 
            QuartOthCurrLiab: {
                fsli: 'Other Current Liabilities'
            }, 
            QuartTotLiabil: {
                fsli: 'Total Current Liabilities'
            }, 
            QuartLtDebt: {
                fsli: 'Long-Term Debt'
            }, 
            QuartNonCurrLiab: {
                fsli: 'Other NonCurrent Liabilities'
            }, 
            QuartTotalNonCurrLiab: {
                fsli: 'Total NonCurrent Liabilities'
            },
            QuartTotLiab: {
                fsli: 'Total Liabilities'
            }, 
            QuartCommonStock: {
                fsli: 'Common Stock'
            }, 
            QuartRetainEarn: {
                fsli: 'Retained Earnings'
            }, 
            QuartShareEquity: {
                fsli: 'Total Shareholders Equity'
            },
            QuartDepDeplAmort: {
                fsli: 'Depreciation & Amortization'
            },
            QuartChangeAr: {
                fsli: 'Change in Receivables'
            },
            QuartChangeInv: {
                fsli: 'Change in Inventories'
            },
            QuartChangeOperAss: {
                fsli: 'Change in Operating Assets'
            },
            QuartChangeOperLiab: {
                fsli: 'Change in Operating Liabilities'
            },
            QuartPayOperAct: {
                fsli: 'Payments for Operating Activities'
            },
            QuartProceedsOperAct: {
                fsli: 'Proceeds From Operating Activities'
            },
            QuartCashFromOper: {
                fsli: 'Cash Flow From Operations'
            },
            QuartCapex: {
                fsli: 'Capital Expenditures'
            },
            QuartCashInv: {
                fsli: 'Cash Flow From Investing Activities'
            },
            QuartIssCommStock: {
                fsli: 'Proceeds From Issuance of Common Stock'
            },
            QuartDivPreferr: {
                fsli: 'Dividend Payout Preferred Stock'
            },
            QuartDivCommon: {
                fsli: 'Dividend Payout Common Stock'
            },
            // QuartTotDiv: {
            //     fsli: 'Total Dividends Paid'
            // },
            // QuartPayRepurchCommon: {
            //     fsli: 'Payments For Repurchase of Common Stock'
            // },
            // QuartPayPreferredPurch: {
            //     fsli: 'Payments For Repurchase of Preferred Stock'
            // },
            // QuartPayRepurchEquity: {
            //     fsli: 'Payments For Repurchase of Equity'
            // },
            QuartProceIssLtDebt: {
                fsli: 'Proceeds From Issuance of Long-Term Debt'
            },
            QuartProcPreferrIssuance: {
                fsli: 'Proceeds From Issuance of Preferred Stock'
            },
            QuartRepayShortDebt: {
                fsli: 'Proceeds From Repayments of Short-Term Debt'
            },
            QuartRepurchEquityProceed: {
                fsli: 'Payments for Repurchase of Equity'
            },
            QuartSaleTreasury: {
                fsli: 'Proceeds From Sale of Treasury Stock'
            },
            QuartCashFinancing: {
                fsli: 'Cash Flow From Financing Activities'
            },
            QuartChangeCashBal: {
                fsli: 'Change in Cash Balance'
            },
        }
    },

    methods: {
    abbreviate(num) {
      return numeral(num).format('(0.00a)');
    },

        async initialData() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const getDate = await this.$axios.get(`/api/historical/financials/dates/${ticker}`);
            let DateData = getDate.data
            for (let i = 0; i < DateData.length; i++) {
                const newTime = DateData[i].date.split('T')[0];
                this.dates.push(newTime);
                const updateHead = JSON.parse(`{"text": "${newTime}", "value": "${newTime}"}`)
                if( DateData[i].fp == 'annual') {
                this.headers.push(updateHead)                  
                } else {
                    this.QuarterHeaders.push(updateHead)  
                }
            };
           
            const annualFinancials = await this.$axios.get(`/api/financials/values/${ticker}`);
            this.allFinancials = annualFinancials.data
            this.allFinancials.forEach(line => {
                const date = line.date.split('T')[0];
                if(line.fp == 'annual' && line.stmt == 'IS') {
                    if(line.fsli == 'totalRevenue'){                       
                        this.Annrevenue[date] = this.abbreviate(line.value) 
                    } else if(line.fsli == 'costOfRevenue') {
                        this.AnncostSales[date] = this.abbreviate(-Math.abs(line.value))
                    } else if(line.fsli == 'grossProfit') {
                        this.AnnGrossProfit[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'researchAndDevelopment') {
                        this.AnnRandD[date] = this.abbreviate(-Math.abs(line.value))
                    } else if(line.fsli == 'sellingGeneralAndAdministrative') {
                        this.AnnSgAndA[date] = this.abbreviate(-Math.abs(line.value))
                    } else if(line.fsli == 'operatingExpenses') {
                        this.AnnOpEx[date] = this.abbreviate(-Math.abs(line.value))
                    } else if(line.fsli == 'operatingIncome') {
                        this.AnnOpInc[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'interestExpense') {
                        this.AnnIntExp[date] = this.abbreviate(-Math.abs(line.value))
                    } else if(line.fsli == 'interestIncome') {
                        this.AnnInteresInc[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'otherNonOperatingIncome') {
                        this.AnnOtherNonOpInc[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'incomeBeforeTax') {
                        this.AnnIncBeforeTax[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'incomeTaxExpense') {
                        this.AnnTaxExp[date] = this.abbreviate(-Math.abs(line.value))
                    } else if(line.fsli == 'netIncome') {
                        this.AnnNetInc[date] =  this.abbreviate(line.value)
                    }
                } 
                
                else if (line.fp == 'annual' && line.stmt == 'BS') {
                    if(line.fsli == 'cashAndCashEquivalentsAtCarryingValue'){                       
                        this.AnnCash[date] =  this.abbreviate(line.value) 
                    } else if(line.fsli == 'shortTermInvestments') {
                        this.AnnShortInv[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'currentNetReceivables') {
                        this.AnnAr[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'inventory') {
                        this.AnnInv[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'otherCurrentAssets') {
                        this.AnnOtherCa[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'totalCurrentAssets') {
                        this.AnnTotCa[date] =  this.abbreviate(line.value)
                    }else if(line.fsli == 'propertyPlantEquipment') {
                        this.AnnPpe[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'longTermInvestments') {
                        this.AnnLtInv[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'intangibleAssetsExcludingGoodwill') {
                        this.AnnIntangAss[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'goodwill') {
                        this.AnnGoodwill[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'intangibleAssets') {
                        this.AnnIntangAss[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'otherNonCurrrentAssets') {
                        this.AnnOthNca[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'totalNonCurrentAssets') {
                        this.AnnTotNca[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'totalAssets') {
                        this.AnnAssetTot[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'deferredRevenue') {
                        this.AnnAccPay[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'currentAccountsPayable') {
                        this.AnnDefRev[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'currentDebt') {
                        this.AnnCurrDebt[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'otherCurrentLiabilities') {
                        this.AnnOthCurrLiab[date] =  this.abbreviate(line.value)
                    }  else if(line.fsli == 'totalCurrentLiabilities') {
                        this.AnnTotLiabil[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'longTermDebtNoncurrent') {
                        this.AnnLtDebt[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'otherNonCurrentLiabilities') {
                        this.AnnNonCurrLiab[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'totalNonCurrentLiabilities') {
                        this.AnnNonCurrLiab[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'totalLiabilities') {
                        this.AnnTotLiab[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'commonStock') {
                        this.AnnCommonStock[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'retainedEarnings') {
                        this.AnnRetainEarn[date] =  this.abbreviate(line.value)
                    } else if(line.fsli == 'totalShareholderEquity') {
                        this.AnnShareEquity[date] =  this.abbreviate(line.value)
                    }
                }

                else if (line.fp == 'annual' && line.stmt == 'CF') {
                    if(line.fsli == 'depreciationDepletionAndAmortization'){                       
                        this.AnnDepDeplAmort[date] = this.abbreviate(line.value) 
                    } else if(line.fsli == 'changeInReceivables') {
                        this.AnnChangeAr[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'changeInInventory') {
                        this.AnnChangeInv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'changeInOperatingAssets') {
                        this.AnnChangeOperAss[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'changeInOperatingLiabilities') {
                        this.AnnChangeOperLiab[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'paymentsForOperatingActivities') {
                        this.AnnPayOperAct[date] = this.abbreviate(line.value)
                    }else if(line.fsli == 'proceedsFromOperatingActivities') {
                        this.AnnProceedsOperAct[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'operatingCashflow') {
                        this.AnnCashFromOper[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'capitalExpenditures') {
                        this.AnnCapex[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'cashflowFromInvestment') {
                        this.AnnCashInv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromIssuanceOfCommonStock') {
                        this.AnnIssCommStock[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'dividendPayoutPreferredStock') {
                        this.AnnDivPreferr[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'dividendPayoutCommonStock') {
                        this.AnnDivCommon[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'dividendPayout') {
                        this.AnnTotDiv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'paymentsForRepurchaseOfCommonStock') {
                        this.AnnPayRepurchCommon[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'paymentsForRepurchaseOfEquity') {
                        this.AnnPayRepurchEquity[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'paymentsForRepurchaseOfPreferredStock') {
                        this.AnnPayPreferredPurch[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet') {
                        this.AnnProceIssLtDebt[date] = this.abbreviate(line.value)
                    }  else if(line.fsli == 'proceedsFromIssuanceOfPreferredStock') {
                        this.AnnProcPreferrIssuance[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromRepaymentsOfShortTermDebt') {
                        this.AnnRepayShortDebt[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromRepurchaseOfEquity') {
                        this.AnnRepurchEquityProceed[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromSaleOfTreasuryStock') {
                        this.AnnSaleTreasury[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'cashflowFromFinancing') {
                        this.AnnCashFinancing[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'changeInCashAndCashEquivalents') {
                        this.AnnChangeCashBal[date] = this.abbreviate(line.value)
                    } 
                }  
                else if(line.fp == 'quarter' && line.stmt == 'IS') {
                    if(line.fsli == 'totalRevenue'){                       
                        this.Quartrevenue[date] = this.abbreviate(line.value) 
                    } else if(line.fsli == 'costOfRevenue') {
                        this.QuartcostSales[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'grossProfit') {
                        this.QuartGrossProfit[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'researchAndDevelopment') {
                        this.QuartRandD[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'sellingGeneralAndAdministrative') {
                        this.QuartSgAndA[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'operatingExpenses') {
                        this.QuartOpEx[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'operatingIncome') {
                        this.QuartOpInc[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'interestExpense') {
                        this.QuartIntExp[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'interestIncome') {
                        this.QuartInteresInc[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'otherNonOperatingIncome') {
                        this.QuartOtherNonOpInc[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'incomeBeforeTax') {
                        this.QuartIncBeforeTax[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'incomeTaxExpense') {
                        this.QuartTaxExp[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'netIncome') {
                        this.QuartNetInc[date] = this.abbreviate(line.value)
                    }
                } 

                else if (line.fp == 'quarter' && line.stmt == 'BS') {
                    if(line.fsli == 'cashAndCashEquivalentsAtCarryingValue'){                       
                        this.QuartCash[date] = this.abbreviate(line.value) 
                    } else if(line.fsli == 'shortTermInvestments') {
                        this.QuartShortInv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'currentNetReceivables') {
                        this.QuartAr[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'inventory') {
                        this.QuartInv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'otherCurrentAssets') {
                        this.QuartOtherCa[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'totalCurrentAssets') {
                        this.QuartTotCa[date] = this.abbreviate(line.value)
                    }else if(line.fsli == 'propertyPlantEquipment') {
                        this.QuartPpe[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'longTermInvestments') {
                        this.QuartLtInv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'intangibleAssetsExcludingGoodwill') {
                        this.QuartIntangAss[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'goodwill') {
                        this.QuartGoodwill[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'intangibleAssets') {
                        this.QuartIntangAss[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'otherNonCurrrentAssets') {
                        this.QuartOthNca[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'totalNonCurrentAssets') {
                        this.QuartTotNca[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'totalAssets') {
                        this.QuartAssetTot[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'deferredRevenue') {
                        this.QuartAccPay[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'currentAccountsPayable') {
                        this.QuartDefRev[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'currentDebt') {
                        this.QuartCurrDebt[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'otherCurrentLiabilities') {
                        this.QuartOthCurrLiab[date] = this.abbreviate(line.value)
                    }  else if(line.fsli == 'totalCurrentLiabilities') {
                        this.QuartTotLiabil[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'longTermDebtNoncurrent') {
                        this.QuartLtDebt[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'otherNonCurrentLiabilities') {
                        this.QuartNonCurrLiab[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'totalNonCurrentLiabilities') {
                        this.QuartNonCurrLiab[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'totalLiabilities') {
                        this.QuartTotLiab[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'commonStock') {
                        this.QuartCommonStock[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'retainedEarnings') {
                        this.QuartRetainEarn[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'totalShareholderEquity') {
                        this.QuartShareEquity[date] = this.abbreviate(line.value)
                    }
                        }

                else if (line.fp == 'quarter' && line.stmt == 'CF') {
                    if(line.fsli == 'depreciationDepletionAndAmortization'){                       
                        this.QuartDepDeplAmort[date] = this.abbreviate(line.value) 
                    } else if(line.fsli == 'changeInReceivables') {
                        this.QuartChangeAr[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'changeInInventory') {
                        this.QuartChangeInv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'changeInOperatingAssets') {
                        this.QuartChangeOperAss[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'changeInOperatingLiabilities') {
                        this.QuartChangeOperLiab[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'paymentsForOperatingActivities') {
                        this.QuartPayOperAct[date] = this.abbreviate(line.value)
                    }else if(line.fsli == 'proceedsFromOperatingActivities') {
                        this.QuartProceedsOperAct[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'operatingCashflow') {
                        this.QuartCashFromOper[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'capitalExpenditures') {
                        this.QuartCapex[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'cashflowFromInvestment') {
                        this.QuartCashInv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromIssuanceOfCommonStock') {
                        this.QuartIssCommStock[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'dividendPayoutPreferredStock') {
                        this.QuartDivPreferr[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'dividendPayoutCommonStock') {
                        this.QuartDivCommon[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'dividendPayout') {
                        this.QuartTotDiv[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'paymentsForRepurchaseOfCommonStock') {
                        this.QuartPayRepurchCommon[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'paymentsForRepurchaseOfEquity') {
                        this.QuartPayRepurchEquity[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'paymentsForRepurchaseOfPreferredStock') {
                        this.QuartPayPreferredPurch[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromIssuanceOfLongTermDebtAndCapitalSecuritiesNet') {
                        this.QuartProceIssLtDebt[date] = this.abbreviate(line.value)
                    }  else if(line.fsli == 'proceedsFromIssuanceOfPreferredStock') {
                        this.QuartProcPreferrIssuance[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromRepaymentsOfShortTermDebt') {
                        this.QuartRepayShortDebt[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'proceedsFromRepurchaseOfEquity') {
                        this.QuartRepurchEquityProceed[date] = line.value
                    } else if(line.fsli == 'proceedsFromSaleOfTreasuryStock') {
                        this.QuartSaleTreasury[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'cashflowFromFinancing') {
                        this.QuartCashFinancing[date] = this.abbreviate(line.value)
                    } else if(line.fsli == 'changeInCashAndCashEquivalents') {
                        this.QuartChangeCashBal[date] = this.abbreviate(line.value)
                    } 
                    }
            });

const annIncStmtArr = [this.Annrevenue, this.AnncostSales, this.AnnGrossProfit, 
this.AnnRandD, this.AnnSgAndA, this.AnnOpEx, this.AnnOpInc, this.AnnIntExp, this.AnnInteresInc, 
this.AnnOtherNonOpInc, this.AnnIncBeforeTax, this.AnnTaxExp, this.AnnNetInc];
annIncStmtArr.forEach(item => {
    if (Object.keys(item).length > 1) {
        this.incomeStmt.push(item)
    }
})            

const annBsArr =[this.AnnCash, this.AnnShortInv, this.AnnAr, this.AnnInv,this.AnnOtherCa,
this.AnnTotCa, this.AnnLtInv, this.AnnPpe,this.AnnIntangAss,this.AnnGoodwill,this.AnnIntangAss, 
this.AnnOthNca,this.AnnTotNca,this.AnnAssetTot,this.AnnAccPay,this.AnnDefRev,this.AnnCurrDebt, this.AnnOthCurrLiab,
this.AnnTotLiab, this.AnnLtDebt,this.AnnNonCurrLiab, this.AnnTotalNonCurrLiab, 
this.AnnTotLiab,this.AnnCommonStock,this.AnnRetainEarn, this.AnnShareEquity];
annBsArr.forEach(item => {
    if (Object.keys(item).length > 1) {
        this.balanceSheet.push(item)
    }
})    

const annCashFlowArray = [this.AnnNetInc, this.AnnDepDeplAmort, this.AnnChangeAr, this.AnnChangeInv, this.AnnChangeOperAss,
this.AnnChangeOperLiab, this.AnnPayOperAct, this.AnnProceedsOperAct, this.AnnCashFromOper, this.AnnCapex, this.AnnCashInv,
this.AnnIssCommStock, this.AnnDivPreferr, this.AnnDivCommon, this.AnnTotDiv, this.AnnPayRepurchCommon, this.AnnPayRepurchEquity, 
this.AnnPayPreferredPurch, this.AnnProceIssLtDebt, this.AnnProcPreferrIssuance,
this.AnnRepayShortDebt, this.AnnRepurchEquityProceed, this.AnnSaleTreasury, this.AnnCashFinancing, this.AnnChangeCashBal];
annCashFlowArray.forEach(item => {
    if (Object.keys(item).length > 1) {
        this.cashFlow.push(item)
    }
})

const quartIncStmtArr = [this.Quartrevenue, this.QuartcostSales, this.QuartGrossProfit, 
    this.QuartRandD, this.QuartSgAndA, this.QuartOpEx, this.QuartOpInc, this.QuartIntExp, this.QuartInteresInc, 
    this.QuartOtherNonOpInc, this.QuartIncBeforeTax, this.QuartTaxExp, this.QuartNetInc];

    quartIncStmtArr.forEach(item => {
    if (Object.keys(item).length > 1) {
        this.quarterIncomeStmt.push(item)
    }
})

const quartBSArr = [this.QuartCash, this.QuartShortInv, this.QuartAr, this.QuartInv,this.QuartOtherCa,
this.QuartTotCa, this.QuartLtInv, this.QuartPpe,this.QuartIntangAss,this.QuartGoodwill,this.QuartIntangAss, 
this.QuartOthNca,this.QuartTotNca,this.QuartAssetTot,this.QuartAccPay,this.QuartDefRev,this.QuartCurrDebt, this.QuartOthCurrLiab,
this.QuartTotLiab, this.QuartLtDebt,this.QuartNonCurrLiab, this.QuartTotalNonCurrLiab, this.QuartTotLiab,this.QuartCommonStock,this.QuartRetainEarn, this.QuartShareEquity]
    quartBSArr.forEach(item => {
    if (Object.keys(item).length > 1) {
        this.quarterBalSheet.push(item)
    }
})

const quartCfArray = [this.QuartNetInc, this.QuartDepDeplAmort, this.QuartChangeAr, this.QuartChangeInv, this.QuartChangeOperAss,
this.QuartChangeOperLiab, this.QuartPayOperAct, this.QuartProceedsOperAct, this.QuartCashFromOper, this.QuartCapex, this.QuartCashInv,
this.QuartIssCommStock, this.QuartDivPreferr, this.QuartDivCommon, this.QuartTotDiv, this.QuartPayRepurchCommon, this.QuartPayRepurchEquity, 
this.QuartPayPreferredPurch, this.QuartProceIssLtDebt, this.QuartProcPreferrIssuance,
this.QuartRepayShortDebt, this.QuartRepurchEquityProceed, this.QuartSaleTreasury, this.QuartCashFinancing, this.QuartChangeCashBal]
    quartCfArray.forEach(item => {
    if (Object.keys(item).length > 1) {
        this.quarterCashFlow.push(item)
    }
})

   }
},

    mounted() {
        this.initialData();
    }

}
</script>

<style>

</style>