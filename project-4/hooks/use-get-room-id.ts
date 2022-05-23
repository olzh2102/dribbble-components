import { useRouter } from 'next/router';

const useGetRoomId = () => {
  const router = useRouter();
  const { chamberId: roomId } = router.query as { chamberId: string };
  return roomId;
};

export default useGetRoomId;
