export const defaultNftContractABI = [{
        'inputs': [{
            'internalType': 'string', 'name': '_name', 'type': 'string'
        }, {
            'internalType': 'string', 'name': '_symbol', 'type': 'string'
        }, {
            'internalType': 'string', 'name': '_CID', 'type': 'string'
        }], 'stateMutability': 'nonpayable', 'type': 'constructor'
    }, {
        'anonymous': false, 'inputs': [{
            'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address'
        }, {
            'indexed': true, 'internalType': 'address', 'name': 'approved', 'type': 'address'
        }, {
            'indexed': true, 'internalType': 'uint256',
            'name': 'tokenId', 'type': 'uint256'
        }], 'name': 'Approval', 'type': 'event'
    }, {
        'anonymous': false, 'inputs': [{
            'indexed': true, 'internalType': 'address', 'name': 'owner', 'type': 'address'
        }, {
            'indexed': true, 'internalType': 'address', 'name': 'operator', 'type': 'address'
        }, {
            'indexed': false, 'internalType': 'bool', 'name': 'approved', 'type': 'bool'
        }], 'name': 'ApprovalForAll', 'type': 'event'
    }, {
        'anonymous': false, 'inputs': [{
            'indexed': true, 'internalType': 'address', 'name': 'from', 'type': 'address'
        }, {
            'indexed': true, 'internalType': 'address', 'name': 'to', 'type': 'address'
        }, {
            'indexed': true, 'internalType': 'uint256',
            'name': 'tokenId', 'type': 'uint256'
        }], 'name': 'Transfer', 'type': 'event'
    }, {
        'inputs': [], 'name': 'CID', 'outputs': [{
            'internalType': 'string', 'name': '', 'type': 'string'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'address', 'name': 'to', 'type': 'address'
        }, {
            'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'
        }], 'name': 'approve', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'address', 'name': 'owner', 'type': 'address'
        }], 'name': 'balanceOf', 'outputs': [{
            'internalType': 'uint256',
            'name': '', 'type': 'uint256'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [], 'name': 'baseIPFSURI', 'outputs': [{
            'internalType': 'string', 'name': '', 'type': 'string'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256'
        }], 'name': 'formatImageURI', 'outputs': [{
            'internalType': 'string', 'name': '', 'type': 'string'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256'
        }], 'name': 'formatTokenName', 'outputs': [{
            'internalType': 'string', 'name': '', 'type': 'string'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'string', 'name': '_imageURI', 'type': 'string'
        }, {
            'internalType': 'string', 'name': '_name', 'type': 'string'
        }, {
            'internalType': 'string', 'name': '_description', 'type': 'string'
        }, {
            'internalType': 'string', 'name': '_properties', 'type': 'string'
        }], 'name': 'formatTokenURI', 'outputs': [{
            'internalType': 'string', 'name': '', 'type': 'string'
        }], 'stateMutability': 'pure', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'
        }], 'name': 'getApproved', 'outputs': [{
            'internalType': 'address', 'name': '', 'type': 'address'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'address', 'name': 'owner', 'type': 'address'
        }, {
            'internalType': 'address', 'name': 'operator', 'type': 'address'
        }], 'name': 'isApprovedForAll', 'outputs': [{
            'internalType': 'bool', 'name': '', 'type': 'bool'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [], 'name': 'mint', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
    }, {
        'inputs': [], 'name': 'name', 'outputs': [{
            'internalType': 'string', 'name': '', 'type': 'string'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'
        }], 'name': 'ownerOf', 'outputs': [{
            'internalType': 'address', 'name': '', 'type': 'address'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'address', 'name': 'from', 'type': 'address'
        }, {
            'internalType': 'address', 'name': 'to', 'type': 'address'
        }, {
            'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'
        }], 'name': 'safeTransferFrom', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'address', 'name': 'from', 'type': 'address'
        }, {
            'internalType': 'address', 'name': 'to', 'type': 'address'
        }, {
            'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'
        }, {
            'internalType': 'bytes', 'name': '_data', 'type': 'bytes'
        }], 'name': 'safeTransferFrom', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'address', 'name': 'operator', 'type': 'address'
        }, {
            'internalType': 'bool', 'name': 'approved', 'type': 'bool'
        }], 'name': 'setApprovalForAll', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'bytes4', 'name': 'interfaceId', 'type': 'bytes4'
        }], 'name': 'supportsInterface', 'outputs': [{
            'internalType': 'bool', 'name': '', 'type': 'bool'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [], 'name': 'symbol', 'outputs': [{
            'internalType': 'string', 'name': '', 'type': 'string'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256'
        }], 'name': 'tokenURI', 'outputs': [{
            'internalType': 'string', 'name': '', 'type': 'string'
        }], 'stateMutability': 'view', 'type': 'function'
    }, {
        'inputs': [{
            'internalType': 'address', 'name': 'from', 'type': 'address'
        }, {
            'internalType': 'address', 'name': 'to', 'type': 'address'
        }, {
            'internalType': 'uint256', 'name': 'tokenId', 'type': 'uint256'
        }], 'name': 'transferFrom', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
    }]
    export const nft2nftABI = [
        {
            'anonymous': false,
            'inputs': [
                {
                    'indexed': true,
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                }
            ],
            'name': 'OrderClosed',
            'type': 'event'
        },
        {
            'anonymous': false,
            'inputs': [
                {
                    'indexed': true,
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                }
            ],
            'name': 'OrderCreated',
            'type': 'event'
        },
        {
            'anonymous': false,
            'inputs': [
                {
                    'indexed': true,
                    'internalType': 'address',
                    'name': 'previousOwner',
                    'type': 'address'
                },
                {
                    'indexed': true,
                    'internalType': 'address',
                    'name': 'newOwner',
                    'type': 'address'
                }
            ],
            'name': 'OwnershipTransferred',
            'type': 'event'
        },
        {
            'anonymous': false,
            'inputs': [
                {
                    'indexed': false,
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                },
                {
                    'indexed': false,
                    'internalType': 'uint256',
                    'name': 'proposalId',
                    'type': 'uint256'
                }
            ],
            'name': 'ProposalCanceled',
            'type': 'event'
        },
        {
            'anonymous': false,
            'inputs': [
                {
                    'indexed': false,
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                },
                {
                    'indexed': false,
                    'internalType': 'uint256',
                    'name': 'proposalId',
                    'type': 'uint256'
                }
            ],
            'name': 'ProposalMade',
            'type': 'event'
        },
        {
            'inputs': [
                {
                    'internalType': 'uint256',
                    'name': '',
                    'type': 'uint256'
                }
            ],
            'name': 'SwapOrders',
            'outputs': [
                {
                    'internalType': 'address',
                    'name': 'offerer',
                    'type': 'address'
                },
                {
                    'components': [
                        {
                            'internalType': 'address',
                            'name': 'collection',
                            'type': 'address'
                        },
                        {
                            'internalType': 'uint256',
                            'name': 'tokenId',
                            'type': 'uint256'
                        }
                    ],
                    'internalType': 'struct OfferItem',
                    'name': 'offerItem',
                    'type': 'tuple'
                },
                {
                    'internalType': 'address',
                    'name': 'considCollection',
                    'type': 'address'
                },
                {
                    'internalType': 'bool',
                    'name': 'isActive',
                    'type': 'bool'
                }
            ],
            'stateMutability': 'view',
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                }
            ],
            'name': 'cancelOrder',
            'outputs': [],
            'stateMutability': 'nonpayable',
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                },
                {
                    'internalType': 'uint256',
                    'name': 'proposalId',
                    'type': 'uint256'
                }
            ],
            'name': 'cancelProposal',
            'outputs': [
                {
                    'internalType': 'uint256',
                    'name': '',
                    'type': 'uint256'
                }
            ],
            'stateMutability': 'nonpayable',
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'components': [
                        {
                            'internalType': 'address',
                            'name': 'collection',
                            'type': 'address'
                        },
                        {
                            'internalType': 'uint256',
                            'name': 'tokenId',
                            'type': 'uint256'
                        }
                    ],
                    'internalType': 'struct OfferItem',
                    'name': '_offerItem',
                    'type': 'tuple'
                },
                {
                    'internalType': 'address',
                    'name': '_considCollection',
                    'type': 'address'
                }
            ],
            'name': 'createOrder',
            'outputs': [],
            'stateMutability': 'nonpayable',
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                },
                {
                    'internalType': 'uint256',
                    'name': 'proposalId',
                    'type': 'uint256'
                }
            ],
            'name': 'execute',
            'outputs': [],
            'stateMutability': 'nonpayable',
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                }
            ],
            'name': 'getOrderProposals',
            'outputs': [
                {
                    'components': [
                        {
                            'internalType': 'address',
                            'name': 'proposer',
                            'type': 'address'
                        },
                        {
                            'internalType': 'uint256',
                            'name': 'tokenId',
                            'type': 'uint256'
                        },
                        {
                            'internalType': 'bool',
                            'name': 'isActive',
                            'type': 'bool'
                        }
                    ],
                    'internalType': 'struct Proposal[]',
                    'name': '',
                    'type': 'tuple[]'
                }
            ],
            'stateMutability': 'view',
            'type': 'function'
        },
        {
            'inputs': [],
            'name': 'getOrders',
            'outputs': [
                {
                    'components': [
                        {
                            'internalType': 'address',
                            'name': 'offerer',
                            'type': 'address'
                        },
                        {
                            'components': [
                                {
                                    'internalType': 'address',
                                    'name': 'collection',
                                    'type': 'address'
                                },
                                {
                                    'internalType': 'uint256',
                                    'name': 'tokenId',
                                    'type': 'uint256'
                                }
                            ],
                            'internalType': 'struct OfferItem',
                            'name': 'offerItem',
                            'type': 'tuple'
                        },
                        {
                            'internalType': 'address',
                            'name': 'considCollection',
                            'type': 'address'
                        },
                        {
                            'internalType': 'bool',
                            'name': 'isActive',
                            'type': 'bool'
                        },
                        {
                            'components': [
                                {
                                    'internalType': 'address',
                                    'name': 'proposer',
                                    'type': 'address'
                                },
                                {
                                    'internalType': 'uint256',
                                    'name': 'tokenId',
                                    'type': 'uint256'
                                },
                                {
                                    'internalType': 'bool',
                                    'name': 'isActive',
                                    'type': 'bool'
                                }
                            ],
                            'internalType': 'struct Proposal[]',
                            'name': 'proposals',
                            'type': 'tuple[]'
                        }
                    ],
                    'internalType': 'struct SwapOrder[]',
                    'name': '',
                    'type': 'tuple[]'
                }
            ],
            'stateMutability': 'view',
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'internalType': 'address',
                    'name': 'account',
                    'type': 'address'
                }
            ],
            'name': 'getUserOrders',
            'outputs': [
                {
                    'components': [
                        {
                            'internalType': 'address',
                            'name': 'offerer',
                            'type': 'address'
                        },
                        {
                            'components': [
                                {
                                    'internalType': 'address',
                                    'name': 'collection',
                                    'type': 'address'
                                },
                                {
                                    'internalType': 'uint256',
                                    'name': 'tokenId',
                                    'type': 'uint256'
                                }
                            ],
                            'internalType': 'struct OfferItem',
                            'name': 'offerItem',
                            'type': 'tuple'
                        },
                        {
                            'internalType': 'address',
                            'name': 'considCollection',
                            'type': 'address'
                        },
                        {
                            'internalType': 'bool',
                            'name': 'isActive',
                            'type': 'bool'
                        },
                        {
                            'components': [
                                {
                                    'internalType': 'address',
                                    'name': 'proposer',
                                    'type': 'address'
                                },
                                {
                                    'internalType': 'uint256',
                                    'name': 'tokenId',
                                    'type': 'uint256'
                                },
                                {
                                    'internalType': 'bool',
                                    'name': 'isActive',
                                    'type': 'bool'
                                }
                            ],
                            'internalType': 'struct Proposal[]',
                            'name': 'proposals',
                            'type': 'tuple[]'
                        }
                    ],
                    'internalType': 'struct SwapOrder[]',
                    'name': '',
                    'type': 'tuple[]'
                }
            ],
            'stateMutability': 'view',
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'internalType': 'uint256',
                    'name': 'orderId',
                    'type': 'uint256'
                },
                {
                    'internalType': 'uint256',
                    'name': 'tokenId',
                    'type': 'uint256'
                }
            ],
            'name': 'makeProposal',
            'outputs': [
                {
                    'internalType': 'uint256',
                    'name': 'proposalId',
                    'type': 'uint256'
                }
            ],
            'stateMutability': 'nonpayable',
            'type': 'function'
        },
        {
            'inputs': [],
            'name': 'orderIndex',
            'outputs': [
                {
                    'internalType': 'uint256',
                    'name': '',
                    'type': 'uint256'
                }
            ],
            'stateMutability': 'view',
            'type': 'function'
        },
        {
            'inputs': [],
            'name': 'owner',
            'outputs': [
                {
                    'internalType': 'address',
                    'name': '',
                    'type': 'address'
                }
            ],
            'stateMutability': 'view',
            'type': 'function'
        },
        {
            'inputs': [],
            'name': 'renounceOwnership',
            'outputs': [],
            'stateMutability': 'nonpayable',
            'type': 'function'
        },
        {
            'inputs': [
                {
                    'internalType': 'address',
                    'name': 'newOwner',
                    'type': 'address'
                }
            ],
            'name': 'transferOwnership',
            'outputs': [],
            'stateMutability': 'nonpayable',
            'type': 'function'
        }
    ]