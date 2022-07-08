import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

import { Block } from '~/components/Block';
import Button from '~/components/Button';
import Tabs from '~/components/Tabs';

export default function MyPage() {
  const titles = ['마이 티켓', '거래 내역'];

  return (
    <div className="flex flex-col items-center w-full divide-y-[1px] divide-brand">
      <div className="flex flex-col items-center w-full">
        <Image
          src="/images/defaultProfile.jpeg"
          alt={'프로필 이미지'}
          width={100}
          height={100}
          style={{ borderRadius: '50%' }}
        />
        <Block />
        <h1 className="text-3xl font-bold text-center ">USERNAME</h1>
        <Block />
        <Block />
        <UserInfoLine title={`Klip 주소`} hasCopy={true}>
          0xD466B3aafb86446FFD466B3aafb86446FF
        </UserInfoLine>
        <Block />
        <UserInfoLine title={`전화번호`} hasCopy={false}>
          010-5248-4170
        </UserInfoLine>
        <Block />
        <div className="flex w-full justify-self-end">
          <Button>프로필 수정</Button>
          <Button color="white">로그아웃</Button>
        </div>
        <Block />
      </div>
      <div className="w-full">
        <Block />
        <Tabs titles={titles} color="brand" />
        <Toaster containerStyle={{ top: 300 }} />
      </div>
    </div>
  );
}

const ProfileImage = ({ src }: { src: string }) => {
  return;
};

const UserInfoLine = ({ title, children, hasCopy }: { title: string; children: string; hasCopy: boolean }) => {
  return (
    <div className="flex w-full px-12 ">
      <span className="w-1/3 mr-12 font-bold ">{title}</span>
      <span className="block w-2/3 overflow-hidden text-ellipsis ">{children}</span>
      {hasCopy && <TextCopyButton text={children} />}
    </div>
  );
};

const TextCopyButton = ({ text }: { text: string }) => (
  <button
    onClick={() => {
      navigator.clipboard.writeText(text);
      toast.success('클립보드에 복사되었습니다.');
    }}
    className="absolute right-[48px]"
  >
    <Image src="/images/duplicate.svg" alt="클립보드에 복사" width={24} height={24} />
  </button>
);
