import process from "node:process";

if (process.env.FEATURE_LIVE_PROVIDER_TESTS === "true") {
  process.stderr.write("LIVE_PROVIDER_ADAPTER_NOT_IMPLEMENTED_IN_E00\n");
  process.exitCode = 2;
} else {
  process.stdout.write(
    "Live-provider tests are disabled; no provider network call was attempted.\n",
  );
}
