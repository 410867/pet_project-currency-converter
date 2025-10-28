import HeaderRates from "./components/HeaderRates";
import BiConverter from "./components/BiConverter";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-slate-50">
      <HeaderRates />
      <main className="mx-auto max-w-5xl p-4 md:p-8">
        <BiConverter />
      </main>
    </div>
  );
}
