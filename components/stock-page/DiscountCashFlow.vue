<template>
  <v-container fluid>
      <div>     
              <v-row no-gutters justify="center">            
                  <h4>Discounted Cash Flow Valuation </h4>
              </v-row>
          <v-container fluid>
            <!-- <template v-if="loading">
                <v-skeleton-loader dark type="date-picker">
                </v-skeleton-loader>         
            </template> -->
            <template>
          <v-row>
              <v-col cols="3">
                  <v-row  justify="center" align="center">
                      <v-col cols="12">
                          <div class="assumptions">
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th>
                                        Financials Assumptions
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Revenue Growth Rate
                                            </span>
                                        </template>
                                         This is the assumed revenue growth for the next 5 years. It's been calculated by finding the compounding average growth rate (CAGR) over the previous 5 years
                                        (or however far back data revenue is available, depending on how long the company has been public). Next to it is the trailing 12 month total revenue, calculated as the sum of the 
                                        last 4 quarters of revenue.
                                        If you feel revenue growth should be different, feel free to change it!
                                        </v-tooltip>                                       
                                    </td>
                                    <td align="left">
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.RevRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="RevRate"
                                                    step=".1"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                               Gross Margin
                                            </span>
                                        </template>
                                       This is the estimated Gross Profit Margin based on the average gross profit as a percentage of revenue over the last 5 years (or however long data is available depending on the company's age).
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.grossProfitRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="grossProfitRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                R&D Margin
                                            </span>
                                        </template>
                                         The estimated percentage of revenue to be allocated towards R&D expenses in the future. It's calculated by finding the average r&d margin over the last 5 years or however many years of financial data are publicly available. 
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.RdRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="RdRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                SG&A Margin
                                            </span>
                                        </template>
                                          The estimated percentage of revenue to be allocated towards sales, general, adminstrative, and marketing expenses expenses in the future. It's calculated by finding the average sg&a margin over the last 5 years or however many years of financial data are publicly available. 
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.SgaRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="SgaRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Tax Rate
                                            </span>
                                        </template>
                                        The estimated percentage of income the company is expected to pay in taxes. It's calculated based on finding the average tax expense as a percentage of income before tax in the last 5 years or however many years of financial data are publicly available.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.TaxRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="TaxRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                D&A Margin
                                            </span>
                                        </template>
                                         The estimated percentage of revenue expected to be allocated towards non-cash expenses including depreciation and amortization. It's calculated based on finding the average d&a expense as a percentage of revenue in the last 5 years or however many years of financial data are publicly available.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.DeprRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="DeprRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                               Change in COA Margin
                                            </span>
                                        </template>
                                        The estimated change in short-term operating assets as a percentage of revenue. It's calculated based on finding the average change in operating assets as a percentage of revenue in the last 5 years or however many years of financial data are publicly available.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.OpAssetRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="OpAssetRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Change in COL Margin
                                            </span>
                                        </template>
                                        The estimated change in short-term operating liabilities as a percentage of revenue. It's calculated based on finding the average change in operating liabilities as a percentage of revenue in the last 5 years or however many years of financial data are publicly available.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.OpLiabRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="OpLiabRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Capex Margin
                                            </span>
                                        </template>
                                          The estimated capital expenditures as a percentage of revenue. It's calculated based on finding the average capex as a percentage of revenue in the last 5 years or however many years of financial data are publicly available.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.CapexRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="CapexRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                          </div>
                      </v-col>
                  </v-row>
                  <v-row  justify="center" align="center">
                      <v-col cols="12">
                          <div class="assumptions">
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th>
                                        Capital Structure
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                              <tbody>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Price
                                            </span>
                                        </template>
                                         Most recent price per share
                                        </v-tooltip>                                       
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatVal(this.price) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="price"
                                                    step="1"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                               Shares Outstanding
                                            </span>
                                        </template>
                                        The total number of shares held by all of the company's shareholders.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatNumber(this.sharesOuts) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="sharesOuts"
                                                    step="100000"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                               Market Cap
                                            </span>
                                        </template>
                                       The total market value of a company's publicly traded shares.
                                        </v-tooltip>
                                    </td>
                                    <td  class="output">
                                        {{formatNumber(this.price * this.sharesOuts) }}                                     
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Total Debt
                                            </span>
                                        </template>
                                       The total value of a company's short-term and long-term obligations to lenders.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatNumber(this.totalDebt) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="totalDebt"
                                                    step="1000000"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Total Cash
                                            </span>
                                        </template>
                                        The total value of cash on hand held by the company
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatNumber(this.totalCash) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="totalCash"
                                                    step="1000000"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Net Debt
                                            </span>
                                        </template>
                                        The total value of a company's debt after subtracting the total value of its cash.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{ formatNumber(this.totalDebt - this.totalCash) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Enterprise Value
                                            </span>
                                        </template>
                                        The total value of the company owned by shareholders and lenders. Calculated by adding the current market cap and net debt.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{ formatNumber((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                % Equity
                                            </span>
                                        </template>
                                        The percentage of the company's enterprise value represented by shareholder ownership.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                         {{ formatPercent( ((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash))) * 100 ) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                % Debt
                                            </span>
                                        </template>
                                         The percentage of the company's enterprise value represented by creditor ownership.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                         {{ formatPercent( ((this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash))) * 100 ) }}
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                          </div>    
                      </v-col>
                  </v-row>
                  <v-row  justify="center" align="center">
                      <v-col cols="12">
                          <div>
                        <v-simple-table dense class="assumptions">
                            <thead>
                                <tr>
                                    <th>
                                        Cost of Capital
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                 <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Beta
                                            </span>
                                        </template>
                                        The measure of the company's stock price movement in relation the the overall market. It's calculated by dividing the covariance between the daily stock price's returns with the daily S&P500 returns by the variance of the daily S&P500 returns.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatVal(this.beta) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="beta"
                                                    step=".1"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Risk Free Rate
                                            </span>
                                        </template>
                                        The yield on a 30-year treasury bond. 
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.riskFreeRate) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="riskFreeRate"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Market Return
                                            </span>
                                        </template>
                                        The long-term average return of the S&P 500.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.marketReturn) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="marketReturn"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Cost of Equity
                                            </span>
                                        </template>
                                        The expected return for shareholders. It's calculated using the CAPM formula: risk-free rate + (market return - risk-free rate)*beta
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{ formatPercent(this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta)) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Cost of Debt
                                            </span>
                                        </template>
                                        The expected return for creditors. It's calculated based on the average interest expense as a percentage of total debt.
                                        </v-tooltip>
                                    </td>
                                    <td>
                                        <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.costDebt) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="costDebt"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                WACC
                                            </span>
                                        </template>
                                        Weight Average Cost of Capital. The weighted average return the company expects based on its cost of equity and cost of debt.                               
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{ formatPercent((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ) * 
                                        (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (
                                            this.costDebt * (1 - this.TaxRate) * ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) )))

                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                          </div>
                      </v-col>
                  </v-row>
              </v-col>
              <v-col cols="8">
                <v-row justify="center" align="center">
                    <v-col cols="12">
                        <div class="dcf">
                    <v-simple-table dense class="dcf-table">
                            <thead>
                            <tr>
                                <th>Line Items</th>
                                <th>FY 2021A</th>
                                <th>FY 2022E</th>
                                <th>FY 2023E</th>
                                <th>FY 2024E</th>
                                <th>FY 2025E</th>
                                <th>FY 2026E</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr >
                                <td class="zebra">
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="zebra fsli-name">
                                        Revenue
                                    </span>
                                    </template>
                                    This is the assumed revenue growth for the next 5 years. It's been calculated by finding the compounding average growth rate (CAGR) over the previous 5 years
                                    (or however far back data revenue is available, depending on how long the company has been public). Next to it is the trailing 12 month total revenue, calculated as the sum of the 
                                    last 4 quarters of revenue.
                                    If you feel revenue growth should be different, feel free to change it!
                                </v-tooltip> </td>
                                <td class="zebra"> {{ formatNumber(this.revenue) }} </td> 
                                <td class="zebra"> {{ formatNumber(Math.round((this.revenue * (1 + (this.RevRate / 100)) ))) }} </td> 
                                <td class="zebra"> {{ formatNumber(Math.round((this.revenue * ((1 + (this.RevRate / 100)) ** 2) ))) }} </td>
                                <td class="zebra"> {{ formatNumber(Math.round((this.revenue * ((1 + (this.RevRate / 100)) ** 3) )))  }} </td>
                                <td class="zebra"> {{ formatNumber(Math.round((this.revenue * ((1 + (this.RevRate / 100)) ** 4) ))) }} </td>
                                <td class="zebra"> {{ formatNumber(Math.round((this.revenue * ((1 + (this.RevRate / 100)) ** 5) ))) }} </td>                        
                                </tr>
                                <tr>
                                    <td> 
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="fsli-name">
                                        COGS
                                    </span>
                                    </template>
                                    COGS stands for Cost of Goods Sold. It is the aggregate costs related to goods produced and sold and services rendered by an entity during the reporting period including
                                    depreciation and amortization.
                                </v-tooltip> </td>
                                <td> {{ formatNumber(-this.costOfGoods) }} </td> 
                                    <td > {{ formatNumber(Math.round(((-this.revenue * (1 + (this.RevRate / 100))) * (1 - (this.grossProfitRate / 100)) ))) }} </td> 
                                    <td> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 2) * (1 - (this.grossProfitRate / 100)) ))) }} </td>
                                    <td> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 3) * (1 - (this.grossProfitRate / 100)) )))  }} </td>
                                    <td> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 4) * (1 - (this.grossProfitRate / 100)) )))  }} </td>
                                    <td> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (1 - (this.grossProfitRate / 100)) ))) }} </td>
                                </tr>
                                <tr>
                                    <td class="zebra"> 
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="zebra fsli-name">
                                        Gross Profit
                                    </span>
                                    </template>
                                    The estimated Gross Profit Margin based on the average gross profit as a percentage of revenue over the last 5 years (or however long data is available depending on the company's age).
                                    If you feel that its gross margin will be different in the future, feel free to change it!
                                </v-tooltip>  </td>
                                    <td class="zebra"> {{ formatNumber(Math.round((this.revenue - this.costOfGoods) )) }} </td> 
                                    <td class="zebra"> {{ formatNumber(Math.round(((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate / 100)) )) }} </td> 
                                    <td class="zebra"> {{ formatNumber(Math.round(((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.grossProfitRate / 100)) )) }} </td>
                                    <td class="zebra"> {{ formatNumber(Math.round(((this.revenue * ((1 + (this.RevRate / 100))) ** 3) * (this.grossProfitRate / 100)) )) }} </td>
                                    <td class="zebra"> {{ formatNumber(Math.round(((this.revenue * ((1 + (this.RevRate / 100))) ** 4) * (this.grossProfitRate / 100)) )) }} </td>
                                    <td class="zebra"> {{ formatNumber(Math.round(((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.grossProfitRate / 100)) )) }} </td>
                            </tr>
                            <tr>
                                <td> 
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="fsli-name">
                                        R&D Expense
                                    </span>
                                    </template>
                                    The aggregate total costs related to selling a firm's product and services, as well as all 
                                other general and administrative expenses. Direct selling expenses (for example, credit, warranty, 
                                and advertising) are expenses that can be directly linked to the sale of specific products. Indirect selling 
                                expenses are expenses that cannot be directly linked to the sale of specific products, for example telephone 
                                expenses, Internet, and postal charges. General and administrative expenses include salaries of non-sales personnel, rent, utilities, communication, etc.
                                </v-tooltip> </td>
                            <td> {{ formatNumber(-this.RandDexpense) }} </td> 
                                <td > {{ formatNumber(Math.round(((-this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate / 100)) )) }} </td> 
                                <td> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.RdRate / 100)) )) }} </td>
                                <td> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 3) * (this.RdRate / 100)) )) }} </td>
                                <td> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 4) * (this.RdRate / 100)) )) }} </td>
                                <td> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.RdRate / 100)) )) }} </td>
                            </tr>
                            <tr>
                                <td class="zebra"> 
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="zebra fsli-name">
                                        SG&A Expense
                                    </span>
                                    </template>
                                    The aggregate total costs related to selling a firm's product and services, as well as all 
                                other general and administrative expenses. Direct selling expenses (for example, credit, warranty, 
                                and advertising) are expenses that can be directly linked to the sale of specific products. Indirect selling 
                                expenses are expenses that cannot be directly linked to the sale of specific products, for example telephone 
                                expenses, Internet, and postal charges. General and administrative expenses include salaries of non-sales personnel, rent, utilities, communication, etc.
                                </v-tooltip>
                                </td>
                            <td class="zebra"> {{ formatNumber(-this.salesGenExpense) }} </td> 
                                <td class="zebra"> {{ formatNumber(Math.round(((-this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate / 100)) )) }} </td> 
                                <td class="zebra"> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.SgaRate / 100)) )) }} </td>
                                <td class="zebra"> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 3) * (this.SgaRate / 100)) )) }} </td>
                                <td class="zebra"> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 4) * (this.SgaRate / 100)) )) }} </td>
                                <td class="zebra"> {{ formatNumber(Math.round(((-this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.SgaRate / 100)) )) }} </td>
                            </tr>
                            <tr>
                                <td> 
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="fsli-name">
                                        EBIT
                                    </span>
                                    </template>
                                    The net result for the period of deducting operating expenses from operating revenues.
                                </v-tooltip> </td>
                            <td> {{ formatNumber(this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense) }} </td> 
                            <td>{{ formatNumber(((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) }}</td>
                            <td>{{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) }}</td>
                                <td>{{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) }}</td>
                                <td>{{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) }}</td>
                                <td>{{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) }}</td>
                            </tr>                     
                            <tr>
                                <td class="zebra">  
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="zebra fsli-name">
                                        Tax Expense
                                    </span>
                                    </template>
                                    Amount of current income tax expense (benefit) and deferred income tax expense (benefit) pertaining to continuing operations.
                                </v-tooltip> </td>
                            <td class="zebra"> {{ formatNumber(-this.taxExpense) }} </td> 
                                <td class="zebra">{{ formatNumber((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (-this.TaxRate / 100)) }}</td>
                            <td class="zebra">{{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (-this.TaxRate / 100)) }}</td>
                                <td class="zebra">{{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (-this.TaxRate / 100)) }}</td>
                                <td class="zebra">{{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (-this.TaxRate / 100)) }}</td>
                                <td class="zebra">{{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) *( -this.TaxRate /100)) }}</td>
                            </tr>
                            <tr>
                                <td> 
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="fsli-name">
                                        NOPAT
                                    </span>
                                    </template>
                                    Net Operating Profit After Tax. The total profit a company earns from its core operations after tax.
                                </v-tooltip> </td>
                            <td> {{ formatNumber(this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense) }} </td> 
                                <td>{{ formatNumber(
                                    (((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100)) ) }}</td>

                            <td>{{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) }}</td>

                            <td>{{ formatNumber( (((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) }}</td>

                            <td>{{ formatNumber( (((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) }}</td>

                            <td>{{ formatNumber( (((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) }}</td>
                            </tr>

                            <tr>
                                    <td class="zebra">
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="zebra fsli-name">
                                        D&A Expense
                                    </span>
                                    </template>
                                    The current period expense charged against earnings on long-lived, physical assets not used in production, and which 
                                    are not intended for resale, to allocate or recognize the cost of such assets over their useful lives; or to record the 
                                    reduction in book value of an intangible asset over the benefit period of such asset; or to reflect consumption during the 
                                    period of an asset that is not used in production.
                                </v-tooltip> </td>
                                    <td class="zebra"> {{ formatNumber(this.deprExpense) }} </td> 
                                    <td class="zebra"> {{ formatNumber(((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100)) ) }} </td> 
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.DeprRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 3) * (this.DeprRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 4) * (this.DeprRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.DeprRate / 100)) ) }} </td>
                            </tr>
                            <tr>
                                    <td>
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="fsli-name">
                                        Change in COA
                                    </span>
                                    </template>
                                    Change in Current Operating Assets. The increase (decrease) during the reporting period in the aggregate amount of short-term assets used to generate operating income such as inventory and accounts receivable.
                                </v-tooltip>
                                    </td>
                                    <td> {{ formatNumber(this.changeOperAssets) }} </td> 
                                    <td > {{ formatNumber(((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100)) ) }} </td> 
                                    <td> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100)) ) }} </td>
                                    <td> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 3) * (this.OpAssetRate / 100)) ) }} </td>
                                    <td> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 4) * (this.OpAssetRate / 100)) ) }} </td>
                                    <td> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.OpAssetRate / 100)) ) }} </td>
                            </tr>
                            <tr>
                                
                                    <td class="zebra"> 
                                    <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="zebra fsli-name">
                                        Change in COL
                                    </span>
                                    </template>
                                    Cange in Current Operating Liabilities. The increase (decrease) during the reporting period in the aggregate amount of short-term liabilities used to generate operating income such accounts payable.
                                </v-tooltip>
                                    </td>
                                    <td class="zebra"> {{ formatNumber(this.changeOperLiab) }} </td> 
                                    <td class="zebra"> {{ formatNumber(((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)) ) }} </td> 
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 3) * (this.OpLiabRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 4) * (this.OpLiabRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.OpLiabRate / 100)) ) }} </td>
                            </tr>
                            <tr>
                                    <td> 
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="fsli-name">
                                        Change in NWC
                                    </span>
                                    </template>
                                    The change in the difference between a company's current operating assets and current operating liabilities.
                                </v-tooltip>
                                    </td>
                                    <td> {{ formatNumber(this.changeOperAssets - this.changeOperLiab) }} </td> 

                                    <td > {{ formatNumber((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100))) ) }} </td> 

                                    <td> {{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100))) ) }} </td>
                                    <td> {{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                    (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100))) ) }} </td>
                                    <td> {{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                    (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100))) ) }} </td>
                                    <td> {{ formatNumber((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                    (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100))) ) }} </td>
                            </tr>

                            <tr>
                                    <td class="zebra"> 
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span v-on="on" class="zebra fsli-name">
                                        Capital Expenditures
                                    </span>
                                    </template>
                                    The cash outflow for purchases of and capital improvements on property, plant and equipment (capital expenditures), software, and other intangible assets.
                                </v-tooltip> 
                                    </td>
                                    <td class="zebra"> {{ formatNumber(this.capitalExp) }} </td> 
                                    <td class="zebra" > {{ formatNumber(((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)) ) }} </td> 
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 3) * (this.CapexRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 4) * (this.CapexRate / 100)) ) }} </td>
                                    <td class="zebra"> {{ formatNumber(((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.CapexRate / 100)) ) }} </td>
                            </tr>
                            <tr>
                                    <td>
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span
                                        v-on="on"
                                        >Free Cash Flow to Firm</span>
                                    </template>
                                The amount of cash generated from a company's core operations available for distribution to bondholders and shareholders.  
                                </v-tooltip> 
                                    </td>
                                    <td> {{ formatNumber( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) }} </td> 

                                    <td > {{ formatNumber(
                                        ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100))) ) }} </td> 

                                    <td> {{ formatNumber(((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100))) ) }} </td>

                                    <td> {{ formatNumber( 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100))) ) }} </td>

                                    <td> {{ formatNumber( 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100))) ) }} </td>

                                    <td> {{ formatNumber(((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100))) ) }} </td>
                                
                            </tr>
                            <tr>
                                    <td class="zebra">
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4"
                                    >
                                    <template v-slot:activator="{ on }">
                                    <span
                                        v-on="on" class="zebra fsli-name"
                                        >PV FCFF</span>
                                    </template>
                                free cash flow to firm discounted back to its present day value using WACC  
                                </v-tooltip> 
                                    </td>
                                    <td class="zebra"> {{ formatNumber( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) }} </td> 

                                    <td class="zebra"> {{ formatNumber(( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) }} </td>

                                <td class="zebra" > {{ formatNumber((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) }} </td>

                                 <td class="zebra"> {{ formatNumber((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) }} </td>

                                 <td class="zebra"> {{ formatNumber((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4)) }} </td>

                                 <td class="zebra"> {{ formatNumber((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)) }} </td>                   
                            </tr>

                            </tbody>
                    </v-simple-table>
                        </div>
                    </v-col>
                </v-row>
                <v-row justify="start">
                    <v-col xl="4" lg="5">
                        <div class="methods">
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>
                                        Perpetual Growth Method
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4">
                                        <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">Sum of PV FCFF</span>
                                            </template>
                                           The sum of the present value of the forecasted free cash flows.
                                        </v-tooltip> 
                                    </td>
                                    <td class="output">
                                        {{ formatNumber(( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4">
                                        <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">LT Growth Rate</span>
                                            </template>
                                          A company's sustainable long-term growth rate it could expect.
                                        </v-tooltip> 
                                    </td>
                                    <td>
                                         <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatPercent(this.ltGrowth) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="ltGrowth"
                                                    step=".01"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                         <v-tooltip
                                        bottom
                                        color="light-blue darken-4">
                                        <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">PV Terminal Value</span>
                                            </template>
                                          The present value of the company's future cash flows when it reaches it's long-term growth rate. It's calculated by multipling the last year's cash flows in the dcf model by (1 + the lt growth rate), then dividing by (WACC - lt growth rate) and finally discounting back to present value.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{
                                          formatNumber(( ( ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)) * (1 + (this.ltGrowth / 100))) / 
                                ((((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ) * 
                                        (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (
                                            this.costDebt * (1 - this.TaxRate) * ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100) - (this.ltGrowth / 100))) / 
                                             (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                         <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Enterprise Value
                                            </span>
                                        </template>
                                        The total value of the company owned by shareholders and lenders. Calculated by adding the sum of PV of FCFF with the PV of the terminal value.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{ 
                                            formatNumber((( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) + 
                                (( ( ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)) * (1 + (this.ltGrowth / 100))) / 
                                ((((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ) * 
                                        (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (
                                            this.costDebt * (1 - this.TaxRate) * ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100) - (this.ltGrowth / 100))) / 
                                             (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                         <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Est. Market Cap
                                            </span>
                                        </template>
                                        The estimated market value of equity. It's estimated by subtracting net debt from the enterprise value calculated above.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{
                                            formatNumber(((( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) + 
                                (( ( ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)) * (1 + (this.ltGrowth / 100))) / 
                                ((((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ) * 
                                        (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (
                                            this.costDebt * (1 - this.TaxRate) * ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100) - (this.ltGrowth / 100))) / 
                                             (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) - 
                                (this.totalDebt - this.totalCash))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                         <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Est. Share Price
                                            </span>
                                        </template>
                                        The estimated price per share by dividing the market cap value above by the company's total shares outstanding.
                                        </v-tooltip>
                                    </td>
                                    <td class="exp-price">
                                        {{
                                            formatNumber((((( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) + 
                                (( ( ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)) * (1 + (this.ltGrowth / 100))) / 
                                ((((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ) * 
                                        (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (
                                            this.costDebt * (1 - this.TaxRate) * ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100) - (this.ltGrowth / 100))) / 
                                             (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) - 
                                (this.totalDebt - this.totalCash)) / this.sharesOuts)
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                         <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                               Target Price Upside
                                            </span>
                                        </template>
                                        The percentage difference between the estimated price per share calculated above and the company's actual current share price.
                                        </v-tooltip>
                                    </td>
                                    <td class="exp-price">
                                        {{
                                            formatPercent(((((((( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) + 
                                (( ( ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)) * (1 + (this.ltGrowth / 100))) / 
                                ((((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ) * 
                                        (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (
                                            this.costDebt * (1 - this.TaxRate) * ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100) - (this.ltGrowth / 100))) / 
                                             (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) - 
                                (this.totalDebt - this.totalCash)) / this.sharesOuts) - this.price) / this.price) * 100)
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                        </div>
                    </v-col>
                    <v-col xl="4" lg="5">
                        <div class="methods">
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>
                                        Exit Multiple Method
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4">
                                        <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">Sum of PV FCFF</span>
                                            </template>
                                           The sum of the present value of the forecasted free cash flows.
                                        </v-tooltip> 
                                    </td>
                                    <td class="output">
                                         {{ formatNumber(( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4">
                                        <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">EV/EBITDA</span>
                                            </template>
                                          Compares the total enterprise value of the company relative to its earnings before interest, taxes, depreciation, and amortization. 
                                        </v-tooltip> 
                                    </td>
                                    <td>
                                          <div class="parent">
                                            <div class='child float-left-child input' style="padding-right:3px;">{{ formatVal(this.evEbitda) }} </div>
                                            <div class='child float-left-child'>
                                                <v-text-field
                                                    v-model="evEbitda"
                                                    step=".5"
                                                    class="mx-0 my-0 px-0 py-0"
                                                    dense
                                                    hide-details
                                                    single-line
                                                    type="number" 
                                                    style="width: 15px">        
                                                </v-text-field>  
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip
                                        bottom
                                        color="light-blue darken-4">
                                        <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">PV Terminal Value</span>
                                            </template>
                                          The present value of the company's future cash flows when it reaches it's long-term growth rate. It's calculated by multipling the last year's cash flows in the dcf model by the company's EV/EBITDA multiple.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{
                                formatNumber((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) + 
                                (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.DeprRate / 100)) )) * this.evEbitda) / 
                                 (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Enterprise Value
                                            </span>
                                        </template>
                                        The total value of the company owned by shareholders and lenders. Calculated by adding the sum of PV of FCFF with the PV of the terminal value.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{
                                            formatNumber((( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) + 
                                (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.DeprRate / 100)) )) * this.evEbitda) / 
                                 (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5)))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Est. Market Cap
                                            </span>
                                        </template>
                                        The estimated market value of equity. It's estimated by subtracting net debt from the enterprise value calculated above.
                                        </v-tooltip>
                                    </td>
                                    <td class="output">
                                        {{
                                            formatNumber(((( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) + 
                                (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.DeprRate / 100)) )) * this.evEbitda) / 
                                 (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) - (this.totalDebt - this.totalCash))
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                                Est. Share Price
                                            </span>
                                        </template>
                                        The estimated price per share by dividing the market cap value above by the company's total shares outstanding.
                                        </v-tooltip>
                                    </td>
                                    <td class="exp-price">
                                        {{
                                             formatVal((((( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) + 
                                (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.DeprRate / 100)) )) * this.evEbitda) / 
                                 (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) - (this.totalDebt - this.totalCash)) / this.sharesOuts)
                                        }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <v-tooltip bottom color="light-blue darken-">
                                            <template v-slot:activator="{ on }">
                                            <span v-on="on" class="fsli-name">
                                               Target Price Upside
                                            </span>
                                        </template>
                                        The percentage difference between the estimated price per share calculated above and the company's actual current share price.
                                        </v-tooltip>
                                    </td>
                                    <td class="exp-price">
                                        {{
                                            formatPercent(((((((( this.revenue - this.costOfGoods - this.RandDexpense - this.salesGenExpense - this.taxExpense + 
                                        this.deprExpense - (this.changeOperAssets - this.changeOperLiab) - this.capitalExp) + 
                                        (( ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.grossProfitRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.RdRate/100))
                                - ((this.revenue * (1 + (this.RevRate / 100))) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                ((((this.revenue * (1 + (this.RevRate / 100))) * (this.OpAssetRate / 100))) - (((this.revenue * (1 + (this.RevRate / 100))) * (this.OpLiabRate / 100)))) - 
                                (((this.revenue * (1 + (this.RevRate / 100))) * (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 1)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **2)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 2) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 2)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **3)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 3) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 3)) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **4)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 4) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 4))
                                + ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                        - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) * (this.TaxRate / 100))) + 
                                        (((this.revenue * (1 + (this.RevRate / 100))) * (this.DeprRate / 100))) - 
                                        ((((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpAssetRate / 100))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.OpLiabRate / 100)))) - 
                                        (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) *  (this.CapexRate / 100)))) /  (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) + 
                                ((((((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.grossProfitRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.RdRate/100))
                                - ((this.revenue * ((1 + (this.RevRate / 100)) **5)) * (this.SgaRate/100))) + 
                                (((this.revenue * ((1 + (this.RevRate / 100))) ** 5) * (this.DeprRate / 100)) )) * this.evEbitda) / 
                                 (( 1 + (((((this.sharesOuts * this.price) / ((this.sharesOuts * this.price) + 
                                (this.totalDebt - this.totalCash)) ) * (this.riskFreeRate + ((this.marketReturn - this.riskFreeRate) * this.beta))) + (this.costDebt * (1 - this.TaxRate) * 
                                ( (this.totalDebt - this.totalCash) / ((this.sharesOuts * this.price) + (this.totalDebt - this.totalCash)) ))) / 100)) ** 5))) - (this.totalDebt - this.totalCash)) / this.sharesOuts) - 
                                this.price) / this.price) * 100)
                                        }}
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                        </div>
                    </v-col>
                </v-row>
              </v-col>
          </v-row>
          </template>   
      </v-container>
      </div>
  </v-container>
</template>

<script>
const numeral = require('numeral');
const Statistics = require('statistics.js')
export default {
    data() {
        return {
            // Model Assumptions
            RevRate: 0,
            grossProfitRate: 0,
            RdRate: 0,
            SgaRate: 0,
            DeprRate: 0,
            TaxRate: 0,
            OpAssetRate: 0,
            OpLiabRate: 0,
            CapexRate: 0,
            loading: true,

            // array of historicals
            rev: [],
            costRev: [],
            research: [],
            salesGeneral: [],
            Depreciation: [],
            tax: [],
            operAsset: [],
            operLiab: [],
            capex: [],
            divPay: [],
            incBeforeTax: [],

            // most recent year actual values
            revenue: 0,
            costOfGoods: 0,
            RandDexpense: 0,
            salesGenExpense: 0,
            deprExpense: 0,
            taxExpense: 0,
            changeOperAssets: 0,
            changeOperLiab: 0,
            capitalExp: 0,

            //cap structure/cost capital assumptions
            price: 0,
            sharesOuts: 0,
            totalDebt: 0,
            totalCash: 0,
            beta: 0,
            costDebt: 0,
            riskFreeRate: 0,
            marketReturn: 9.5,
            ltGrowth: 5,
            evEbitda: 0,
        }
    },

    methods: {
        formatNumber(val) {
        return numeral(val).format('(0.0a)')
      },

      formatPercent(val) {
          return numeral(val / 100).format('0.00%')
      },
      formatVal(val) {
          return numeral(val).format('(0,0.00)')
      },


        async getDcfFinancials() {
            this.loading = true;
            const ticker = this.$route.params.ticker.toUpperCase();

            const result = await this.$axios.get(`/stocks/dcf/${ticker}`);
            // organize based on fsli
            result.data.forEach(e => {
                if (e.fsli == 'totalRevenue') {
                    this.rev.push(e)
                } else if(e.fsli == 'costofGoodsAndServicesSold') {
                    this.costRev.push(e)
                } else if(e.fsli == 'researchAndDevelopment') {
                    this.research.push(e)
                } else if(e.fsli == 'sellingGeneralAndAdministrative') {
                    this.salesGeneral.push(e)
                } else if(e.fsli == 'depreciationAndAmortization') {
                    this.Depreciation.push(e)
                } else if(e.fsli == 'incomeTaxExpense') {
                    this.tax.push(e)
                } else if(e.fsli == 'changeInOperatingAssets') {
                    this.operAsset.push(e)
                } else if(e.fsli == 'changeInOperatingLiabilities') {
                    this.operLiab.push(e)
                } else if(e.fsli == 'capitalExpenditures') {
                    this.capex.push(e)
                } else if(e.fsli == 'dividendPayoutCommonStock') {
                    this.divPay.push(e)
                } else if(e.fsli == 'incomeBeforeTax') {
                    this.incBeforeTax.push(e)
                } 
            } );

            // make sure objects sorted by year         
            const arrArray = [this.rev, this.costRev, this.research, this.salesGeneral, this.Depreciation, this.tax, 
            this.operAsset, this.operLiab, this.capex, this.divPay]

            arrArray.forEach(arr => {
                    arr.sort((a, b) => (a.date > b.date) ? 1 : -1);
            })

            // push most recent value to actual values
            if(this.rev.length > 0) {
                var lastItem = this.rev[this.rev.length -1];
                this.revenue += lastItem.value;
                 this.RevRate += Number((((this.rev[this.rev.length -1].value / this.rev[0].value) ** (1 / this.rev.length)) - 1) * 100).toFixed(2);
            }
           
           if(this.costRev.length > 0) {
            var lastItem = this.costRev[this.costRev.length -1];
            this.costOfGoods += lastItem.value;
            const grossProfitRateCalc = []
            this.costRev.forEach((num1, index) => {
                var num2 = this.rev[index].value;
                grossProfitRateCalc.push( (num2 - num1.value) / num2);
            });
            this.grossProfitRate += ((grossProfitRateCalc.reduce((a, b) => a + b) / grossProfitRateCalc.length) * 100).toFixed(1);
           }

           if(this.research.length > 0) {
            var lastItem = this.research[this.research.length -1];
            this.RandDexpense += lastItem.value;
             const rdCalc = []
            this.research.forEach((num1, index) => {
                var num2 = this.rev[index].value;
                rdCalc.push( (num1.value) / num2);
            });
            this.RdRate += ((rdCalc.reduce((a, b) => a + b) / rdCalc.length) * 100).toFixed(1);
           }

           if(this.salesGeneral.length > 0) {
            var lastItem = this.salesGeneral[this.salesGeneral.length -1];
            this.salesGenExpense += lastItem.value;
            const sgCalc = []
            this.salesGeneral.forEach((num1, index) => {
                var num2 = this.rev[index].value;
                sgCalc.push( (num1.value) / num2);
            });
            this.SgaRate += ((sgCalc.reduce((a, b) => a + b) / sgCalc.length) * 100).toFixed(1);
           }

           if(this.Depreciation.length > 0) {
            var lastItem = this.Depreciation[this.Depreciation.length -1];
            this.deprExpense += lastItem.value;      
            const deprCalc = []
            this.Depreciation.forEach((num1, index) => {
                var num2 = this.rev[index].value;
                deprCalc.push( (num1.value) / num2);
            });
            this.DeprRate += ((deprCalc.reduce((a, b) => a + b) / deprCalc.length) * 100).toFixed(1);
           }

           if(this.tax.length > 0){
            var lastItem = this.tax[this.tax.length -1];
            this.taxExpense += lastItem.value;   
            const taxCalc = []
            this.tax.forEach((num1, index) => {
                var num2 = this.incBeforeTax[index].value;
                taxCalc.push( (num1.value) / num2);
            });
            this.TaxRate += ((taxCalc.reduce((a, b) => a + b) / taxCalc.length) * 100).toFixed(1);            
           }

            if(this.operAsset.length > 0){
            var lastItem = this.operAsset[this.operAsset.length -1];
            this.changeOperAssets += lastItem.value;
             const operAssCalc = []
            this.operAsset.forEach((num1, index) => {
                if(index <= this.rev.length -1) {
                var num2 = this.rev[index].value;
                operAssCalc.push((num1.value) / num2);
                }              
            });
            this.OpAssetRate += ((operAssCalc.reduce((a, b) => a + b) / operAssCalc.length) * 100).toFixed(1);                
            }

            if(this.operLiab.length > 0) {
            var lastItem = this.operLiab[this.operLiab.length -1];
            this.changeOperLiab += lastItem.value; 
            const operLiabCalc = []
            this.operLiab.forEach((num1, index) => {
                if(index <= this.rev.length -1) {
                var num2 = this.rev[index].value;
                operLiabCalc.push( (num1.value) / num2);
                }
            });
            this.OpLiabRate += ((operLiabCalc.reduce((a, b) => a + b) / operLiabCalc.length) * 100).toFixed(1);               
            }


            if(this.capex.length > 0) {
            var lastItem = this.capex[this.capex.length -1];
            this.capitalExp += lastItem.value;
            const capexCalc = []
            this.capex.forEach((num1, index) => {
                if(index <= this.rev.length -1) {
                var num2 = this.rev[index].value;
                capexCalc.push( (num1.value) / num2);
                }
            });
            this.CapexRate += ((capexCalc.reduce((a, b) => a + b) / capexCalc.length) * 100).toFixed(1);                
            }

            this.loading = false;
        },

        async calcBeta() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const res = await this.$axios.get(`/stocks/betacalc/${ticker}`);
            const dayChange = [];
            const spyArr = []
            res.data.forEach((obj, index, arr) => {
                if (index < 10) {
                    const prevSpyVal = arr[index + 1].spy;
                    const prevStockVal = arr[index + 1].stock;
                    const spyVal = obj.spy;
                    const stockVal = obj.stock;
                    dayChange.push({
                        stock: (stockVal - prevStockVal) / prevStockVal,
                        spy: (spyVal - prevSpyVal) / prevSpyVal
                    });
                    spyArr.push((spyVal - prevSpyVal) / prevSpyVal)
                }
            })
            var betaVars = {
                stock: 'metric',
                spy: 'metric'
            }
            // Calculate the average of all the numbers
            const calculateMean = (values) => {
                const mean = (values.reduce((sum, current) => sum + current)) / values.length;
                return mean;
            };
            // Calculate variance
            const calculateVariance = (values) => {
                const average = calculateMean(values);
                const squareDiffs = values.map((value) => {
                    const diff = value - average;
                    return diff * diff;
                });
                const variance = calculateMean(squareDiffs);
                return variance;
            };
            this.beta = 1;
            const stats = new Statistics(dayChange, betaVars);
            const covariance = stats.covariance('stock', 'spy');
            const spyVariance = calculateVariance(spyArr);
            this.beta += covariance.covariance / spyVariance
        },

        async getOtherDcf() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const res = await this.$axios.get(`/stocks/otherdcfassump/${ticker}`);
            const response = res.data[0];
            this.price += response.price;
            this.sharesOuts += response.shares_outs;
            this.totalDebt += response.total_debt;
            this.totalCash += response.total_cash;
            this.costDebt += (response.debt_cost * 100);
            this.riskFreeRate += response.tyield;
            this.evEbitda += response.ev_ebitda

        },

        resetAssump() {

        }
    },

    mounted() {
        this.getDcfFinancials();
        this.calcBeta();
        this.getOtherDcf();
;    }
}
</script>

<style scoped>
.float-left-child {
  float: left;
}

.v-input__slot::before{
  border-style: none !important; 
}
* {
    background-color: #121212;
    }

td {
    font-family: 'Helvetica';
}

.assumptions {
    border: 1px solid;
    border-color: rgb(63, 81, 181);
    background-color: rgb(63, 81, 181);
    border-radius: 5px;
    margin: 5px;
    padding: 2px;
}

.assumptions th {
    background-color: rgb(63, 81, 181);
}


.dcf {
    border: 1px solid;
    border-color: rgb(192, 152, 25);
    background-color: rgb(192, 152, 25);
    border-radius: 5px;
    margin: 5px;
    padding: 2px;
}

.dcf th {
    background-color: rgb(192, 152, 25)
}

.zebra {
    background-color: #20201f
}



.methods {
    border: 1px solid;
    border-color: rgb(46, 118, 111);
    background-color: rgb(46, 118, 111);
    border-radius: 5px;
    margin: 5px;
    padding: 2px;
}

.methods th {
    background-color: rgb(46, 118, 111);
}

.input {
    color: rgb(72, 150, 240)
}

.output {
    color: rgba(83, 224, 111, 1)
}

.fsli-name {
    font-weight: 600;
}

.exp-price {
    color: rgba(240, 162, 72, 1)
}

</style>