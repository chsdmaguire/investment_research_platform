<template>
    <!-- Splash -->
  <b-container fluid class="splash">
    <div class="splash-centered mx-auto my-auto">
      <h1 style="text-align:center;padding-top:10vh">Time Value of <span class="primary-text">Money</span></h1>

<div style="padding-right:10vh;padding-left:10vh">

      <p align=center style="padding-top:5vh">
The time value of money is a critical concept to the basics of finance. In essence, it tells us how much a certain amount of money today is worth in at specific point of time in the future. Or it tells us how much a certain amount of money at a specific point of time in the future is worth today. 

When we value future money at today’s amount, it is referred to as the present discounted value since we are discounting for the opportunity cost of not being able to use that money right now as well as the risk of not getting it back in the future. Below is the formula. 
</p>

<div class="row" style="padding-top:5vh;padding-right:30vh;padding-left:30vh">

  <div class="column">
<img src="~assets/education/tvmformula.jpeg">
</div>

<div class="column">
  <p>
PV= present value of money
</p>

<p>
FV= future value of money
</p>

<p>
i= expected percentage return
</p>

<p>
n= number of years
</p>

</div>
</div>

<p style="padding-top:5vh">
This powerful formula can be applied to the forecasted amount of cash a company is expected to generate. In a 2-stage model, a certain number of years are forecasted (usually 3-5). Then, a “terminal value” is calculated using the perpetuity formula, which finds PV assuming that these cash flows continue indefinitely (companies are always assumed to have an indefinite life span, even though in practice that is hardly ever the case). By finding the present value of each of these future cash flows, as well as the terminal value, we can derive a fundamental valuation of how much the company is worth in today’s amount of money based on all the money a company is ever expected to make.
</p>

<p style="padding-bottom:10vh">
*The “how to value a stock” button on the education page describes this whole process in more detail 
</p>

</div>
    </div>
  </b-container>
</template>

<script>

export default {
    data() {
      return {

      }
    },
}
</script>

<style scoped>

</style>