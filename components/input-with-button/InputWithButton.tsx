import Button from "../generic/Button";
import TextInput from "../generic/TextInput";

export default function InputWithButton({
  inputValue,
  onChange,
  placeholder,
  onClick,
  buttonText,
  fetchStatus,
}: {
  inputValue: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
  onClick?: () => void;
  buttonText: string;
  fetchStatus?: "LOADING" | "SUCCESS" | "ERROR";
}) {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
      />
      <Button
        status={fetchStatus === "LOADING" ? fetchStatus : undefined}
        variant="secondary"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </>
  );
}
