interface StatusMessageProps {
  message: string;
  tone?: "default" | "error" | "warning";
}

const toneClasses = {
  default: "border-slate-700 bg-[#11131b] text-slate-200",
  error: "border-red-200 bg-red-50 text-red-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
};

function StatusMessage({
  message,
  tone = "default",
}: StatusMessageProps) {
  return (
    <div className={`rounded-3xl border p-6 ${toneClasses[tone]}`}>
      <p className="text-lg font-semibold">{message}</p>
    </div>
  );
}

export default StatusMessage;
