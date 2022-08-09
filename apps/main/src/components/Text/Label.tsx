interface Props {
  text: string;
  htmlFor?: string;
}

export default function Label({ text, htmlFor }: Props) {
  return (
    <label htmlFor={htmlFor} className="block text-lg font-bold text-gray-700">
      {text}
    </label>
  );
}
