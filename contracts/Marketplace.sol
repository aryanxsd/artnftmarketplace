// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IERC721 {
    function transferFrom(address from, address to, uint tokenId) external;
}

contract Marketplace is ReentrancyGuard {
    uint256 public listingPrice = 0.025 ether;
    address payable public owner;

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    uint256 public itemCount;
    mapping(uint256 => MarketItem) public idToMarketItem;

    event MarketItemCreated(
        uint indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing fee");

        itemCount++;
        idToMarketItem[itemCount] = MarketItem(
            itemCount,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        emit MarketItemCreated(itemCount, nftContract, tokenId, msg.sender, address(0), price, false);
    }

    function createMarketSale(address nftContract, uint256 itemId) public payable nonReentrant {
        MarketItem storage item = idToMarketItem[itemId];
        require(msg.value == item.price, "Please submit the asking price");

        item.seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, item.tokenId);
        item.owner = payable(msg.sender);
        item.sold = true;
        payable(owner).transfer(listingPrice);
    }
}
