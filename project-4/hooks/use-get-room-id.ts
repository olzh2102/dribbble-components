import { useRouter } from 'next/router';

const useGetRoomId = () => {
  const router = useRouter();
  const { roomId } = router.query as { roomId: string };
  return roomId;
};

export default useGetRoomId;
