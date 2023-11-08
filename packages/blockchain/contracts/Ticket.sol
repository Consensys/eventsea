// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Ticket is ERC721URIStorage, Ownable(tx.origin), Pausable {
    uint256 public MAX_SUPPLY;
    uint256 public PRICE = 0.001 ether;
    uint256 public constant MAX_PER_MINT = 5;
    address public eventOwner;
    uint256 public tokenId = 0;
    string public _contractBaseURI;
    uint public _ticketPrice;

    event PermanentURI(string _value, uint256 indexed _id, address indexed _to);
    event TicketMinted(address indexed _to, uint256 indexed _tokenId);

    constructor(
        string memory name,
        string memory symbol,
        uint256 maxSupply,
        uint ticketPrice
    ) ERC721(name, symbol) {
        MAX_SUPPLY = maxSupply;
        eventOwner = tx.origin;
        _ticketPrice = ticketPrice;
    }

    modifier onlyEventOwner() {
        require(
            tx.origin == eventOwner,
            "Only event owner can call this function"
        );
        _;
    }

    modifier canMint(uint256 amount) {
        require(
            amount <= MAX_PER_MINT,
            "Cannot mint more than 5 tickets at a time"
        );
        require(msg.value >= PRICE * amount, "Not enough ETH sent");
        require(tokenId + amount <= MAX_SUPPLY, "Not enough tickets left");
        require(amount > 0, "Amount must be greater than zero");
        _;
    }

    function mint(
        uint256 amount,
        string memory _tokenURI
    ) external payable whenNotPaused canMint(amount) {
        for (uint256 i = 1; i < amount; i++) {
            tokenId++;
            _safeMint(msg.sender, tokenId);
            _setTokenURI(tokenId, _tokenURI);
            lockMetadata(amount);
            emit TicketMinted(msg.sender, tokenId);
        }
    }

    function lockMetadata(uint256 quantity) internal {
        for (uint256 i = quantity; i > 0; i--) {
            emit PermanentURI(tokenURI(tokenId), tokenId, msg.sender);
        }
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function contractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;

        payable(msg.sender).transfer(balance);
    }
    
    function tokenMeta(uint256 _tokenId) public view returns (string memory) {
        return tokenURI(_tokenId);
    }

    function setPrice(uint _price) public onlyOwner {
        _ticketPrice = _price;
    }
}
