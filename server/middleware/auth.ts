import { verifyToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token');
  if (token) {
    const payload = verifyToken(token);
    if (payload) {
      event.context.user = payload;
    }
  }
});
