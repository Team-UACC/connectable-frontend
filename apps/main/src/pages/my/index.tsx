import Image from 'next/image';

import { Block } from '~/components/Block';
import Button from '~/components/Button';

export default function MyPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <ProfileImage src="/images/defaultProfile.svg" />
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
      <div className="flex w-full  justify-self-end">
        <Button>프로필 수정</Button>
        <Button color="white">로그아웃</Button>
      </div>
    </div>
  );
}

const ProfileImage = ({ src }: { src: string }) => {
  return (
    <div className="flex flex-col justify-center cursor-pointer h-[100px] w-[100px] rounded-full">
      <Image src={src} alt={'프로필 이미지'} width={100} height={200} />
    </div>
  );
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
    }}
  >
    <Image src="/images/duplicate.svg" alt="클립보드에 복사" width={24} height={24} />
  </button>
);
