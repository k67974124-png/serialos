import { spawn } from "node:child_process";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

const mode = process.argv[2];
if (mode !== "dev" && mode !== "start") {
  throw new Error("Next process mode must be dev or start");
}

const port = process.env.WEB_PORT ?? "3000";
if (!/^\d{1,5}$/u.test(port) || Number(port) < 1 || Number(port) > 65_535) {
  throw new Error("WEB_PORT must be an integer between 1 and 65535");
}

const nextCli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const hostname = mode === "dev" ? "127.0.0.1" : "0.0.0.0";
const child = spawn(process.execPath, [nextCli, mode, "--hostname", hostname, "--port", port], {
  stdio: "inherit",
  windowsHide: true,
});

let stopping = false;
function forwardSignal(signal) {
  stopping = true;
  child.kill(signal);
}

process.once("SIGINT", () => forwardSignal("SIGINT"));
process.once("SIGTERM", () => forwardSignal("SIGTERM"));
child.once("error", (error) => {
  throw error;
});
child.once("exit", (code) => {
  process.exitCode = code ?? (stopping ? 0 : 1);
});
