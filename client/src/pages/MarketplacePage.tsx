export default function MarketplacePage() {
  return (
    <div className="rounded-2xl border border-neutral-900 bg-neutral-950/60 p-4">
      <div className="text-lg font-semibold">Marketplace</div>
      <div className="mt-2 text-sm text-neutral-400">
        Здесь будет витрина услуг/заказов: сварка, монтаж, аренда техники и т.д.
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {[
          { title: "Spawanie / Montaż konstrukcji", price: "od 60 zł/h" },
          { title: "Wynajem sprzętu / transport", price: "od 150 zł" },
          { title: "Brygada 6 osób — delegacje", price: "zapytaj" },
          { title: "Nadzór / koordynacja", price: "zapytaj" },
        ].map((p) => (
          <button
            key={p.title}
            className="rounded-2xl border border-neutral-900 bg-neutral-950/40 p-4 text-left hover:bg-neutral-900/60"
          >
            <div className="font-medium">{p.title}</div>
            <div className="mt-1 text-sm text-neutral-400">{p.price}</div>
            <div className="mt-3 inline-block rounded-xl bg-neutral-900 px-3 py-1 text-xs">
              Open
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
