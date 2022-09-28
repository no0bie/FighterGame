export const CONTRACT_ADDRESS = "0xB385DffAcbc41bc7efBC6A7046f5dC5C7a7e25DD";
export const CONTRACT_ABI = [{'anonymous': false, 'inputs': [{'indexed': false, 'internalType': 'uint256', 'name': 'fighterId', 'type': 'uint256'}, {'indexed': false, 'internalType': 'string', 'name': 'name', 'type': 'string'}], 'name': 'NewFighter', 'type': 'event'}, {'constant': true, 'inputs': [], 'name': 'count', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'name': 'fighters', 'outputs': [{'internalType': 'string', 'name': 'name', 'type': 'string'}, {'internalType': 'uint16', 'name': 'level', 'type': 'uint16'}, {'internalType': 'uint16', 'name': 'victory', 'type': 'uint16'}, {'internalType': 'uint16', 'name': 'losses', 'type': 'uint16'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'internalType': 'string', 'name': '_name', 'type': 'string'}], 'name': 'mintFighter', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}, {'constant': true, 'inputs': [{'internalType': 'uint256', 'name': '_id', 'type': 'uint256'}], 'name': 'getEnemies', 'outputs': [{'internalType': 'uint256[]', 'name': '', 'type': 'uint256[]'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'internalType': 'address', 'name': '_owner', 'type': 'address'}], 'name': 'getFighterByOwner', 'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'internalType': 'uint256', 'name': '_id', 'type': 'uint256'}], 'name': 'getFighterInformation', 'outputs': [{'internalType': 'string', 'name': '', 'type': 'string'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': true, 'inputs': [{'internalType': 'uint256', 'name': '_id', 'type': 'uint256'}], 'name': 'isOwner', 'outputs': [{'internalType': 'bool', 'name': '', 'type': 'bool'}], 'payable': false, 'stateMutability': 'view', 'type': 'function'}, {'constant': false, 'inputs': [{'internalType': 'uint256', 'name': '_myId', 'type': 'uint256'}, {'internalType': 'uint256', 'name': '_enemyId', 'type': 'uint256'}], 'name': 'fight', 'outputs': [{'internalType': 'uint256', 'name': '', 'type': 'uint256'}], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function'}]