// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Event {
    address public owner;
    string public title;
    string public description;
    string public location;
    string public eventType;
    string public image;
    uint public date;
    uint public ticketPrice;
    uint public amountOfTickets;
    address[] private attendeesArray;

    mapping(address => bool) public isAttending;
    mapping(address => bool) public checkedIn;

    event AttendeeAdded(address attendee);
    event AttendeeRemoved(address attendee);

    constructor(
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _eventType,
        string memory _image,
        uint _ticketPrice,
        uint _amountOfTickets,
        uint _date
    ) {
        owner = tx.origin;
        title = _title;
        description = _description;
        location = _location;
        eventType = _eventType;
        image = _image;
        date = _date;
    }

    modifier onlyOwner() {
        require(tx.origin == owner, "You aren't the owner");
        _;
    }

    modifier notAttending(address _attendee) {
        require(!isAttending[_attendee], "You are already attending");
        _;
    }

    function addAttendee(
        address _attendee
    ) public onlyOwner notAttending(_attendee) {
        isAttending[_attendee] = true;
        attendeesArray.push(_attendee);
        emit AttendeeAdded(_attendee);
    }

    function removeAttendee(address _attendee) public onlyOwner {
        require(isAttending[_attendee], "Attendee not found");
        isAttending[_attendee] = false;

        for (uint i = 0; i < attendeesArray.length; i++) {
            if (attendeesArray[i] == _attendee) {
                attendeesArray[i] = attendeesArray[attendeesArray.length - 1];
                attendeesArray.pop();
                break;
            }
        }

        emit AttendeeRemoved(_attendee);
    }

    function getAttendeeCount() public view returns (uint) {
        return attendeesArray.length;
    }

    function getAttendee(uint _index) public view returns (address) {
        require(_index < attendeesArray.length, "Index out of bounds");
        return attendeesArray[_index];
    }

    function setPrice(uint _price) public onlyOwner {
        ticketPrice = _price;
    }

    function setTicketAmount(uint _ticketAmount) public onlyOwner {
        amountOfTickets = _ticketAmount;
    }

    function getAllAttendees() public view returns (address[] memory) {
        return attendeesArray;
    }

    function checkIn(address _address) public onlyOwner() {
        checkedIn[_address] = true;
    }

    function isCheckedIn(address _address) public view returns (bool) {
        return checkedIn[_address];
    }
}
