interface Props {
  text: string;
  htmlFor?: string;
}

export default function PageLabel({ text, htmlFor }: Props) {
  return (
    <label htmlFor={htmlFor} className="block mb-6 text-lg font-bold text-gray-700">
      {text}
    </label>
  );
}
