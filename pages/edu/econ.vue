<template>
    <!-- Splash -->
  <v-container fluid class="splash">
    <div class="splash-centered mx-auto my-auto">
      <h1 style="text-align:center;padding-top:10vh">Economic <span class="primary-text">Data</span></h1>

<div style="padding-right:10vh;padding-left:10vh;padding-bottom:10vh;padding-top:5vh">
<p>
On top of the several business factors that influence stock price, macroeconomic trends can play a powerful role in shaping the general direction of the stock market. Several key metrics are widely monitored to better understand the health and cyclicality of the U.S. economy. Below is a list of the economic data this site monitors and their significance. All economic data described originates from FRED (Federal Reserve Economic Data) which is a database maintained by the research division of the Federal Reserve Bank of St. Louis.
</p>

<div>
  <h6>
    Interest Rates
  </h6>

<ul>
  <li>
3-month treasury maturity rate: The yield on a 3-month U.S. Treasury bill. 
</li>

  <li>
10-year treasury maturity rate: This yield is widely watched as an indicator of investor confidence and is also used as a proxy for mortgage rates. A rising yield means investors are switching to riskier investments with potentially high returns. If investors are taking on more risk, that usually means there is higher confidence of the economy’s future. 
</li>

  <li>
30-year treasury maturity rate: The 30-year T-bond is has the longest maturity of all the treasury securities and thus will usually have the highest yield.
</li>

  <li>
10-year minus 2-year treasury spread: A negative spread is generally viewed as an indicator of a incoming recessionary period. 
</li>

  <li>
Effective federal funds rate: This is the interest rates depository institutions charge each other for overnight loans. The Federal Reserve influences this rate by buying and selling bonds as one method of controlling inflation. 
</li>

  <li>
Moody’s Aaa corporate bond yield: This is the yield for corporate bonds with the lowest probability of default. It can be used as an alternative to the 10-year yield for macroeconomic analysis. 
</li>

  <li>
Moody’s Baa corporate bond yield: This is the lowest investment grade rating a corporate bond can receive. Investors can compare this yield to the Aaa yield as spreads can increase during recessionary periods. 
</li>
</ul>
</div>

<div>
<h6>
Business Activity
</h6>
<ul>

  <li>
Industrial production index: Measures real output for all facilities located in the US manufacturing, mining, electric, and gas utilities. An uptick in this index can be a sign of a strengthening economy.
</li>

  <li>
ISM manufacturing PMI composite index: This is a composite of 5 categories in new orders, productions, employment, supplier deliveries, and inventories, surveyed from 17 sectors. It is a leading indicator that can influence financial markets, as an increase generally means economic growth.
</li>

  <li>
All employees total nonfarm payrolls: Measures the total amount of U.S. workers excluding proprietors, unpaid volunteers, farm employees, and the unincorporated self-employed. This metric can be used to show the number of jobs added or lost in an economy.
</li>

  <li>
Total business inventory to sales ratio: This is generally a lagging indicator of the US economy. As the economy slows down, a bullwhip effect takes place and inventories increase among companies. As the economy picks back up, this ratio decreases. 
</li>
</ul>
</div>

<div>
  <h6>
Debt & GDP
</h6>

<ul>
  <li>
Total public debt as a percent of GDP: Total federal government debt divided by nominal GDP.
</li>

<li>
Gross Domestic Product: The market value of all the final goods and services produced in a specific period. This is one of the main indicators for economic growth. 
</li>

<li>
Household debt to GDP: Total debt incurred by resident households of the US divided by nominal GDP.
</li>
</ul>
</div>

<div>
  <h6>
Money Supply
</h6>

<ul>
  <li>
M1 money stock: All deposits with commercial banks excluding those held by depository institutions, the US government and foreign banks, and other checkable deposits. This is generally the most frequently used metric to determine how much money is in circulation which influences prices.
</li>

<li>
M2 money stock: Everything included in M1 supply as well as savings accounts, retirement accounts, money market funds, and retail investment accounts. This is another critical factor for predicting inflation. 
</li>

<li>
Velocity of M1 money stock: The ratio of nominal GDP to M1 money supply. Higher velocity is associated with a healthier, growing economy while a lower velocity usually means the opposite. 
</li>

<li>
Velocity of M2 money stock: The ratio of nominal GDP to M2 money supply. Higher velocity is associated with a healthier, growing economy while a lower velocity usually means the opposite. 
</li>

<li>
Excess reserves of depository institutions: Deposits held by depository institutions like banks in excess of the reserve requirements. These excess reserves at as a buffer that increases the safety of the banking system. 
</li>
</ul>
</div>

<div>
  <h6>
Prices
</h6>

<ul>
  <li>
Consumer price index (all items): A measure of the average change in prices including all goods. 
</li>

<li>
Consumer price index (excluding food & energy): A measure of the average change in prices not including energy and food prices since these can be quite volatile. 
</li>

<li>
Composite home price index: A leading measure for tracking US residential real estate prices.
</li>

<li>
Trade weighted US dollar index (broad): A broad measure of the value of the US dollar relative to other currencies. This helps economists understand the US dollar purchasing value. Foreign investors tend to buy more US equities when they expect the US dollar to strengthen, so short-term depreciation of the US dollar value could lead to an increase in US equity prices. 
</li>
</ul>
</div>

<div>
<h6>
Population
</h6>

<ul>
  <li>
New privately owned housing units started: This provides data on the construction of new privately-owned homes. An increase in housing construction decreases unemployment, increases GDP, and generally indicate an economic upturn. 
</li>

<li>
Consumer sentiment: This measures how optimistic consumers feel about their finances and the general economy. Consumer spending makes up a majority of the GDP, so positive sentiment usually means consumers will be more likely to shop and boost the economy. 
</li>

<li>
Working age population: This measures the amount of people who are of working age in the economy. Population growth is a key factor of long-term economic growth.
</li>

<li>
Civilian unemployment rate: The percent of people 16 and over actively searching for employment in the total labor force. This is lagging indicator of the economic cycle. 
</li>

<li>
Natural rate of unemployment: The minimum unemployment rate due to economic forces. It is equivalent to an economy at full employment.
</li>

<li>
CBOE volatility index (VIX): Market expectations for near-term price volatility in the S&P 500. An increase in the VIX is generally a near-term bearish signal for the market.
</li>

<li>
Personal consumption expenditure chain type price index: The average increase in prices for all domestic personal consumption. This is another strong indicator of inflation along with CPI.
</li>

<li>
Personal savings rate: Personal savings as a percentage of disposable personal income. When people save more, that can mean short-term lower consumption and higher investment which can increase long-term economic growth. It can also help explain Americans’ current financial health. 
</li>

<li>
Real median household income: Shows the median change in household income. This metric differs from real wages, as the number of hours worked and share of the population working can also influence household income. A higher income generally leads to a stronger economy. 
</li>
</ul>
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