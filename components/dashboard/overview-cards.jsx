export default function OverviewCards({ totalPosts, publishedPosts, draftPosts }) {
  const cards = [
    {
      label: "Total posts",
      value: totalPosts,
      note: "All articles currently stored in the dashboard.",
    },
    {
      label: "Published",
      value: publishedPosts,
      note: "Visible on the public news pages.",
    },
    {
      label: "Drafts",
      value: draftPosts,
      note: "Saved but not publicly visible yet.",
    },
  ];

  return (
    <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
      {cards.map((card) => (
        <div
          key={card.label}
          className='rounded-[28px] border border-[var(--adm-line)] bg-white p-6 shadow-[0_18px_50px_rgba(10,27,40,0.05)]'
        >
          <p className='text-sm font-semibold uppercase tracking-[0.22em] text-[#CC8640]'>
            {card.label}
          </p>
          <p className='mt-4 text-5xl font-bold text-[var(--adm-ink)]'>{card.value}</p>
          <p className='mt-3 text-sm leading-6 text-[var(--adm-ink-muted)]'>{card.note}</p>
        </div>
      ))}
    </div>
  );
}
