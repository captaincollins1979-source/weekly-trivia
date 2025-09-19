

<div className="bg-white rounded-2xl shadow p-6">
<h4 className="text-sm font-semibold">Your Monthly Total</h4>
<MonthlyTotal user={user} />
<a
className="mt-3 inline-block text-xs underline opacity-70"
href="#"
onClick={(e) => {
e.preventDefault();
const k = keyForMonthTotal(user);
localStorage.removeItem(k);
window.location.reload();
}}
>
Reset my local total
</a>
</div>
</div>


{/* Admin tools */}
{isAdmin && <AdminPanel />}


<style>{`
@keyframes shrink { from { transform: translateX(0); width: 100%; } to { transform: translateX(-100%); width: 0%; } }
`}</style>
</div>
);
}


function MonthlyTotal({ user }) {
const [total, setTotal] = useState(0);
useEffect(() => {
const k = keyForMonthTotal(user);
setTotal(Number(localStorage.getItem(k) || 0));
}, [user]);
return (
<div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-lg tabular-nums">
{total} / 400
<div className="text-xs text-slate-500 mt-1">(Max 4 weeks × 100)</div>
</div>
);
}


function AdminPanel() {
const [text, setText] = useState("");
const [choices, setChoices] = useState(["", "", "", ""
]);
const [correctIndex, setCorrectIndex] = useState(0);
const [week, setWeek] = useState(new Date().toISOString().slice(0, 10));
const [id, setId] = useState("QNEW");


const qObj = { id, text, choices, correctIndex };
const url = `${window.location.pathname}?week=${encodeURIComponent(week)}&id=${encodeURIComponent(id)}&q=${encodeURIComponent(JSON.stringify(qObj))}`;


return (
<div className="w-full max-w-3xl bg-white rounded-2xl shadow p-6 mt-6">
<h3 className="text-base font-semibold mb-4">Admin: Compose a Question</h3>
<div className="grid gap-3">
<label className="text-sm">Question
<textarea className="mt-1 w-full border rounded-lg p-2" rows={3} value={text} onChange={(e) => setText(e.target.value)} />
</label>
<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
{choices.map((c, i) => (
<label key={i} className="text-sm">Choice {i + 1}
<input className="mt-1 w-full border rounded-lg p-2" value={c} onChange={(e) => setChoices((prev) => prev.map((x, idx) => (idx === i ? e.target.value : x)))} />
</label>
))}
</div>
<label className="text-sm">Correct Choice Index (0‑3)
<input type="number" min={0} max={3} className="mt-1 w-24 border rounded-lg p-2" value={correctIndex} onChange={(e) => setCorrectIndex(Number(e.target.value))} />
</label>
<div className="grid grid-cols-1 md:grid-cols-3 gap-2">
<label className="text-sm">Week
<input className="mt-1 w-full border rounded-lg p-2" value={week} onChange={(e) => setWeek(e.target.value)} />
</label>
<label className="text-sm">Question ID
<input className="mt-1 w-full border rounded-lg p-2" value={id} onChange={(e) => setId(e.target.value)} />
</label>
<div className="text-sm">
<div className="opacity-70">Preview Link</div>
<a className="inline-block mt-1 underline break-all" href={url}>Open</a>
</div>
</div>
<div className="text-xs text-slate-500">For production, store and serve questions from your database instead of query params.</div>
</div>
</div>
);
}
