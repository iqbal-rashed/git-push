import { exec, ExecException } from "child_process";
import ora from "ora";
import { ResponseObject } from "./args";
import { promisify } from "util";

const performCommand = async (obj: ResponseObject) => {
    const spinner = ora("Loading ....").start();
    try {
        if (!obj.afterConflict) {
            for (const iterator of commandArr(obj)) {
                spinner.text = iterator.message;
                await asyncExec(iterator.cmd);
            }
        } else {
            for (const iterator of conflictCmdArr(obj)) {
                spinner.text = iterator.message;
                await asyncExec(iterator.cmd);
            }
        }
        spinner.succeed("Merge request sent successfully");
    } catch (err: any) {
        spinner.fail(err.stderr);
    }
};

const asyncExec = promisify(exec);

const commandArr = (obj: ResponseObject) => [
    {
        cmd: `git checkout -b ${obj.branch}`,
        message: "Loading branch creating ...",
    },
    {
        cmd: `git add .`,
        message: "Loading adding ...",
    },
    {
        cmd: `git commit -m "${obj.message}"`,
        message: "Loading committing ...",
    },
    {
        cmd: `git checkout main`,
        message: "Loading main branch  ...",
    },
    {
        cmd: `git pull`,
        message: "Loading pulling  ...",
    },
    {
        cmd: `git merge ${obj.branch}`,
        message: `Loading merging ${obj.branch} ...`,
    },
    {
        cmd: `git checkout ${obj.branch}`,
        message: `Loading ${obj.branch} branch ...`,
    },
    {
        cmd: `git merge main`,
        message: "Loading merging main ...",
    },
    {
        cmd: `git push --set-upstream origin ${obj.branch}`,
        message: `Loading pushing ${obj.branch} branch`,
    },
    {
        cmd: "git checkout main",
        message: `Loading main branch`,
    },
];

const conflictCmdArr = (obj: ResponseObject) => [
    {
        cmd: `git add .`,
        message: "Loading adding ...",
    },
    {
        cmd: `git commit -m "${obj.message}"`,
        message: "Loading committing ...",
    },
    {
        cmd: `git checkout ${obj.branch}`,
        message: `Loading ${obj.branch} branch ...`,
    },
    {
        cmd: `git merge main`,
        message: "Loading merging main ...",
    },
    {
        cmd: `git push --set-upstream origin ${obj.branch}`,
        message: `Loading pushing ${obj.branch} branch`,
    },
    {
        cmd: "git checkout main",
        message: `Loading main branch`,
    },
];

export default performCommand;
