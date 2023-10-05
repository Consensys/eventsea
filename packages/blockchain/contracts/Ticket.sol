// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "erc721a/contracts/ERC721A.sol";

contract Ticket is ERC721A, Ownable, Pausable {
    uint256 public MAX_SUPPLY;
    uint256 public PRICE = 0.001 ether;
    uint256 public constant MAX_PER_MINT = 5;
    address public eventOwner;
    uint256 public tokenId = totalSupply();
    string public _contractBaseURI;

    event PermanentURI(string _value, uint256 indexed _id, address indexed _to);
    event TicketMinted(address indexed _to, uint256 indexed _tokenId);

    constructor(
        string memory name,
        string memory symbol,
        string memory contractBaseURI,
        uint256 maxSupply
    ) ERC721A(name, symbol) {
        MAX_SUPPLY = maxSupply;
        eventOwner = tx.origin;
        _contractBaseURI = contractBaseURI;
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
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "Not enough tickets left"
        );
        require(amount > 0, "Amount must be greater than zero");
        _;
    }

    function mint(
        uint256 amount
    ) external payable whenNotPaused canMint(amount) {
        for (uint256 i = 1; i < amount; i++) {
            tokenId++;
            _safeMint(msg.sender, tokenId);
            lockMetadata(amount);
            emit TicketMinted(msg.sender, tokenId);
        }
    }

    function lockMetadata(uint256 quantity) internal {
        for (uint256 i = quantity; i > 0; i--) {
            uint256 tid = totalSupply() - i;
            emit PermanentURI(tokenURI(tid), tid, msg.sender);
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

    function _baseURI() internal view override returns (string memory) {
        return _contractBaseURI;
    }

    function tokenMeta(uint256 _tokenId) public view returns (string memory) {
        return tokenURI(_tokenId);
    }
}
