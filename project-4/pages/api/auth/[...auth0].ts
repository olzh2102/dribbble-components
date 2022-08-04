import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    // const roomId = req.headers.referer?.split('/').at(-1)
    await handleLogin(req, res, { returnTo: '/' });
  },
});
