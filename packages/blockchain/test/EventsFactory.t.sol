// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/EventsFactory.sol";
import "../src/Event.sol";

contract EventsFactoryTest is Test {
    EventsFactory eventsFactory;
    Event eventExpected;

    function setUp() public {
        eventsFactory = new EventsFactory();
        eventExpected = eventsFactory.createEvent(
            "test_title",
            "test_description",
            "test_location",
            "test_eventType",
            "test_image",
            1708488239,
            100,
            100
        );
    }

    function test_getEvents() public {
        Event eventActual = eventsFactory.getEvents()[0];
        assertEq(address(eventExpected), address(eventActual));
    }

    function test_getEventById() public {
        Event eventActual = eventsFactory.getEventById(0);
        assertEq(address(eventExpected), address(eventActual));
    }
}
