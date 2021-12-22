<template>
      <v-container>        
        <v-layout row wrap align-center>
        <v-flex md12>
              <v-row no-gutters justify="center">
                 <v-btn color="primary" elevation="2" small @click="resetAssump">RESET ASSUMPTIONS</v-btn>
                 <v-spacer></v-spacer>
                  <h4 style="center">Discounted Cash Flow Valuation </h4>

              </v-row>

                  <v-card class="my-2 py-0">
                  <v-simple-table dense>
                    <thead>
                      <tr>
                        <th>Help</th>
                         <th>Assumptions</th>
                        <th>in thousands of $</th>
                        <th>FY 2021A</th>
                        <th>FY 2022E</th>
                        <th>FY 2023E</th>
                        <th>FY 2024E</th>
                        <th>FY 2025E</th>
                        <th>FY 2026E</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>
                      <v-tooltip
                        bottom
                        color="light-blue darken-4"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on">
                            mdi-help-circle-outline
                          </v-icon>
                        </template>
                         This is the assumed revenue growth for the next 5 years. It's been calculated by finding the compounding average growth rate (CAGR) over the previous 5 years
                        (or however far back data revenue is available, depending on how long the company has been public). Next to it is the trailing 12 month total revenue, calculated as the sum of the 
                        last 4 quarters of revenue.
                        If you feel revenue growth should be different, feel free to change it!                           
                      </v-tooltip>
                        </td>
                        <td>
                 <v-text-field
                          v-model="slider"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          dense
                          suffix="%"
                          hide-details
                          single-line
                          full-width
                          type="number"
                          style="width: 70px"    
                        >
                        <template v-slot:item="{item}">
                          {{item.toFixed(2)}}
                        </template>             
                        </v-text-field>          
                        </td>
                        <td>Net Revenue </td>
                      <td > {{ formatNumber(this.revenue) }} </td> 
                        <td> {{ formatNumber(Math.round((this.revenue * (1 + Number(this.slider / 100)) ))) }} </td> 
                        <td> {{ formatNumber(Math.round((this.revenue * ((1 + Number(this.slider / 100)) ** 2) ))) }} </td>
                        <td> {{ formatNumber(Math.round((this.revenue * ((1 + Number(this.slider / 100)) ** 3) )))  }} </td>
                        <td> {{ formatNumber(Math.round((this.revenue * ((1 + Number(this.slider / 100)) ** 4) ))) }} </td>
                        <td> {{ formatNumber(Math.round((this.revenue * ((1 + Number(this.slider / 100)) ** 5) ))) }} </td>
                      </tr>
                      <tr>
                        <td>                        
                        </td>
                        <td></td>
                        <td> COGS </td>
                      <td> {{ "(" + formatNumber(Math.round((this.revenue * (1 - Number(this.COGS / 100))) )) + ")" }} </td> 
                        <td > {{ "(" + formatNumber(Math.round(((this.revenue * (1 + Number(this.slider / 100))) * (1 - Number(this.COGS / 100)) ))) + ")" }} </td> 
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 2) * (1 - Number(this.COGS / 100)) ))) + ")"}} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * (1 - Number(this.COGS / 100)) ))) + ")"}} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * (1 - Number(this.COGS / 100)) ))) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * (1 - Number(this.COGS / 100)) ))) + ")"}} </td>
                      </tr>
                      <tr>
                        <td>
                      <v-tooltip
                        bottom
                        color="light-blue darken-4"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on">
                            mdi-help-circle-outline
                          </v-icon>
                        </template>
                        This is the estimated Gross Profit Margin based on the average gross profit as a percentage of revenue over the last 5 years (or however long data is available depending on the company's age).
                        If you feel that its gross margin will be different in the future, feel free to change it!
                      </v-tooltip>                          
                        </td>
                        <td>
                        <v-text-field
                          v-model="COGS"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          dense
                          hide-details
                          suffix="%"
                          single-line
                          type="number"
                          style="width: 70px"
                        ></v-text-field>                          
                        </td>
                        <td> Gros Profit </td>
                    <td> {{ formatNumber(Math.round((this.revenue *  Number(this.COGS / 100)) )) }} </td> 
                        <td > {{ formatNumber(Math.round(((this.revenue * (1 + Number(this.slider / 100))) * Number(this.COGS / 100)) )) }} </td> 
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 2) *  Number(this.COGS / 100)) )) }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * Number(this.COGS / 100)) )) }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * Number(this.COGS / 100)) )) }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * Number(this.COGS / 100)) )) }} </td>
                      </tr>
                      <tr>
                        <td>
                      <v-tooltip
                        bottom
                        color="light-blue darken-4"
                      >
                        <template v-slot:activator="{ on }">
                          <v-icon v-on="on">
                            mdi-help-circle-outline
                          </v-icon>
                        </template>
                        This is the company's estimated operating expenses (not including COGS) as a % of revenue. It is found by calculating the average 5 year operating income margin (or however many years data is available) 
                        and subtracting the calculated gross profit margin. If you feel that operating expenses will be different in the future, feel free to change it!
                      </v-tooltip>                            
                        </td>
                        <td>
                        <v-text-field
                          v-model="opEx"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          hide-details
                          dense
                          suffix="%"
                          single-line
                          type="number"
                          style="width: 70px"
                        ></v-text-field>
                        </td>
                        <td> Operating Expenses </td>
                          <td>{{"(" + formatNumber(Math.round((this.revenue *  Number(this.opEx/ 100)) )) + ")" }} </td> 
                        <td > {{ "(" + formatNumber(Math.round(((this.revenue * (1 + Number(this.slider / 100))) * Number(this.opEx/ 100)) )) + ")" }} </td> 
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 2) *  Number(this.opEx/ 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * Number(this.opEx/ 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * Number(this.opEx/ 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * Number(this.opEx/ 100)) )) + ")" }} </td>
                      </tr>
                      
                      <tr>
                        <td>                        
                        </td>
                        <td>

                        </td>
                        <td> EBIT </td>
                        <td> {{  formatNumber(Math.round((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) )) }} </td> 
                        <td > {{ formatNumber(Math.round(((this.revenue * (1 + Number(this.slider / 100))) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) )) }} </td> 
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 2) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) )) }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) )) }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) ))  }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) )) }} </td>
                      </tr>
                      <tr>
                        <td>
                          <v-tooltip
                            bottom
                            color="light-blue darken-4"
                          >
                            <template v-slot:activator="{ on }">
                              <v-icon v-on="on">
                                mdi-help-circle-outline
                              </v-icon>
                            </template>
                            This is the estimated effective tax rate the company is expected to experience in the future. It's based on the average effective tax rate the company has paid in the last 5 years
                            (or however many years data is available). If you believe its tax rate will be different in the future, feel free to change it!
                          </v-tooltip>                           
                        </td>
                        <td>
                        <v-text-field
                          v-model="TAX"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          hide-details
                          dense
                          suffix="%"
                          single-line
                          type="number"
                          style="width: 70px"
                        ></v-text-field>                          
                        </td>
                        <td> Tax Expense </td>
                      <td> {{ "(" + formatNumber(Math.round(((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * Number(this.TAX / 100)) )) + ")" }} </td> 
                      <td > {{ "(" + formatNumber(Math.round((((this.revenue * (1 + Number(this.slider / 100))) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * Number(this.TAX / 100)) )) + ")" }} </td> 
                        <td> {{ "(" + formatNumber(Math.round((((this.revenue * ((1 + Number(this.slider / 100))) ** 2) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * Number(this.TAX / 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round((((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * Number(this.TAX / 100)))) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round((((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * Number(this.TAX / 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round((((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * Number(this.TAX / 100)) )) + ")" }} </td>
                      </tr>
                      <tr>
                        <td>                         
                        </td>
                        <td>

                        </td>
                        <td> NOPAT </td>
                      <td> {{ formatNumber(Math.round(((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))) )) }} </td> 
                      <td > {{ formatNumber(Math.round((((this.revenue * (1 + Number(this.slider / 100))) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))) )) }} </td> 
                        <td> {{ formatNumber(Math.round((((this.revenue * ((1 + Number(this.slider / 100))) ** 2) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))) )) }} </td>
                        <td> {{ formatNumber(Math.round((((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))))) }} </td>
                        <td> {{ formatNumber(Math.round((((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))) )) }} </td>
                        <td> {{ formatNumber(Math.round((((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))) )) }} </td>
                      </tr>
                      <tr>
                        <td>
                        <v-tooltip
                          bottom
                          color="light-blue darken-4"
                        >
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">
                              mdi-help-circle-outline
                            </v-icon>
                          </template>
                          This is the estimated Depreciation & Amortization the company is expected to have in the future. It's calculated based on the average Depreciation & Amortization expense 
                          as a percentage of net revenue recognized
                          by the company over the last 5 years (or however many years data is available). If you feel that D&A will be different in the future, feel free to change it!
                        </v-tooltip>                           
                        </td>
                        <td>
                        <v-text-field
                          v-model="DAexp"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          hide-details
                          dense
                          suffix="%"
                          single-line
                          type="number"
                          style="width: 70px"
                        ></v-text-field>                          
                        </td>
                        <td> D&A Expense </td>
                        <td> {{  formatNumber(Math.round((this.revenue *  Number(this.DAexp / 100)) ))  }} </td> 
                        <td > {{ formatNumber(Math.round(((this.revenue * (1 + Number(this.slider / 100))) * Number(this.DAexp / 100)) ))  }} </td> 
                        <td> {{  formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 2) *  Number(this.DAexp / 100)) ))  }} </td>
                        <td> {{  formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * Number(this.DAexp / 100)) ))  }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * Number(this.DAexp / 100)) )) }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * Number(this.DAexp / 100)) )) }} </td>
                      </tr>
                      <tr>
                        <td>
                        <v-tooltip
                          bottom
                          color="light-blue darken-4"
                        >
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">
                              mdi-help-circle-outline
                            </v-icon>
                          </template>
                          This is the estimated change in Net Working Capital as a percentage of revenue the company is expected to have in the future. It's calculated based on the average change in net working capital
                          as a percentage of net revenue over the last 5 years (or however many years data is available). If you feel change in NWC will be different, feel free to change it!
                        </v-tooltip>  
                        </td>
                        <td>
                        <v-text-field
                          v-model="NWC"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          hide-details
                          single-line
                          suffix="%"
                          type="number"
                          style="width: 70px"
                          dense
                        ></v-text-field>                          
                        </td>
                        <td> Change in NWC </td>
                      <td> {{ "(" + formatNumber(Math.round((this.revenue *  Number(this.NWC / 100)) )) + ")" }} </td> 
                        <td > {{ "(" + formatNumber(Math.round(((this.revenue * (1 + Number(this.slider / 100))) * Number(this.NWC / 100)) )) + ")" }} </td> 
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 2) *  Number(this.NWC / 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * Number(this.NWC / 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * Number(this.NWC / 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * Number(this.NWC / 100)) )) + ")" }} </td>
                      </tr>
                      <tr>
                        <td>
                        <v-tooltip
                          bottom
                          color="light-blue darken-4"
                        >
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">
                              mdi-help-circle-outline
                            </v-icon>
                          </template>
                          This is the estimated capital expenditure as a percentage of revenue the company is expected to have in the future. It's calculated based on the average capex
                          as a percentage of net revenue over the last 5 years (or however many years data is available). If you feel capex will be different, feel free to change it!
                        </v-tooltip> 
                        </td>
                        <td>
                          <v-text-field
                            v-model="CAPEX"
                            step=".01"
                            class="mx-0 my-0 px-0 py-0"
                            dense
                            hide-details
                            suffix="%"
                            single-line
                            type="number"
                            style="width: 70px"
                          ></v-text-field>
                        </td>
                        <td> Capital Expenditures </td>
                      <td> {{ "(" + formatNumber(Math.round((this.revenue *  Number(this.CAPEX / 100)) )) + ")" }} </td> 
                        <td > {{ "(" + formatNumber(Math.round(((this.revenue * (1 + Number(this.slider / 100))) * Number(this.CAPEX / 100)) )) + ")" }} </td> 
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 2) *  Number(this.CAPEX / 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * Number(this.CAPEX / 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * Number(this.CAPEX / 100)) )) + ")" }} </td>
                        <td> {{ "(" + formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * Number(this.CAPEX / 100)) )) + ")" }} </td>
                      </tr>
                      <tr>
                        <td>
                         <v-tooltip
                          bottom
                          color="light-blue darken-4"
                        >
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">
                              mdi-help-circle-outline
                            </v-icon>
                          </template>
                          This is the estimated stock based compensation as a percentage of revenue the company is expected to pay in the future. It's calculated based on the average sbc
                          as a percentage of net revenue over the last 5 years (or however many years data is available). If you feel sbc will be different, feel free to change it!
                        </v-tooltip>                          
                        </td>
                        <td>
                        <v-text-field
                          v-model="SBC"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          hide-details
                          dense
                          suffix="%"
                          single-line
                          type="number"
                          style="width: 70px"
                        ></v-text-field>
                        </td>
                        <td> Stock Based Comp </td>
                      <td> {{  formatNumber(Math.round((this.revenue *  Number(this.SBC / 100)) ))  }} </td> 
                        <td > {{ formatNumber(Math.round(((this.revenue * (1 + Number(this.slider / 100))) * Number(this.SBC / 100)) ))  }} </td> 
                        <td> {{  formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 2) *  Number(this.SBC / 100)) ))  }} </td>
                        <td> {{  formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 3) * Number(this.SBC / 100)) ))  }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 4) * Number(this.SBC / 100)) )) }} </td>
                        <td> {{ formatNumber(Math.round(((this.revenue * ((1 + Number(this.slider / 100))) ** 5) * Number(this.SBC / 100)) )) }} </td>
                      </tr>
                      <tr>
                        <td>
                         <v-tooltip
                          bottom
                          color="light-blue darken-4"
                        >
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">
                              mdi-help-circle-outline
                            </v-icon>
                          </template>
                          This is the estimated long-term sustainable growth rate the company is expected to have in the future. It's calculated based on the company's cost of capital (aka required return or WACC) 
                          multiplied by the company's retention ratio. If you believe the long-term growth rate will be different, feel free to change it!
                        </v-tooltip>                          
                        </td>
                        <td>
                        <v-text-field
                          v-model="ltGrowth"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          hide-details
                          dense
                          suffix="%"
                          single-line
                          type="number"
                          style="width: 70px"
                          label="Long-term growth"
                        ></v-text-field>
                        </td>
                        <td> Free Cash Flow </td>
                      <td> {{ formatNumber(Math.round(((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))
                        + (this.revenue *  Number(this.DAexp / 100)) - (this.revenue *  Number(this.NWC / 100)) - (this.revenue *  Number(this.CAPEX / 100))
                        +  (this.revenue *  Number(this.SBC / 100))  ) ))  }} </td> 

                        <td > {{ formatNumber(Math.round(((((this.revenue * (1 + Number(this.slider / 100)))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))  
                          + ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.DAexp / 100)) - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.NWC / 100)) 
                          - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.CAPEX / 100)) +  ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.SBC / 100))) )) }} </td> 

                        <td>  {{ formatNumber(Math.round(((((this.revenue * ((1 + Number(this.slider / 100)) ** 2))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.SBC / 100))) )) }} </td>

                        <td>  {{ formatNumber(Math.round(((((this.revenue * ((1 + Number(this.slider / 100)) ** 3))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.SBC / 100))) )) }} </td>

                        <td>  {{ formatNumber(Math.round(((((this.revenue * ((1 + Number(this.slider / 100)) ** 4))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.SBC / 100))) )) }} </td>

                        <td>  {{ formatNumber(Math.round(((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) )) }} </td>
                    
                      </tr>
                      <tr>
                        <td>
                          <v-tooltip
                          bottom
                          color="light-blue darken-4"
                        >
                          <template v-slot:activator="{ on }">
                            <v-icon v-on="on">
                              mdi-help-circle-outline
                            </v-icon>
                          </template>
                          This is the company's weighted average cost of capital (aka WACC or required return). It's used to find the present value of the expected future cash flows. If you believe the company has a different
                          WACC, feel free to change it!
                        </v-tooltip>                            
                        </td>
                        <td>
                        <v-text-field
                          v-model="WACC"
                          step=".01"
                          class="mx-0 my-0 px-0 py-0"
                          dense
                          hide-details
                          single-line
                          suffix="%"
                          type="number"
                          style="width: 70px"
                        ></v-text-field>
                        </td>
                        <td> Present Value FCF </td>
                      <td> {{ formatNumber(Math.round((((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))
                        + (this.revenue *  Number(this.DAexp / 100)) - (this.revenue *  Number(this.NWC / 100)) - (this.revenue *  Number(this.CAPEX / 100))
                        +  (this.revenue *  Number(this.SBC / 100))) / ((1 + Number(this.WACC / 100))) ** 0) )) }} </td>
                      <td > {{ formatNumber(Math.round((((((this.revenue * (1 + Number(this.slider / 100)))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))  
                          + ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.DAexp / 100)) - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.NWC / 100)) 
                          - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.CAPEX / 100)) +  ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.SBC / 100)))
                          / ((1 + Number(this.WACC / 100))) ** 1) )) }} </td> 

                        <td> {{ formatNumber(Math.round((((((this.revenue * ((1 + Number(this.slider / 100)) ** 2))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 2) )) }} </td>

                        <td> {{ formatNumber(Math.round((((((this.revenue * ((1 + Number(this.slider / 100)) ** 3))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 3) )) }} </td>

                        <td> {{ formatNumber(Math.round((((((this.revenue * ((1 + Number(this.slider / 100)) ** 4))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 4) )) }} </td>

                        <td> {{ formatNumber(Math.round((((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 5) )) }} </td>
                      </tr>
                    </tbody>
              
                  </v-simple-table>
                </v-card>
          </v-flex>
        </v-layout>
        <v-layout  row wrap justify-space-between>
          <v-flex md6>
            <h3>Estimated Stock Price</h3>
          </v-flex>
          <v-flex md6>
                  <h3>${{ 
                    // PV TV
                      formatNumber(Math.round(((((((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                      + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue / 100 * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                      - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue / 100 * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) * 
                      (1 + Number(this.ltGrowth / 100))) / (Number(this.WACC / 100) - Number(this.ltGrowth / 100))) 
                      /  ((1 + Number(this.WACC / 100))) ** 5) 
                      
                      // PV FCF Year 0
                      + (((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))
                    + (this.revenue *  Number(this.DAexp / 100)) - (this.revenue *  Number(this.NWC / 100)) - (this.revenue *  Number(this.CAPEX / 100))
                    +  (this.revenue *  Number(this.SBC / 100))) / ((1 + Number(this.WACC / 100))) ** 0) 

                    // PV FCF Year 1
                    + (((((this.revenue * (1 + Number(this.slider / 100)))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))  
                      + ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.DAexp / 100)) - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.NWC / 100)) 
                      - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.CAPEX / 100)) +  ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.SBC / 100)))
                      / ((1 + Number(this.WACC / 100))) ** 1) 

                    // PV FCF Year 2
                    + (((((this.revenue * ((1 + Number(this.slider / 100)) ** 2))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                      + (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.NWC / 100)) 
                      - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.SBC / 100))) 
                      /  ((1 + Number(this.WACC / 100))) ** 2)

                    // PV FCF Year 3
                    + (((((this.revenue * ((1 + Number(this.slider / 100)) ** 3))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                      + (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.NWC / 100)) 
                      - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.SBC / 100))) 
                      /  ((1 + Number(this.WACC / 100))) ** 3)
                  
                    // PV FCF Year 4
                    + (((((this.revenue * ((1 + Number(this.slider / 100)) ** 4))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                      + (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.NWC / 100)) 
                      - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.SBC / 100))) 
                      /  ((1 + Number(this.WACC / 100))) ** 4) 

                    // PV FCF Year 5
                    + (((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                      + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                      - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) 
                      /  ((1 + Number(this.WACC / 100))) ** 5)

                          // - Net Debt = Market Cap
                          - Number(this.netDebt))

                        //  Divide by numSHares to get est price per share
                        / Number(this.NumShares)))    }}</h3>
          </v-flex>
        </v-layout>

        <v-layout row wrap align-center>
          <v-flex md6>  
                  <v-simple-table>
                    <tbody>
                      <tr>
                        <td>Sum of PV FCF</td>                   
                        <td>{{ formatNumber(Math.round((((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))
                        + (this.revenue *  Number(this.DAexp / 100)) - (this.revenue *  Number(this.NWC / 100)) - (this.revenue *  Number(this.CAPEX / 100))
                        +  (this.revenue *  Number(this.SBC / 100))) / ((1 + Number(this.WACC / 100))) ** 0) + 
                        (((((this.revenue * (1 + Number(this.slider / 100)))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))  
                          + ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.DAexp / 100)) - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.NWC / 100)) 
                          - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.CAPEX / 100)) +  ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.SBC / 100)))
                          / ((1 + Number(this.WACC / 100))) ** 1) + 
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 2))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 2) +
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 3))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 3)
                          + (((((this.revenue * ((1 + Number(this.slider / 100)) ** 4))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 4) +
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 5)))
                         }}</td>  
                      </tr>
                      <tr>
                        <td>Terminal Value</td>
                        <td>  {{ formatNumber(((((((this.revenue * ((1 + Number(this.slider / 100)) ** 5)) * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))  
  + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) 
  *  Number(this.CAPEX / 100)) + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) * (1 + Number(this.ltGrowth / 100))) / (Number(this.WACC / 100) - Number(this.ltGrowth / 100)))) }}  </td> 

                        <!-- <td>{{ formatNumber(Math.round(((((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) * 
                          (1 + Number(this.ltGrowth / 100))) / (Number(this.WACC / 100) - Number(this.ltGrowth / 100)))))  }}</td>   -->
                      </tr>
                      <tr>
                        <td>PV Terminal Value</td>                   
                        <td>{{ formatNumber(Math.round((((((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue / 100 * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue / 100 * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) * 
                          (1 + Number(this.ltGrowth / 100))) / (Number(this.WACC / 100) - Number(this.ltGrowth / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 5))) }}</td>  
                      </tr>
                    </tbody>
                  </v-simple-table>          
          </v-flex>
          <v-flex md6>  
                  <v-simple-table>
                    <tbody>
                      <tr>
                        <td>Enterprise Value</td>                   
                        <td>{{ formatNumber(Math.round((((((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) * 
                          (1 + Number(this.ltGrowth / 100))) / (Number(this.WACC / 100) - Number(this.ltGrowth / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 5) + ((((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))
                        + (this.revenue *  Number(this.DAexp / 100)) - (this.revenue *  Number(this.NWC / 100)) - (this.revenue *  Number(this.CAPEX / 100))
                        +  (this.revenue *  Number(this.SBC / 100))) / ((1 + Number(this.WACC / 100))) ** 0) + 
                        (((((this.revenue * (1 + Number(this.slider / 100)))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))  
                          + ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.DAexp / 100)) - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.NWC / 100)) 
                          - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.CAPEX / 100)) +  ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.SBC / 100)))
                          / ((1 + Number(this.WACC / 100))) ** 1) + 
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 2))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 2) +
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 3))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 3)
                          + (((((this.revenue * ((1 + Number(this.slider / 100)) ** 4))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 4) +
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 5)))) }}</td>  
                      </tr>
                      <tr>
                        <td>Net Debt</td>                   
                        <td>{{ formatNumber(this.netDebt) }}</td>  
                      </tr>
                      
                      <tr>
                        <td>Est. Market Cap</td>
                        <td>{{ formatNumber(Math.round(((((((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) * 
                          (1 + Number(this.ltGrowth / 100))) / (Number(this.WACC / 100) - Number(this.ltGrowth / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 5) + ((((this.revenue * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100))
                        + (this.revenue *  Number(this.DAexp / 100)) - (this.revenue *  Number(this.NWC / 100)) - (this.revenue *  Number(this.CAPEX / 100))
                        +  (this.revenue *  Number(this.SBC / 100))) / ((1 + Number(this.WACC / 100))) ** 0) + 
                        (((((this.revenue * (1 + Number(this.slider / 100)))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))  
                          + ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.DAexp / 100)) - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.NWC / 100)) 
                          - ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.CAPEX / 100)) +  ((this.revenue * (1 + Number(this.slider / 100))) *  Number(this.SBC / 100)))
                          / ((1 + Number(this.WACC / 100))) ** 1) + 
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 2))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 2)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 2) +
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 3))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 3)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 3)
                          + (((((this.revenue * ((1 + Number(this.slider / 100)) ** 4))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 4)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 4) +
                          (((((this.revenue * ((1 + Number(this.slider / 100)) ** 5))  * (1 - ((1 - Number(this.COGS / 100)) + Number(this.opEx/ 100)))) * (1 - Number(this.TAX / 100)))
                          + (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.DAexp / 100)) - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.NWC / 100)) 
                          - (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.CAPEX / 100)) +  (((this.revenue * (1 + Number(this.slider / 100)) ** 5)) *  Number(this.SBC / 100))) 
                          /  ((1 + Number(this.WACC / 100))) ** 5))) - Number(this.netDebt))) }}</td>                   
                        <td></td>  
                      </tr>
                    </tbody>
                  </v-simple-table>          
          </v-flex>
        </v-layout>

  </v-container>

</template>

<script>
const numeral = require('numeral');

export default {
    data () {
        return {
          slider: 0,
          revenue: 0,
          NWC: 0,
          COGS: 0,
          opEx: 0,
          DAexp: 0,
          TAX: 0,
          CAPEX: 0,
          SBC: 0,
          NumShares: 0,
          netDebt: 0,
          WACC: 0,
          ltGrowth: 0,
          allInputs: [],

        }
    },

    methods: {
      formatNumber(val) {
        return numeral(val).format('(0.00a)')
      },

        async updateDCF() {
            const ticker = this.$route.params.ticker.toUpperCase();
            const dcfResonse =  await this.$axios.get(`/api/dcf/inputs/${ticker}`);
            const histRev = await this.$axios.get(`/api/dcf/rev/${ticker}`);
            if (histRev.data.length > 0 && dcfResonse.data.length > 0) {
            const revValues = histRev.data
            const sumall = revValues.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
            this.revenue = sumall;
            this.allInputs = dcfResonse.data;
            this.allInputs.forEach(input => {
              this.CAPEX +=  Number((input.capex_margin * 100).toFixed(2)) 
              this.NWC +=  Number((input.change_nwc_margin * 100).toFixed(2)) 
              this.COGS +=  Number((input.gross_margin * 100).toFixed(2))
              this.opEx +=  Number((input.operating_margin * 100).toFixed(2))
              this.DAexp +=  Number((input.da_margin * 100).toFixed(2))
              this.TAX +=  Number((input.taxexp * 100).toFixed(2)) 
              this.SBC +=  Number((input.sbc_margin * 100).toFixed(2))
              this.NumShares += Number(input.numshares)
              this.netDebt += Number((input.net_debt).toFixed(2))
              this.slider += Number((input.rev_growth_rate * 100).toFixed(2))
              this.WACC += Number((input.wacc * 100).toFixed(2)) 
              this.ltGrowth += Number(((input.wacc) * (1- (input.payoutratio_ttm / 100)) * 100).toFixed(2))
            })               
            }

        },

        resetAssump() {
          this.CAPEX = 0;
          this.NWC = 0;
          this.COGS = 0;
          this.opEx = 0;
          this.DAexp = 0;
          this.TAX = 0;
          this.NumShares = 0;
          this.netDebt = 0;
          this.slider = 0;
          this.WACC = 0;
          this.ltGrowth = 0;
            this.allInputs.forEach(input => {
              this.CAPEX +=  Number((input.capex_margin * 100).toFixed(2)) 
              this.NWC +=  Number((input.change_nwc_margin * 100).toFixed(2)) 
              this.COGS +=  Number((input.gross_margin * 100).toFixed(2))
              this.opEx +=  Number((input.operating_margin * 100).toFixed(2))
              this.DAexp +=  Number((input.da_margin * 100).toFixed(2))
              this.TAX +=  Number((input.taxexp * 100).toFixed(2)) 
              this.SBC +=  Number((input.sbc_margin * 100).toFixed(2))
              this.NumShares += Number(input.numshares)
              this.netDebt += Number((input.net_debt).toFixed(2))
              this.slider += Number((input.rev_growth_rate * 100).toFixed(2))
              this.WACC += Number((input.wacc * 100).toFixed(2)) 
              this.ltGrowth += Number(((input.wacc) * (1- (input.payoutratio_ttm / 100)) * 100).toFixed(2))
            }) 
        },
    },

    mounted() {
        this.updateDCF();
    }

}
</script>

<style scoped>
.h4 {
  justify-content: center;
  display: inline-block;
  text-align: center;

}
</style>