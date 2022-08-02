import QRCode from 'qrcode.react';

interface Props {
  qrvalue: string;
}

export default function KlipQR({ qrvalue }: Props) {
  return (
    <div>
      <QRCode value={qrvalue} size={256} style={{ margin: 'auto' }} />
      <br />
      <br />
      <span className="font-bold ">휴대폰으로 스캔하여 Klip으로 진행해 주세요.</span>
    </div>
  );
}
