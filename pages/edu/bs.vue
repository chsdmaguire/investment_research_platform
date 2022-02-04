<template>
    <!-- Splash -->
  <v-container fluid class="splash">
    <div class="splash-centered mx-auto my-auto">
      <h1 style="text-align:center;padding-top:5vh">Balance <span class="primary-text">Sheet</span></h1>

<div style="padding-right:10vh;padding-left:10vh">
      <div>
<p align=center style="padding-top:10vh">

The balance sheet is broken down into 3 main sections: assets, liabilities, and equity. It reflects the net worth of a company’s book value at a set point in time (much different than the market value). The balance sheet should always “balance” by following the simple formula assets = liabilities + equity. Assets reflect what a company owns, liabilities reflect what a company owes, and equity reflects the amount of money leftover (the more profitable the higher equity is generally). Each section is organized by liquidity, with the most liquid line items at the top and the least liquid line items at the bottom, and generally further categorized by current (converted to cash or repaid in less than a year) and long-term (converted to cash or repaid in over a year). 
</p>
<h6>Assets </h6>


<div>
  <p>
  <ul style="align:left">
    <li style="padding-top:2vh">
Cash & equivalents: Money a company has in the bank or money in the process of being transferred over. It can also include commercial paper or government bonds with a maturity of 3 months or less. 
</li>

<li style="padding-top:2vh">
Accounts Receivable (A/R): Money owed to the business by its customers because they purchased a good or service on credit (revenue may still have been recognized by the A/R reflects the actual cash owed). 
</li>

<li style="padding-top:2vh">
Short-term investments: Money the company has decided to invest that could be converted to cash in a period of 3-12 months. These are high quality investments such as treasury bills, CDs, or money market accounts.
</li>

<li style="padding-top:2vh">
Inventory: Good available for sale, works in progress, or raw materials the company is currently storing and have not yet sold. When finally sold, they are reflected on the Income Statement within COGS. 
</li>

<li style="padding-top:2vh">
Prepaid expenses: These are costs a company will recognize on their Income Statement in the future it has already paid for items such as rent, utility bills, salaries, insurance, etc. 
</li>

<li style="padding-top:2vh">
Long-term investments: These are assets a company intends to hold for over a year such as stocks or bonds it has purchased with its excess cash. 
</li>

<li style="padding-top:2vh">
Property, Plant, & Equipment (PP&E): This line item reflects illiquid assets owned by the company such as land, buildings, machinery, and other equipment. On the balance sheet, it will be reflected as the historical cost minus accumulated depreciation. 
</li>

<li style="padding-top:2vh">
Intangible Assets: This line item reflects intellectual property such as patents, trademarks, and goodwill.
</li>
</ul>
</p>
</div>

<div>
<h6 style="padding-top:5vh">Liabilities </h6>
<ul>
<li style="padding-top:2vh">
Accounts Payable: money owed to suppliers for the materials and other items the company purchased on credit.
</li>

<li style="padding-top:2vh">
Accrued liabilities: Expenses that have not been paid for yet but have been recognized on the income statement such as rent, utilities, wages, etc. Variations can also appear such as wages payable
</li>

<li style="padding-top:2vh">
Short-term debt: Debt that is due in less than year from either the short-term portion of a long-term loan or a revolving credit line that operates similarly to a credit card. 
</li>

<li style="padding-top:2vh">
Unearned revenue: money that the company has received already for revenue that it will not recognize until a later date. One example is from the purchase of gift cards. A company receives the cash now but will not provide the good or service and recognize any revenue until someone actually uses the gift card. 
</li>

<li style="padding-top:2vh">
Provisions: funds set aside by the company to cover an anticipated loss in the future such as tax liabilities or litigation fees.
</li>

<li style="padding-top:2vh">
Long-term debt: Money owed that is due in a year or longer from either a loan, a bond issue, or some other form of debt financing.
</li>
</ul>
</div>

<div>
<h6 style="padding-top:5vh">Shareholders’ Equity </h6>
<li style="padding-top:2vh">
Preferred stock: Stock purchased that has a priority to dividends but no voting rights.
</li>

<li style="padding-top:2vh">
Common stock: This line item reflects the par value for all the outstanding shares of a company owned by people. The par value per share can generally be a penny or less and is designed to be so small because the company would immediately have to liquidate if the market value (value of its stock) was ever less than its par value. 
</li>

<li style="padding-top:2vh">
Additional paid-in capital: This reflects the excess amount of money put in by investors over the par value of the stock at the historical amount (such as an IPO). 
</li>

<li style="padding-top:2vh">
Treasury stock: the amount of equity that has been repurchased by the company. Treasury stock functions as a “contra-account” and actually reduces the total amount of shareholders’ equity.
</li>

<li style="padding-top:2vh">
Retained Earnings- Retained earnings is created when a company has a positive net income. Every period retained earnings increases by the total amount of net income minus dividends paid. 
</li>
</div>

<div>
<h5 style="text-align:center;padding-top:5vh"> Bank Balance Sheet</h5>
<p style="text-align:center;padding-top:5vh;padding-right:12vw;padding-left:12vw">
Bank balance sheets follow the same general rules of other companies where assets = liabilities + equity. However, banks have certain line items unique to them in addition to what has been mentioned above. Below lists common line items specific for financial institutions. 
</p>

<div>
<h6 style="text-align:left;padding-top:5vh">Assets </h6>

<p align="left">
  <ul>
<li style="padding-top:2vh">
Loans to customers: Total amount of outstanding loans to the bank’s clientele. 
</li>

<li style="padding-top:2vh">
Trading assets: Assets held by the bank for trading purposes. 
</li>

<li style="padding-top:2vh">
Deposits to central bank: Total amount of the bank’s money it has stored with the central bank. 
</li>
</ul>
</p>
</div>

</div>


<div style="padding-bottom:10vh">
<h6 style="text-align:left;padding-top:5vh">Liabilities </h6>
<p>
<ul>
  <li style="padding-top:2vh">
Loans from central bank: Total amount of money borrowed from the central bank.
</li>

<li style="padding-top:2vh">
Deposits from customers: Total amount of money the bank’s clientele have entrusted with the bank it is responsible for. 
</li>

<li style="padding-top:2vh">
Trading liabilities: Derivative liabilities or short positions held by the bank for the purposes of trading. 
</li>
</ul>
</p>
</div>
    </div>
    </div>
    </div>
  </v-container>
</template>

<script>

export default {
    data() {
        return {

        }
    }
}
</script>

<style scoped>


</style>