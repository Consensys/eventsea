// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Event.sol";

contract EventsFactory {
    Event[] private events;

    event EventCreated(
        address indexed owner,
        address indexed eventAddress,
        string title,
        uint date
    );

    function createEvent(
        string memory title,
        string memory description,
        string memory location,
        string memory eventType,
        string memory image,
        string memory symbol,
        uint date,
        uint ticketPrice,
        uint amountOfTickets
    ) public returns (Event) {
        Event eventContract = new Event(
            title,
            description,
            location,
            eventType,
            image,
            symbol,
            date,
            ticketPrice,
            amountOfTickets
        );

        events.push(eventContract);

        emit EventCreated(msg.sender, address(eventContract), title, date);

        return eventContract;
    }

    function getEvents() public view returns (Event[] memory) {
        Event[] memory eventsData = new Event[](events.length);
        for (uint i = 0; i < events.length; i++) {
            eventsData[i] = events[i];
        }
        return events;
    }

    function getEventById(uint id) public view returns (Event) {
        require(id < events.length, "Event ID out of range");
        return events[id];
    }
}
