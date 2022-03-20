//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Monk is ERC20, Ownable {

    event ModifyTokenBuyprice(uint price);
    event TokenBuy(address indexed buyer, uint amount);
    event Stake(address indexed stakeholder, uint amount);
    event ClaimReward(address indexed stakeholder, uint amount);

    error NotExactAmount();
    error ZeroMonkSent();
    error OngoingStakingCircle();
    error TokenPriceNotSet();

    struct StakingDetail {
        uint256 amount;
        uint32 stakingStarts;
        uint32 stakingEnds;
        uint32 lastRewardWithDrawTime; 
    }

    // stakeholders => amoount staked
    mapping(address => StakingDetail) public stakes;
    uint public tokenBuyPrice;
    bool public isTokenPriceSet;


    
    constructor() ERC20('Monk', 'MNK') {
        super._mint(msg.sender, 1000 * 1e18);
    }

    function modifyTokenBuyPrice(uint _price) public onlyOwner {
        tokenBuyPrice = _price; 
        isTokenPriceSet = true;

        emit ModifyTokenBuyprice(tokenBuyPrice);
    }

    function buyToken(uint quantity) public payable {
        if(isTokenPriceSet == false) {
            revert TokenPriceNotSet();
        }
        uint total = quantity * tokenBuyPrice;

        if(total != msg.value) {
            revert NotExactAmount();
        }

        super._mint(msg.sender, quantity);

        emit TokenBuy(msg.sender, quantity);
    }

    function stake(uint _amount) public {
        if(_amount == 0) {
            revert ZeroMonkSent();
        }

        super._burn(msg.sender, _amount);

        StakingDetail memory userStake = stakes[msg.sender];

        if(block.timestamp <= userStake.stakingEnds) {
            revert OngoingStakingCircle();
        }

        userStake.amount += _amount;
        userStake.stakingStarts = uint32(block.timestamp);
        userStake.stakingEnds = uint32(block.timestamp) + 604800;

        emit Stake(msg.sender, _amount);
    }

    function claimReward() public {      
        StakingDetail memory userStake = stakes[msg.sender];

        if(block.timestamp <= userStake.stakingEnds) {
            revert OngoingStakingCircle();
        }

        uint reward = userStake.amount / 100;

        userStake.lastRewardWithDrawTime = uint32(block.timestamp);
        userStake.stakingStarts = uint32(block.timestamp);
        userStake.stakingEnds = uint32(block.timestamp) + 604800;

        super._mint(msg.sender, reward);

        emit ClaimReward(msg.sender, reward);
    }
}