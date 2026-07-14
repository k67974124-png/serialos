# `@serialos/storage`

This package owns the workspace-scoped `ObjectStorage` port and its S3-compatible adapter.

Production dependencies:

- `@aws-sdk/client-s3` provides object and bucket operations against S3-compatible storage.
- `@aws-sdk/s3-request-presigner` creates short-lived, key-scoped private download URLs.

Both dependencies are pinned to the same release. Provider credentials remain server-only and object keys always pass through the workspace prefix guard.
