require("ts-node").register();
require("tsconfig-paths").register();
import debug from "debug";
const log = debug("streaming:test");

// Run all test cases
// require("require-all")({
//   dirname     :  __dirname + "/core",
//   filter      :  /(.+spec)\.ts$/,
//   recursive   : true,
// });

// Run case by case
// require("./core/connection/database-connection.spec");
// require("./core/repositories/customer-repo.spec");
// require("./core/services/customer.service.spec");
// require("./core/handlers/rest-api/auth.handler.spec");
// require("./core/handlers/rest-api/stream.handler.spec");
require("./core/handlers/websocket/connect.spec");
