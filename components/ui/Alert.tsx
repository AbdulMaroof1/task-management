export default function Alert({ message }: { message: string }) {
  if (!message) return null;

  return (
    <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
      {message}
    </p>
  );
}
