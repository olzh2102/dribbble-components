import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    console.log('REQUEST:', req.headers);
    const roomId = req.headers.referer?.split('/').at(-1);
    await handleLogin(req, res, { returnTo: `/qora/${roomId}` });
  },
});
