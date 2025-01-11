import { type BunPlugin } from "bun";

export const VanillaCssPlugin: BunPlugin = {
    name: "VanillaCss",

    setup(build) {
        build.onStart(() => {
            console.log("Bundle started!");
        });
    },
};

