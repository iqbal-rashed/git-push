#!/usr/bin/env node

import initArgs from "./args";
import performCommand from "./command";

(async () => {
    const response = await initArgs();
    await performCommand(response);
})();
