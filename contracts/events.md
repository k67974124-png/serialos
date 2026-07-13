# Domain Events

所有内部事件写入 outbox。Payload 不包含大段用户正文，只包含资源 ID、版本和最小状态。

## Envelope

```json
{
  "eventId": "uuid",
  "eventType": "material.ready",
  "occurredAt": "2026-07-12T12:00:00Z",
  "workspaceId": "uuid",
  "actor": {
    "type": "user|system",
    "id": "uuid|null"
  },
  "aggregate": {
    "type": "material",
    "id": "uuid",
    "version": 3
  },
  "payloadVersion": 1,
  "payload": {}
}
```

## Events

### workspace.created

Payload：locale、timezone、ownerId。

### onboarding.completed

Payload：profileVersion、columnIds。

### material.created

Payload：materialId、type、privacy、blobId 可选。

### material.processing_requested

Payload：materialId、materialVersionId、fromStep、dedupeKey。

### material.ready

Payload：materialId、materialVersionId、assetCount、warningsCount。

### material.failed

Payload：materialId、step、errorCode、retryable。

### assets.extracted

Payload：materialId、assetIds、needsReviewCount。

### profile.suggestion_ready

Payload：profileId、version、confidence。

### topic_session.requested

Payload：sessionId、columnId、configHash。

### topic_session.completed

Payload：sessionId、candidateIds、cost。

### topic.selected

Payload：candidateId、contentRunId。

### content_run.started

Payload：runId、configHash、budget。

### content_run.needs_input

Payload：runId、questionIds。

### content_run.step_completed

Payload：runId、step、outputRefs、cost。

### content_run.review_ready

Payload：runId、reviewRunId、blockerCount、warningCount。

### content_run.approved

Payload：runId、approvalId、versionSetHash。

### approval.invalidated

Payload：runId、approvalId、reason、changedResourceId。

### artifact.built

Payload：artifactId、buildId、checksum。

### export.ready

Payload：exportId、format、expiresAt、checksum。

### publishing_record.created

Payload：publishingRecordId、contentAssetVersionId、platform。

### metrics.recorded

Payload：publishingRecordId、snapshotId、metricKeys。

### workspace.deletion_requested

Payload：deletionId、requestedBy。

### workspace.deleted

Payload：deletionId、completedAt、retainedAuditRecordCount。
