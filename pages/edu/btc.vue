<template>
    <!-- Splash -->
  <v-container fluid class="splash">
    <div class="splash-centered mx-auto my-auto">
      <h1 style="text-align:center;padding-top:10vh">Basics of <span class="primary-text">Bitcoin</span></h1>

      <div style="padding-right:10vh;padding-left:10vh;padding-bottom:10vh">
<div style="padding-top:3vh">      
   <p>
Bitcoin is a digital currency created in 2009 by an unknown person with the pseudonym Satoshi Nakamoto. It is distributed and stored on a decentralized ledger system, which runs on a collection of computers (referred to as “nodes” or “miners”). This distributed ledger system is known as blockchain technology which is a specific type of database. While bitcoin has become immensely popular over the years, the new blockchain technology that came with it has been the true source of new innovations in fintech with promises to revolution payment processing, security, and data storing.
</p>
</div>

<div> 
<p>
As opposed to a typical database, digital information is distributed but not copied. Many experts in technology have found applications for it beyond digital currencies as well due its nature. Simply put, blockchain is a time-stamped series of unchangeable data records managed by several nodes rather than being stored on a single computer. When a new transaction is made between 2 parties, it is broadcasted to this computer network. The network bunches it with several other transactions into a block. Each block is restricted to 1 MB of data. Within that block are 2 main components: the Block Header and the list of transactions. The Block Header consists of a hash of the current block, and the hash of the previous block. The new block is then added to the previous block in a chain-like feature (hence the term blockchain). 
</p>
</div>

<div> 
<p>
The hash is an output of a mathematical function, or algorithm. The algorithm processes the input data (the transactions in the block) and outputs a 256-bit number, a string of digits 0-9 and letters of A-F to uniquely identify the block. Within the network of computers, miners compete against one another to find the correct hash for the new block. The first miner to do so correctly is rewarded with bitcoin. To find the correct hash, the miner continuously changes the nonce, a number added to each hash that is alterable. Like solving a puzzle board, different nonces are tried until the correct one is discovered. Only instead of a physical piece, it is a number. The correct number is found through brute force trying as many combinations and as quickly as possible. 
</p>
</div>

<div> 
<p>
This ledger is irreversible due to its chain-like feature since each block contains its own hash as well as the hash of the previous block . If someone wanted to change the information in one block, they would also have to change the information in the blocks it’s connected to. This creates a ripple effect since all blocks are entangled in a block chain, making it virtually impossible to change anything. 
</p>
</div>

<div> 
<p>
Bitcoin has a specific protocol to add a block every 10 minutes over the long run. To maintain this steady flow with a fluctuating number of transactions throughout the day, the bitcoin system is designed to change the degree of difficulty for solving the hash puzzle. After 2,016 new blocks have been added, it looks back at how long it took to solve them on average and adjusts the difficulty accordingly. So, if the last 2,016 blocks were too easy and a new one was added every 5 minutes on average, it increases the difficulty for the next 2,016 blocks to achieve a long-run goal of 1 block every 10 minutes. This concept is referred to as “target difficulty” and is also included in each block. 
</p>
</div>

<div> 
<p>
Miners receive a reward for their services in bitcoin. When it first started, miners received 50 bitcoin per block. Every 210,000 blocks (roughly 4 years) the number is halved, and bitcoin’s system will continue this until 2,140 bitcoin have been rewarded. Since bitcoin is structured to only create a certain number of blocks per day, and the reward is halved every 4 years, the number of total bitcoins in circulation follows a lognormal pattern. At a certain point, the reward will be so small there may be little incentive to continue mining. The idea is, while transactions are currently free for bitcoin users, transaction costs will still be much smaller than those charged by banks currently even when miners have little bitcoin to gain. 
</p>
</div>

<div> 
<p>
One major issue with mining is the energy and computing power required to find the correct hash. In August 2020 for example, the difficulty level was over 16 trillion, meaning a random guess had the chance of being correct 1 out of 16 trillion attempts. In today’s competitive environment, groups of miners form a mining pool to combine computing power and be the first ones to solve the problem. Depending on the mining pools electricity source, massive amounts of computation can lead to carbon emissions. Bitcoin now has a carbon footprint about the size of the country New Zealand, since some miners receive their energy from fossil fuel plants powered by coal or natural gas. While the banking system and gold mining industry still has a larger carbon footprint, bitcoin mining may not prove to be a sustainable process without a greater integration with renewable energy and more power efficient computing. Another problem is the stigma bitcoin has involving criminal activity. Due to the anonymity it provides users, it has enabled criminals on the dark web to exchange illegal goods and services. On the other hand, bitcoin only makes up a tiny percentage of the total transactions for illegal activity and is much less than American dollars. 
</p>
</div>

<div> 
<p>
Bitcoin’s hype revolves around the idea of a decentralized financial system that makes processing transactions cheaper and safer. It faces several key issues: volatility risk in the change of its value, reputation for criminal activity, ease of use, widespread acceptance, emergence of new cryptocurrencies, and the question of how a new, decentralized financial system could operate well without institutions like the Federal Reserve to regulate inflation and fractional banking to lend money for investments that grow the economy. While bitcoin may not become the standard global currency, its innovative system will continue to influence new ideas and structurally alter the world economy. 
  </p>
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