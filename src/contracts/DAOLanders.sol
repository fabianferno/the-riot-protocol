// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;
import "@openzeppelin/contracts@4.3.2/access/Ownable.sol";

interface IrIOTNFT {
  function nftOwnershipCheck(uint256 _tokenId) external view returns (uint256);

  function nftSwapOwnership(uint256 tokenId1, uint256 tokenId2) external;

  function safeTransferFrom(
    address from,
    address to,
    uint256 tokenId,
    bytes calldata data
  ) external;
}

interface IrIOTMarket {
  function checkListingExpiry(uint256 listingId) external view returns (bool);

  function expireListing(uint256 listingId) external;

  function getNftId(uint256 listingId) external view returns (uint256);

  function getDAOID(uint256 listingId) external view returns (uint256);

  function createListing(uint256 tokenId, uint256 daoID) external;
}

contract rIOT is Ownable {
  IrIOTNFT rIOTNFT;
  IrIOTMarket rIOTMarket;

  constructor(address nftContract, address marketContract) {
    rIOTNFT = IrIOTNFT(nftContract);
    rIOTMarket = IrIOTMarket(marketContract);
  }

  uint256 public currDAOID = 1;
  mapping(uint256 => DAO) DAOdata;
  mapping(address => uint256) userToDAO;
  uint256 public royalties;
  uint256 public constant TRANSFER_MARKET_ROYALTY = 10 * 10**18;
  uint256 public constant DAO_CREATION_ROYALTY = 306 * 10**18;
  uint256 public constant DAO_JOINING_ROYALTY = 15 * 10**18;

  struct Member {
    uint256 joinedAt;
    uint256 investment;
  }

  enum ProposalType {
    BUY,
    SELL
  }

  enum Status {
    SUCCESS,
    ONGOING,
    FAILURE
  }

  struct List {
    uint256 listingId;
    uint256 nftTokenId;
    uint256 daoID;
  }
  struct Proposal {
    ProposalType proposalType;
    List listing;
    uint256 deadline;
    uint8 acceptVotes;
    uint8 rejectVotes;
    mapping(address => bool) votes;
    bool executed;
    Status status;
  }

  struct DAO {
    string name;
    uint256 capital;
    uint256 minInvestment;
    uint256 totalInvestment;
    uint256 createdAt;
    uint256 NFTId;
    mapping(uint256 => Proposal) proposals;
    mapping(address => Member) members;
    uint8 memberCount;
    uint256 proposalCount;
  }

  /*
   *   Events
   */

  event NewMemberInDAO(
    uint256 timestamp,
    uint256 investment,
    address member,
    uint256 DAOId
  );
  event MemberLeftInDAO(
    uint256 timestamp,
    uint256 share,
    address member,
    uint256 DAOId
  );
  event ProposalExecuted(
    uint256 timestamp,
    uint256 proposalId,
    address executedBy,
    uint256 DAOId
  );
  event ProposalCreated(
    uint256 timestamp,
    uint256 proposalId,
    address proposedBy,
    uint256 DAOId
  );
  event ProposalVoted(
    uint256 timestamp,
    uint256 proposalId,
    address voter,
    uint256 DAOId
  );

  function createDAO(string memory _name, uint256 _minInvestment)
    public
    payable
    returns (uint256)
  {
    require(userToDAO[msg.sender] == 0, "USER_ALREADY_IN_A_DAO");
    require(currDAOID <= 1600, "DAO_LIMIT_REACHED");
    require(_minInvestment >= 100 * 10**18, "INADEQUATE_MIN_INVESTMENT_AMOUNT");
    require(
      _minInvestment + DAO_CREATION_ROYALTY <= msg.value,
      "INSUFFICENT_FUNDS_TO_CREATE_DAO"
    );
    require(
      _minInvestment <= 10000 * 10**18,
      "MAX_LIMIT_FOR_MIN_INVESTMENT_EXCEEDED"
    );
    require(bytes(_name).length > 10, "NAME_EXCEEDED_10_CHARACTERS");
    //transfer money to this contract or vault
    DAO storage _dao = DAOdata[currDAOID];
    _dao.name = _name;
    _dao.capital = msg.value - DAO_CREATION_ROYALTY;
    royalties += DAO_CREATION_ROYALTY;
    _dao.minInvestment = _minInvestment;
    _dao.createdAt = block.timestamp;
    _dao.members[msg.sender] = Member(block.timestamp, msg.value);
    _dao.memberCount = 1;
    userToDAO[msg.sender] = currDAOID;
    currDAOID++;

    //Mint NFT
    // If timer runs out NFTs become dead and don't show any functionality

    return currDAOID - 1;
  }

  function joinDAO(uint256 _DAOID) public payable {
    require(userToDAO[msg.sender] == 0, "USER_ALREADY_IN_A_DAO");
    require(
      msg.value >= DAOdata[_DAOID].minInvestment + DAO_JOINING_ROYALTY,
      "INSUFFICENT_FUNDS_TO_JOIN_DAO"
    );
    require(DAOdata[_DAOID].memberCount < 25, "DAO_IS_FULL");
    require(_DAOID <= currDAOID, "INVALID_DAO_ID");

    DAOdata[_DAOID].members[msg.sender] = Member(
      block.timestamp,
      msg.value - DAO_JOINING_ROYALTY
    );
    userToDAO[msg.sender] = _DAOID;
    DAOdata[_DAOID].memberCount++;
    DAOdata[_DAOID].capital += (msg.value - DAO_JOINING_ROYALTY);
    royalties += DAO_JOINING_ROYALTY;

    emit NewMemberInDAO(
      block.timestamp,
      msg.value - DAO_JOINING_ROYALTY,
      msg.sender,
      _DAOID
    );
  }

  function leaveDAO() public {
    require(userToDAO[msg.sender] != 0, "USER_NOT_IN_A_DAO");

    uint256 _DAOID = userToDAO[msg.sender];

    require(
      DAOdata[_DAOID].members[msg.sender].joinedAt + 30 days <= block.timestamp,
      "CANNOT_LEAVE_DAO_WITHIN_A_MONTH"
    );
    require(DAOdata[_DAOID].memberCount > 1, "CANNOT_LEAVE_DAO");
    DAO storage _dao = DAOdata[_DAOID];
    uint256 share = (_dao.members[msg.sender].investment /
      _dao.totalInvestment) * _dao.capital;
    payable(msg.sender).transfer(share);
    userToDAO[msg.sender] = 0;
    _dao.capital -= share;
    _dao.totalInvestment -= share;
    _dao.memberCount--;

    emit MemberLeftInDAO(block.timestamp, share, msg.sender, _DAOID);

    delete _dao.members[msg.sender];
  }

  function depositFunds() public payable {
    require(userToDAO[msg.sender] != 0, "USER_NOT_IN_A_DAO");
    require(msg.value >= 10**18, "DEPOSIT_TOO_LOW");
    DAO storage _dao = DAOdata[userToDAO[msg.sender]];
    _dao.capital += msg.value;
    _dao.totalInvestment += msg.value;
    _dao.members[msg.sender].investment += msg.value;
  }

  function createProposal(uint256 listingId, bool buy) public {
    require(userToDAO[msg.sender] != 0, "USER_NOT_IN_A_DAO");
    //check if the person is in a DAO or not
    uint256 _proposalCount = DAOdata[userToDAO[msg.sender]].proposalCount;
    if (abi.encodePacked(_proposalCount).length != 0) {
      require(
        DAOdata[userToDAO[msg.sender]].proposals[_proposalCount - 1].status !=
          Status.ONGOING,
        "CANNOT_INITIATE_MULTIPLE_PROPOSALS"
      );
      DAOdata[userToDAO[msg.sender]].proposalCount++;
    } else {
      DAOdata[userToDAO[msg.sender]].proposalCount = 1;
    }

    Proposal storage _daoProposal = DAOdata[userToDAO[msg.sender]].proposals[
      _proposalCount
    ];

    //check if the person
    if (buy) {
      _daoProposal.proposalType = ProposalType.BUY;
      _daoProposal.listing.nftTokenId = rIOTMarket.getNftId(listingId);
      _daoProposal.listing.daoID = rIOTMarket.getDAOID(listingId);
      _daoProposal.listing.listingId = listingId;
    } else {
      _daoProposal.proposalType = ProposalType.SELL;
    }
    _daoProposal.acceptVotes = 0;
    _daoProposal.rejectVotes = 0;
    _daoProposal.executed = false;
    _daoProposal.status = Status.ONGOING;
    _daoProposal.deadline = block.timestamp + 2 days;

    emit ProposalCreated(
      block.timestamp,
      DAOdata[userToDAO[msg.sender]].proposalCount,
      msg.sender,
      userToDAO[msg.sender]
    );
  }

  function voteOnProposal(bool YesOrNo) public {
    require(userToDAO[msg.sender] != 0, "USER_NOT_IN_A_DAO");
    DAO storage _dao = DAOdata[userToDAO[msg.sender]];
    Proposal storage _daoProposal = _dao.proposals[_dao.proposalCount];

    require(_daoProposal.status == Status.ONGOING, "PROPOSAL_FINALISED");
    require(_daoProposal.executed == false, "PROPOSAL_EXECUTED");
    require(
      abi.encodePacked(_daoProposal.votes[msg.sender]).length == 0,
      "ALREADY_VOTED"
    );

    _daoProposal.votes[msg.sender] = YesOrNo;
    if (YesOrNo) _daoProposal.acceptVotes++;
    else _daoProposal.rejectVotes++;

    if (
      _daoProposal.acceptVotes + _daoProposal.rejectVotes ==
      DAOdata[userToDAO[msg.sender]].memberCount
    ) {
      _daoProposal.deadline = block.timestamp;
    }

    emit ProposalVoted(
      block.timestamp,
      _dao.proposalCount,
      msg.sender,
      userToDAO[msg.sender]
    );
  }

  function executeProposal() public {
    require(userToDAO[msg.sender] != 0, "USER_NOT_IN_A_DAO");

    DAO storage _dao = DAOdata[userToDAO[msg.sender]];
    Proposal storage _daoProposal = _dao.proposals[_dao.proposalCount];
    require(_daoProposal.deadline < block.timestamp, "VOTING_IN_PROGRESS");
    require(_daoProposal.executed == false, "PROPOSAL_ALREADY_EXECUTED");
    if (_daoProposal.proposalType == ProposalType.BUY) {
      if (_daoProposal.acceptVotes > _daoProposal.rejectVotes) {
        // IF the nft is sold already, change status to failure else success
        if (rIOTMarket.checkListingExpiry(_daoProposal.listing.listingId)) {
          //Swapping in NFT contract
          rIOTNFT.nftSwapOwnership(
            DAOdata[_daoProposal.listing.daoID].NFTId,
            _dao.NFTId
          );
          //Swapping
          uint256 tempNFTID = DAOdata[_daoProposal.listing.daoID].NFTId;
          DAOdata[_daoProposal.listing.daoID].NFTId = _dao.NFTId;
          _dao.NFTId = tempNFTID;

          _daoProposal.status = Status.SUCCESS;
          rIOTMarket.expireListing(_daoProposal.listing.listingId);
        } else {
          _daoProposal.status = Status.FAILURE;
          //emit event
        }
        _daoProposal.executed = true;
      } else {
        _daoProposal.status = Status.FAILURE;
        _daoProposal.executed = true;
      }
    } else {
      rIOTMarket.createListing(_dao.NFTId, userToDAO[msg.sender]);
    }
    emit ProposalExecuted(
      block.timestamp,
      _dao.proposalCount,
      msg.sender,
      userToDAO[msg.sender]
    );
  }

  function withdraw() public onlyOwner {
    payable(msg.sender).transfer(royalties);
  }

  function onERC1155Received(
    address operator,
    address from,
    uint256 tokenId,
    bytes memory
  ) public returns (bytes4) {
    uint256 _daoID = rIOTNFT.nftOwnershipCheck(tokenId);
    DAOdata[_daoID].NFTId = tokenId;
    return this.onERC1155Received.selector;
  }
}
