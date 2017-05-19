import { request, getUrl } from '../utils/request'

export async function login (data) {
  const response = await request({
    url: getUrl('/login'),
    method: 'post',
    data
  });

  return response
}
