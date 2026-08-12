function buildDiff(oldText = "", newText = "") {
  const before = oldText.split(/\r?\n/);
  const after = newText.split(/\r?\n/);
  const rows = Array.from({ length: before.length + 1 }, () =>
    Array(after.length + 1).fill(0)
  );

  for (let i = before.length - 1; i >= 0; i -= 1) {
    for (let j = after.length - 1; j >= 0; j -= 1) {
      rows[i][j] =
        before[i] === after[j]
          ? rows[i + 1][j + 1] + 1
          : Math.max(rows[i + 1][j], rows[i][j + 1]);
    }
  }

  const diff = [];
  let i = 0;
  let j = 0;

  while (i < before.length && j < after.length) {
    if (before[i] === after[j]) {
      diff.push({ type: "same", text: before[i] });
      i += 1;
      j += 1;
    } else if (rows[i + 1][j] >= rows[i][j + 1]) {
      diff.push({ type: "removed", text: before[i] });
      i += 1;
    } else {
      diff.push({ type: "added", text: after[j] });
      j += 1;
    }
  }

  while (i < before.length) {
    diff.push({ type: "removed", text: before[i] });
    i += 1;
  }

  while (j < after.length) {
    diff.push({ type: "added", text: after[j] });
    j += 1;
  }

  return diff;
}

function rowTone(type) {
  if (type === "added") return "bg-emerald-50 text-emerald-800";
  if (type === "removed") return "bg-rose-50 text-rose-800";
  return "bg-white text-[#475467]";
}

function prefix(type) {
  if (type === "added") return "+";
  if (type === "removed") return "-";
  return " ";
}

export default function LegalDocumentDiff({ publishedHtml = "", draftHtml = "" }) {
  const diff = buildDiff(publishedHtml, draftHtml);

  return (
    <section className="rounded-[28px] border border-[var(--adm-line)] bg-white p-6 shadow-[0px_14px_40px_rgba(10,27,40,0.05)]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#CC8640]">Diff View</p>
        <h3 className="mt-2 text-2xl font-bold text-[var(--adm-ink)]">Draft vs published</h3>
        <p className="mt-2 text-[13px] text-[var(--adm-ink-muted)]">
          Added lines are green, removed lines are red. This compares raw HTML content.
        </p>
      </div>

      <div className="mt-5 max-h-[520px] overflow-auto rounded-2xl border border-[var(--adm-line)] bg-[var(--adm-surface-sunken)]">
        <pre className="min-w-full text-xs leading-6">
          {diff.map((line, index) => (
            <div key={`${line.type}-${index}`} className={`grid grid-cols-[30px_1fr] gap-0 px-4 py-0.5 ${rowTone(line.type)}`}>
              <span className="select-none pr-3 text-right text-[#98A2B3]">{prefix(line.type)}</span>
              <code className="whitespace-pre-wrap break-words">{line.text || " "}</code>
            </div>
          ))}
        </pre>
      </div>
    </section>
  );
}
