interface Props {
  tx_hash: string;
}

export default function OnSuccessTransaction({ tx_hash }: Props) {
  return (
    <div>
      트랜잭션에 성공하였습니다.
      <br />
      TX_hash
      <br />
      {tx_hash}
    </div>
  );
}
