import { rest } from 'msw';

import { URL_COUNTRIES } from '../../constants';

export const handlers = [
    rest.get(
        'https://countriesnow.space/api/v0.1/countries/info',
        (req, res, ctx) =>
            res(
                ctx.status(200),
                ctx.json([
                    {
                        dialCode: '7',
                        flag: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg',
                        name: 'Kazakhstan',
                    },
                    {
                        dialCode: '375',
                        flag: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Flag_of_Belarus.svg',
                        name: 'Belarus'
                    },
                    {
                        dialCode: '49',
                        flag: 'https://upload.wikimedia.org/wikipedia/en/b/ba/Flag_of_Germany.svg',
                        name: 'Germany'
                    }
                ])
            )
    )
]