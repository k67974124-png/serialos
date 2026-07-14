# Prompt registry

Prompt assets use immutable `<prompt-id>@<semver>` identities plus a SHA-256 content hash. E00 defines the registry convention only: no production prompt or provider invocation is shipped in this Epic.

Prompt IDs use lowercase letters, digits, dots, underscores and hyphens. Publishing a changed prompt requires a new semantic version; an existing ID/version/hash tuple is never overwritten.
