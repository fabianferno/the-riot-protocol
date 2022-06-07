import { useMoralis, useNativeBalance } from "react-moralis";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account, isAuthenticated } = useMoralis();

  if (!account || !isAuthenticated) return null;

  return (
    <div
      className="mx-3 fw-bold"
      style={{
        textAlign: "center",
        whiteSpace: "nowrap",
        color: "#000",
      }}
    >
      {balance.formatted}
    </div>
  );
}

export default NativeBalance;
