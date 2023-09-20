// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Event {
    address public owner;
    string public title;
    string public description;
    string public location;
    string public eventType;
    string public image;
    string public eventID;
    uint public date;

    mapping(address => bool) public isAttending;
    address[] private attendeesArray;

    event AttendeeAdded(address attendee);
    event AttendeeRemoved(address attendee);

    constructor(
        string memory _title,
        string memory _description,
        string memory _location,
        string memory _eventType,
        string memory _image,
        uint _date,
        string memory _eventID
    ) {
        owner = tx.origin;
        title = _title;
        description = _description;
        location = _location;
        eventType = _eventType;
        image = _image;
        date = _date;
        eventID = _eventID;
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

    function getAllAttendees() public view returns (address[] memory) {
        return attendeesArray;
    }
}
