import { UserProfile } from '@auth0/nextjs-auth0';

const VideoPlug = ({ user }: { user: UserProfile }) => {
  return (
    <div className="w-96 aspect-video relative">
      <img
        className="rounded-[12px] absolute top-0 left-0 w-full h-full object-cover"
        src={user.picture || ''}
        alt={user.name || 'username'}
      />
      <div className="rounded-[12px] bg-black/10 border border-white/20 backdrop-blur-2xl absolute top-0 left-0 w-full h-full" />
      <img
        className="rounded-full absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
        src={user.picture || ''}
        alt={user.name || 'username'}
      />
    </div>
  );
};

export default VideoPlug;
