export interface CounterSnapshot {
  readonly labels: Readonly<Record<string, string>>;
  readonly name: string;
  readonly value: number;
}

export interface HistogramSnapshot {
  readonly count: number;
  readonly labels: Readonly<Record<string, string>>;
  readonly max: number;
  readonly min: number;
  readonly name: string;
  readonly sum: number;
}

interface HistogramState {
  count: number;
  max: number;
  min: number;
  sum: number;
}

function assertMetricName(name: string): void {
  if (!/^[a-z][a-z0-9_]{2,99}$/u.test(name)) {
    throw new RangeError("Metric name is invalid");
  }
}

function canonicalLabels(labels: Readonly<Record<string, string>>): {
  readonly key: string;
  readonly labels: Readonly<Record<string, string>>;
} {
  const entries = Object.entries(labels).sort(([left], [right]) => left.localeCompare(right));
  for (const [key, value] of entries) {
    if (!/^[a-z][a-z0-9_]{0,49}$/u.test(key) || !/^[A-Za-z0-9_.:-]{1,128}$/u.test(value)) {
      throw new RangeError("Metric label is invalid");
    }
  }
  return { key: JSON.stringify(entries), labels: Object.freeze(Object.fromEntries(entries)) };
}

export class InMemoryMetricsRegistry {
  readonly #counters = new Map<
    string,
    { labels: Readonly<Record<string, string>>; name: string; value: number }
  >();
  readonly #histograms = new Map<
    string,
    { labels: Readonly<Record<string, string>>; name: string; state: HistogramState }
  >();

  public increment(name: string, amount = 1, labels: Readonly<Record<string, string>> = {}): void {
    assertMetricName(name);
    if (!Number.isFinite(amount) || amount < 0) {
      throw new RangeError("Counter increment is invalid");
    }
    const canonical = canonicalLabels(labels);
    const key = `${name}:${canonical.key}`;
    const current = this.#counters.get(key);
    this.#counters.set(key, {
      labels: canonical.labels,
      name,
      value: (current?.value ?? 0) + amount,
    });
  }

  public observe(name: string, value: number, labels: Readonly<Record<string, string>> = {}): void {
    assertMetricName(name);
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError("Histogram observation is invalid");
    }
    const canonical = canonicalLabels(labels);
    const key = `${name}:${canonical.key}`;
    const current = this.#histograms.get(key);
    const state = current?.state ?? { count: 0, max: value, min: value, sum: 0 };
    this.#histograms.set(key, {
      labels: canonical.labels,
      name,
      state: {
        count: state.count + 1,
        max: Math.max(state.max, value),
        min: Math.min(state.min, value),
        sum: state.sum + value,
      },
    });
  }

  public snapshot(): {
    readonly counters: readonly CounterSnapshot[];
    readonly histograms: readonly HistogramSnapshot[];
  } {
    return {
      counters: [...this.#counters.values()].map((item) => ({ ...item })),
      histograms: [...this.#histograms.values()].map((item) => ({
        ...item.state,
        labels: item.labels,
        name: item.name,
      })),
    };
  }
}
