# AI output schema registry

AI output schemas use immutable `<schema-id>@<semver>` identities plus a SHA-256 content hash. Every provider output must pass the referenced runtime schema before application use.

E00 contains only the registry convention and test schemas. Feature-owned schemas arrive with their owning Epic.
