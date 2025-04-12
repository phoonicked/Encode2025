// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LeaseMarketplace {
    constructor() payable {} 
    // Constant for the number of seconds in an hour.
    uint256 public constant SECONDS_PER_HOUR = 3600;

    // An asset is registered with an owner and an hourly rate.
    // The hourly rate should be provided as an Ether amount—for example, 0.01 ether.
    struct Asset {
        address owner;
        uint256 hourlyRate; // In wei, but provided as an ether literal (e.g. 0.01 ether)
    }
    
    // Lease details: who is leasing, when it started, how long, and whether it’s active.
    struct Lease {
        address buyer;
        uint256 leaseStart;
        uint256 leaseDuration; // In seconds
        bool active;
    }
    
    // Asset registry: asset ID to asset information.
    mapping(uint256 => Asset) public assets;
    // Active lease details for each asset.
    mapping(uint256 => Lease) public leases;
    // Pending withdrawal amounts (earnings) for each owner.
    mapping(address => uint256) public pendingWithdrawals;
    
    // Events for off-chain logging.
    event AssetRegistered(uint256 indexed assetId, address indexed owner, uint256 hourlyRate);
    event AssetLeased(
        uint256 indexed assetId,
        address indexed buyer,
        uint256 leaseStart,
        uint256 leaseDuration,
        uint256 price
    );
    event LeaseEnded(uint256 indexed assetId);
    
    /// @notice Register an asset for leasing.
    /// @param assetId A unique identifier for the asset.
    /// @param hourlyRate The leasing rate in ether per hour (e.g., 0.01 ether).
    function registerAsset(uint256 assetId, uint256 hourlyRate) external {
        require(assets[assetId].owner == address(0), "Asset already registered");
        assets[assetId] = Asset({
            owner: address(this),
            hourlyRate: hourlyRate   // Use ether literal, e.g., 0.01 ether.
        });
        emit AssetRegistered(assetId, address(this), hourlyRate);
    }
    
    /// @notice Calculate the lease price for an asset given a duration.
    /// @param assetId The unique identifier of the asset.
    /// @param duration Lease duration in seconds.
    /// @return The required payment in wei.
    /// 
    /// Calculation: requiredPayment = (hourlyRate * duration) / SECONDS_PER_HOUR.
    function getLeasePrice(uint256 assetId, uint256 duration) public view returns (uint256) {
        Asset memory asset = assets[assetId];
        require(asset.owner != address(0), "Asset not registered");
        return (asset.hourlyRate * duration) / SECONDS_PER_HOUR;
    }
    
    /// @notice Lease an asset for a given duration.
    /// @param assetId The unique identifier of the asset to lease.
    /// @param duration Lease duration in seconds.
    /// The caller must send at least the required Ether (using the value field).
    function leaseAsset(uint256 assetId, uint256 duration) external payable {
        Asset memory asset = assets[assetId];
        require(asset.owner != address(0), "Asset not registered");
        
        Lease storage lease = leases[assetId];
        // If the asset is currently leased, check that the previous lease has expired.
        if (lease.active) {
            require(block.timestamp >= lease.leaseStart + lease.leaseDuration, "Asset is currently leased");
        }
        
        // Calculate the required payment.
        uint256 requiredPayment = getLeasePrice(assetId, duration);
        require(msg.value >= requiredPayment, "Insufficient payment for lease duration");
        
        // Record the lease details.
        lease.buyer = msg.sender;
        lease.leaseStart = block.timestamp;
        lease.leaseDuration = duration;
        lease.active = true;
        
        // Credit the asset owner's pending withdrawal.
        pendingWithdrawals[asset.owner] += requiredPayment;
        
        emit AssetLeased(assetId, msg.sender, block.timestamp, duration, requiredPayment);
        
        // Refund any overpayment.
        if (msg.value > requiredPayment) {
            payable(msg.sender).transfer(msg.value - requiredPayment);
        }
    }
    
    /// @notice End a lease if its period has expired.
    /// @param assetId The asset whose lease you wish to end.
    function endLease(uint256 assetId) external {
        Lease storage lease = leases[assetId];
        require(lease.active, "No active lease");
        require(block.timestamp >= lease.leaseStart + lease.leaseDuration, "Lease period not yet expired");
        lease.active = false;
        emit LeaseEnded(assetId);
    }
    
    /// @notice Allow asset owners to withdraw their earnings.
    function withdraw() external {
        uint256 amount = pendingWithdrawals[msg.sender];
        require(amount > 0, "No funds available");
        pendingWithdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    // Fallback functions to accept Ether.
    receive() external payable {}
    fallback() external payable {}
}