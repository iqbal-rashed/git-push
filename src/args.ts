import prompts, { PromptObject } from "prompts";
import { program } from "commander";

const initArgs = async (): Promise<ResponseObject> => {
    const options = program
        .option("-b, --branch <string>")
        .option("-m, --message <string>")
        .option("--after-conflict")
        .parse()
        .opts();

    const promptsArr: PromptObject<string>[] = [];

    if (!options.branch)
        promptsArr.push({
            type: "text",
            name: "branch",
            message: "Enter branch name:",
        });
    if (!options.message)
        promptsArr.push({
            type: "text",
            name: "message",
            message: "Enter commit message:",
        });

    const response = await prompts(promptsArr,{onCancel:()=>{
        process.exit(1)
    }});
    return Object.assign({}, response, options) as ResponseObject;
};

type ResponseObject = {
    branch: string;
    message: string;
    afterConflict?: boolean;
};

export { ResponseObject };
export default initArgs;
