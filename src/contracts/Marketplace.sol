pragma solidity ^0.5.0;

contract Marketplace {
    string public name;
    uint public productCount = 0;
    uint public farmerCount = 0;
    uint public qtCount = 0;
    mapping(uint => Product) public products;
    mapping(uint => Farmer) public farmers;
    mapping(uint => QTesting) public qtestings;

    struct Farmer {
        uint id;
        string name;
        string city;
        uint phone;
    }

    struct QTesting {
        uint id;
        string name;
        string city;
    }

    struct Product {
        uint id;
        uint farmerID;
        string name;
        string city;
        uint price;
        address payable owner;
        bool purchased;
        bool approved;
    }

    event FarmerRegisterd (
        uint id,
        string name,
        string city,
        uint phone
    );

    event QTestingRegisterd (
        uint id,
        string name,
        string city
    );

    event ProductCreated(
        uint id,
        uint farmerID,
        string name,
        string city,
        uint price,
        address payable owner,
        bool purchased,
        bool approved
    );

    event ProductPurchased(
        uint id,
        uint farmerID,
        string name,
        string city,
        uint price,
        address payable owner,
        bool purchased,
        bool approved
    );
    
    event ProductApproved(
        uint id,
        uint farmerID,
        string name,
        string city,
        uint price,
        address payable owner,
        bool purchased,
        bool approved
    );

    constructor() public {
        name = "Farmer Marketplace";
    }

    function farmerRegister(string memory _name, uint _phone, string memory _city) public {
        require(bytes(_name).length > 0);
        require(bytes(_city).length > 0);
        require(_phone > 0);
        farmerCount ++;
        farmers[farmerCount]=Farmer(farmerCount, _name, _city, _phone);
        emit FarmerRegisterd(farmerCount, _name, _city, _phone);
    }

    function qtestingRegister(string memory _name, string memory _city) public {
        require(bytes(_name).length > 0);
        require(bytes(_city).length > 0);
        qtCount ++;
        qtestings[qtCount]=QTesting(qtCount, _name, _city);
        emit QTestingRegisterd(qtCount, _name, _city);
    }

    function createProduct(uint _farmerid, string memory _name, uint _price, string memory _city) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        require(bytes(_city).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        productCount ++;
        // Create the product
        products[productCount] = Product(productCount, _farmerid, _name, _city, _price, msg.sender, false, false);
        // Trigger an event
        emit ProductCreated(productCount, _farmerid, _name, _city, _price, msg.sender, false, false);
    }

    function qtapproval(uint _id, uint _qtprice) public payable {
        // Fetch the product
        Product memory _product = products[_id];
        // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
        // Marked as Approved
        _product.approved = true;
        // Set price by Quallity tester
        uint _rate = (_qtprice + _product.price)/2;
        _product.price = _rate;
        // Update the product
        products[_id] = _product;
        emit ProductApproved(productCount, _product.farmerID, _product.name, _product.city, _product.price, _product.owner, false, true);
    }

    function purchaseProduct(uint _id) public payable {
            // Fetch the product
        Product memory _product = products[_id];
            // Fetch the owner
        address payable _seller = _product.owner;
            // Make sure the product has a valid id
        require(_product.id > 0 && _product.id <= productCount);
            // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price);
            // Require that the product has not been purchased already
        require(!_product.purchased);
            // Require that the buyer is not the seller
        require(_seller != msg.sender);
            // Transfer ownership to the buyer
        _product.owner = msg.sender;
            // Mark as purchased
        _product.purchased = true;
            // Update the product
        products[_id] = _product;
            // Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);
            // Trigger an event
        emit ProductPurchased(productCount, _product.farmerID, _product.name, _product.city, _product.price, msg.sender, true, true);
    }
}
