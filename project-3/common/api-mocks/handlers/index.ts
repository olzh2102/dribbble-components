import { rest } from 'msw';

import { CURRENT_WEATHER_URL, ONECALL_WEATHER_URL } from '@common/constants';

export const handlers = [
  rest.get(CURRENT_WEATHER_URL, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        coord: {
          lat: 51,
          lon: 71,
        },
      })
    )
  ),
  rest.get(ONECALL_WEATHER_URL, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        current: {
          temp: 22,
          humidity: 75,
        },
        hourly: [
          {
            temp: 25,
            humidity: 70,
          },
          {
            temp: 22,
            humidity: 75,
          },
          {
            temp: 20,
            humidity: 74,
          },
        ],
        lat: 51,
        lon: 71,
        timezone: 'Asia/Almaty',
        timezone_offset: 21600,
      })
    )
  ),
];
