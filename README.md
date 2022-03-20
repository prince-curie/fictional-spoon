# Monk

## Objectives( What you are required to do):

- Extend an ERC20 to support staking and rewards. 
- Users can stake some of their tokens. When users stake their tokens, they are effectively locked and can't be transferred or spent.
- Make your contract Ownable and assign the owner 1000 tokens initially. 
- Create a function modifyTokenBuyPrice and restrict access only to the owner.
- Create a function buyToken that can be called publicly to buy/mint new tokens.
- Create a Rewards System, where users can earn 1% of their stake. They will be able to call a function to claim rewards which will increment their balance. They will only be eligible to claim rewards every week, and users who don't claim their rewards effectively lose them for that week.
- Create a basic User Interface that makes use of web3.js or ethers.js to interact with your smart contract. 
- User UI should show Users the number of tokens staked, give them the ability to stake tokens, give them the ability to view their token balance, and give them the ability to transfer tokens.

UI link = https://fictional-spoon.vercel.app/

Testnet address = https://rinkeby.etherscan.io/address/0xA2A3ac78826ff5edfDD27160CbD992460f9Da35F#code