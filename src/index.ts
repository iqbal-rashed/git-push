#!/usr/bin/env node

import initArgs from "./args";

(async () => {
    const response = await initArgs();
    console.log(response);
})();
