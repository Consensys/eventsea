// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./Event.sol";
import "./Ticket.sol";

contract EventsFactory {
    struct EventDetail {
        Event eventContract;
        Ticket ticketContract;
    }

    EventDetail[] private eventDetails;

    event EventCreated(
        address indexed owner,
        address indexed eventAddress,
        string title,
        uint date
    );

    event TicketAssociated(
        address indexed owner,
        address indexed ticketAddress,
        string name
    );

    function createEvent(
        string memory title,
        string memory description,
        string memory location,
        string memory eventType,
        string memory image,
        uint date,
        string memory name,
        string memory symbol,
        string memory contractBaseURI,
        uint256 maxSupply
    ) public returns (Event) {
        Event eventContract = new Event(
            title,
            description,
            location,
            eventType,
            image,
            date
        );

        Ticket ticketContract = createNFTTickets(
            name,
            symbol,
            contractBaseURI,
            maxSupply
        );

        eventDetails.push(
            EventDetail({
                eventContract: eventContract,
                ticketContract: ticketContract
            })
        );

        emit EventCreated(msg.sender, address(eventContract), title, date);
        return eventContract;
    }

    function getEvents() public view returns (Event[] memory) {
        Event[] memory events = new Event[](eventDetails.length);
        for (uint i = 0; i < eventDetails.length; i++) {
            events[i] = eventDetails[i].eventContract;
        }
        return events;
    }

    function getEventById(uint id) public view returns (Event) {
        require(id < eventDetails.length, "Event ID out of range");
        return eventDetails[id].eventContract;
    }

    function getTicketByEventId(uint id) public view returns (Ticket) {
        require(id < eventDetails.length, "Event ID out of range");
        return eventDetails[id].ticketContract;
    }

    function createNFTTickets(
        string memory name,
        string memory symbol,
        string memory contractBaseURI,
        uint256 maxSupply
    ) internal returns (Ticket) {
        Ticket ticketContract = new Ticket(
            name,
            symbol,
            contractBaseURI,
            maxSupply
        );

        emit TicketAssociated(msg.sender, address(ticketContract), name);
        return ticketContract;
    }
}
