// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.2.0/contracts/token/ERC20/IERC20.sol";
contract DaomartProduct {

    address public constant gitcoin = 0x9B00B2A3514CC05Ea9957ad5e4D279D724a81Afb;
  
    bytes32[] public products;

    address public candy;
    
    mapping(bytes32 => uint256) public quantities;
    mapping(bytes32 => uint256) public coefficients;
    mapping(bytes32 => uint256) public currentX;
    mapping(bytes32 => mapping(uint256 => address)) public history;
    mapping(bytes32 => mapping(uint256 => uint8)) public historyBoughtWithEther;
    
    uint256 initialEthPrice = 0.05 ether;
    uint256 initialCandyPrice = 100 ether;
    
    string public name;
    
    
    uint256 public streakMinInterval = 30;
    uint256 public streakMaxInterval = 50;

    mapping(bytes32 => mapping(address => uint256)) public currentStreaks;
    mapping(bytes32 => mapping(address => uint256)) public lastPaidBlock;
    mapping(bytes32 => mapping(address => uint256)) public amountPaid;
    
    constructor(string memory name_, address candy_, bytes32[] memory products_, uint256[] memory quant_, uint256[] memory coef_)  {
        name = name_;
        candy = candy_;
        products = products_;

        for(uint256 i = 0 ; i < products.length; i++){
            require(currentX[products[i]] == 0, "DUPE");
            currentX[products[i]] = 1;
            quantities[products[i]] = quant_[i];
            coefficients[products[i]] = coef_[i];
        }
    }
  
    function getAllProducts() public view returns (bytes32[] memory){
        return products;
    }
    
    function getPriceChangeForPrice(uint256 price, uint256 coef_) public view returns(uint256){
        return price * coef_ / 10**3;
    }
    
    function getEtherAmountForX(uint256 x, uint256 coef_) public view returns(uint256){
        uint256 price = initialEthPrice;
        for(uint256 i = 1; i < x; i++){
            price += getPriceChangeForPrice(price, coef_);
        }
        return price;
    } 
    
    function getCandyAmountForX(uint256 x, uint256 coef_) public view returns(uint256){
        uint256 price = initialCandyPrice;
        for(uint256 i = 1; i < x; i++){
            price -= getPriceChangeForPrice(price, coef_);
        }
        return price;
    }
    
    
    function requestMintWithEth(bytes32 productId, address to)
      public
      payable
    {
        uint256 x = currentX[productId];
        require( x > 0, "PRODUCT 404");
        uint256 quantity = quantities[productId];
        require( x < quantity, "OUT OF STOCK");
        uint256 coef = coefficients[productId];
        uint256 price = getEtherAmountForX(x, coef);
        require(msg.value >= price, "NOT ENOUGH");
        (bool success,) = gitcoin.call{value:price}("");
        require( success, "could not send");
        history[productId][x] = to;
        historyBoughtWithEther[productId][x] = 1;
        x += 1;
        currentX[productId] = x;

        if(msg.value - price > 0){
            (bool successRefund,) = msg.sender.call{value:msg.value-price}("");
            require(successRefund, "could not send refund");
        }
    }
    
    function requestMintWithCandy(bytes32 productId, address to, uint256 candyAmount)
      public
    {
        uint256 x = currentX[productId];
        require( x > 0, "PRODUCT 404");
        uint256 quantity = quantities[productId];
        require( x < quantity, "OUT OF STOCK");
        uint256 coef = coefficients[productId];
        uint256 price = getCandyAmountForX(x, coef);
        require(candyAmount >= price, "NOT ENOUGH");
        require(IERC20(candy).transferFrom(msg.sender, gitcoin, price), "Transfer failed");
        
        history[productId][x] = to;
        historyBoughtWithEther[productId][x] = 2;
        x += 1;
        currentX[productId] = x;
    }
        

    
    function buyBitByBit(bytes32 productId, uint256 candyAmount)
      public 
    {
        uint256 x = currentX[productId];
        require( x > 0, "PRODUCT 404");
        uint256 coef = coefficients[productId];
        uint256 price = getCandyAmountForX(x, coef);
        require(currentStreaks[productId][msg.sender] == 0, "DUPE");
        require(candyAmount < price , "TOO MUCH, BUY IN FULL");
        require(IERC20(candy).transferFrom(msg.sender, gitcoin, candyAmount), "Transfer failed");   
        currentStreaks[productId][msg.sender] = 1;
        lastPaidBlock[productId][msg.sender] = block.number;
        amountPaid[productId][msg.sender] = candyAmount;
    }
    
    function payABit(bytes32 productId, uint256 candyAmount)
      public returns (bool)
    {
        uint256 x = currentX[productId];
        require( x > 0, "PRODUCT 404");
        uint256 coef = coefficients[productId];
        uint256 price = getCandyAmountForX(x, coef);
        uint256 currentStreak = currentStreaks[productId][msg.sender];
        require( currentStreak > 0, "HAVENT STARTED YET");
        require(IERC20(candy).transferFrom(msg.sender, gitcoin, candyAmount), "Transfer failed");   
        
        
        uint256 _currentPaid = amountPaid[productId][msg.sender];
        uint256 interestTillNow = getCompoundingInterest(lastPaidBlock[productId][msg.sender], block.number, _currentPaid, currentStreak, coef);
        uint256 newAmountPaid = interestTillNow + candyAmount;
        

        
        if(newAmountPaid >= price){
            history[productId][x] = msg.sender;
            historyBoughtWithEther[productId][x] = 2;
            x += 1;
            currentX[productId] = x;
            
            currentStreaks[productId][msg.sender] = 0;
            lastPaidBlock[productId][msg.sender] = 0;
            amountPaid[productId][msg.sender] = 0;
            return true;
        } else{
            uint256 lastPaidDiff = block.number - lastPaidBlock[productId][msg.sender];
            if(lastPaidDiff < streakMaxInterval && lastPaidDiff > streakMinInterval){
                currentStreaks[productId][msg.sender] = currentStreak + 1;
            }
            else if(lastPaidDiff > streakMaxInterval){
                currentStreaks[productId][msg.sender] = 1;
            }

            lastPaidBlock[productId][msg.sender] = block.number;
            amountPaid[productId][msg.sender] = newAmountPaid;
            return false;
        }
    }
    
    function getInterestPerBlock(uint256 interest, uint256 coef_) public view returns (uint256){
        return interest * coef_ / 10**4;
    }
    
    function getCompoundingInterest(uint256 start, uint256 end, uint256 amount, uint256 streak, uint256 coef_) public view returns (uint256){
        uint256 duration = end - start;
        uint256 interest = amount;
        for(uint256 i = 1; i < duration; i++){
            interest +=   getInterestPerBlock(interest, coef_) * streak;
        }
        return interest;
    }
}