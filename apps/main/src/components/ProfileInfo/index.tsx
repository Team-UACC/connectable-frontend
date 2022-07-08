import Image from 'next/image';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { Block } from '~/components/Block';
import Button from '~/components/Button';
import { useModalStore } from '~/stores/modal';
import { useUserStore } from '~/stores/user';

import ProfileEditForm from './ProfileEditForm';

export default function ProfileInfo() {
  const { userName, klaytnAddress, phoneNumber } = useUserStore();
  const { showModal } = useModalStore();

  return (
    <div className="flex flex-col items-center w-full">
      <Image
        src="/images/defaultProfile.jpeg"
        alt={'프로필 이미지'}
        width={100}
        height={100}
        style={{ borderRadius: '50%' }}
      />
      <Block />
      <h1 className="text-3xl font-bold text-center ">{userName}</h1>
      <Block />
      <Block />
      <UserInfoLine title={`Klip 주소`} hasCopy={true}>
        {klaytnAddress}
      </UserInfoLine>
      <Block />
      <UserInfoLine title={`전화번호`} hasCopy={false}>
        {phoneNumber}
      </UserInfoLine>
      <Block />
      <div className="flex w-full justify-self-end">
        <Button
          onClick={() => showModal('프로필 수정', <ProfileEditForm userName={userName} phoneNumber={phoneNumber} />)}
        >
          프로필 수정
        </Button>
        <Button color="white">로그아웃</Button>
      </div>
      <Block />
    </div>
  );
}

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
      toast.success('Klip 주소가 클립보드에 복사되었습니다.');
    }}
    className="absolute right-[48px]"
  >
    <Image src="/images/duplicate.svg" alt="클립보드에 복사" width={24} height={24} />
  </button>
);
