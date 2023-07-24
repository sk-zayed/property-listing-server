// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.10;

contract RealEstate {
    address admin;

    constructor() {
        admin = msg.sender;
    }

    struct User {
        string name;
        string email;
        string aadhaar;
    }

    struct Transaction {
        User buyer;
        User seller;
        uint256 zipcode;
        uint256 timestamp;
    }

    mapping(string => User) public users;
    mapping(string => Transaction[]) public transactions;

    modifier isAdmin() {
        require(msg.sender == admin);
        _;
    }

    function addUser(
        string memory _name,
        string memory _email,
        string memory _aadhaar
    ) public {
        require(!userExists(_aadhaar), "User already exists!");
        users[_aadhaar].name = _name;
        users[_aadhaar].email = _email;
        users[_aadhaar].aadhaar = _aadhaar;
    }

    function userExists(string memory aadhaar) internal view returns (bool) {
        if (bytes(users[aadhaar].name).length != 0) {
            return true;
        } else {
            return false;
        }
    }

    function getUser(string memory aadhaar) public view returns (User memory) {
        return users[aadhaar];
    }

    function addTransaction(
        string memory _buyer,
        string memory _seller,
        string memory rera,
        uint256 _zipcode,
        uint256 _timestamp
    ) public {
        require(
            keccak256(abi.encodePacked(_buyer)) !=
                keccak256(abi.encodePacked(_seller)),
            "You can not sell to yourself."
        );
        require(userExists(_buyer), "Buyer is not registered.");
        require(userExists(_seller), "Seller is not registered.");
        Transaction[] memory txnArray = transactions[rera];
        if (txnArray.length > 0) {
            Transaction memory prevTxn = txnArray[txnArray.length - 1];
            require(
                keccak256(abi.encodePacked(prevTxn.buyer.aadhaar)) == keccak256(abi.encodePacked(_seller)),
                "Only owner has right to sell the property."
            );
            require(
                prevTxn.timestamp <= _timestamp,
                "Properties bought in past can only be sold."
            );
        }

        Transaction memory newTransaction = Transaction({
            buyer: users[_buyer],
            seller: users[_seller],
            zipcode: _zipcode,
            timestamp: _timestamp
        });
        transactions[rera].push(newTransaction);
    }

    function getHistory(string memory rera)
        public view
        returns (Transaction[] memory)
    {
        return transactions[rera];
    }
}