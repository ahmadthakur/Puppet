module.exports = {
    name: "error",
    async execute(error) {
        console.error(`[Database Status]; Error: ${error}`);
    },
};