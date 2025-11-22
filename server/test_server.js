try {
    console.log("Loading Operation Model...");
    require('./src/models/Operation');
    console.log("Loading Stock Model...");
    require('./src/models/Stock');
    console.log("Loading Ledger Model...");
    require('./src/models/Ledger');
    console.log("Loading Product Model...");
    require('./src/models/Product');
    console.log("Loading Warehouse Model...");
    require('./src/models/Warehouse');
    console.log("Loading Location Model...");
    require('./src/models/Location');

    console.log("Loading Operation Controller...");
    require('./src/controllers/operationController');
    console.log("Loading Warehouse Controller...");
    require('./src/controllers/warehouseController');
    console.log("Loading Location Controller...");
    require('./src/controllers/locationController');

    console.log("All modules loaded successfully.");
} catch (error) {
    console.error("Error loading module:", error);
}
