import Button from "../generic/Button";
import TextInput from "../generic/TextInput";

// Should move to a shared file. //any
type fetchStatus = "LOADING" | "SUCCESS" | "ERROR";

type InputWithButtonProps = {
  inputValue: string;
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder: string;
  onClick?: () => void;
  buttonText: string;
  fetchStatus?: fetchStatus;
};

export default function InputWithButton({
  inputValue,
  onChange,
  placeholder,
  onClick,
  buttonText,
  fetchStatus,
}: InputWithButtonProps) {
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
