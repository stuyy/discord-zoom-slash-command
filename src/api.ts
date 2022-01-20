import axios from 'axios';

const { ZOOM_API } = process.env;
const ZOOM_API_URL = 'https://api.zoom.us/v2';

export const createZoomMeeting = (topic: string) =>
  axios.post(
    `${ZOOM_API_URL}/users/me/meetings`,
    {
      topic,
    },
    {
      headers: {
        Authorization: `Bearer ${ZOOM_API}`,
      },
    }
  );
