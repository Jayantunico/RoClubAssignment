import NewBooking from "./components/new_booking/view/NewBooking";

export default function Login() {
  return (
    <div className="flex-1 grid place-items-center p-8 pb-20 overflow-hidden">
      <main className="flex flex-col gap-[32px] items-center sm:items-start w-full max-w-md">
        <NewBooking />
      </main>
    </div>
  );
}
