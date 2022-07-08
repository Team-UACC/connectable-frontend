export default function PageLabel({ text, htmlFor }: { text: string; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="block mb-6 text-lg font-bold text-gray-700">
      {text}
    </label>
  );
}
