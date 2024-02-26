// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/EventsFactory.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("ACCOUNT_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        new EventsFactory();

        vm.stopBroadcast();
    }
}
