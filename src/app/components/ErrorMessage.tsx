interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return <p className="text-red-500 mt-4 text-center">{message}</p>;
}
