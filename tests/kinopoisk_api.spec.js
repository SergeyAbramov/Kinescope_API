import { test, expect } from '@playwright/test';

test.describe('@api_test My_kinopoisk API test suit', async () => {
    test('1. @film_by_id That the user is able to get the access to the API with valid credentials and GET the Matrix film ID', async ({ request }) => {

        const response = await request.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', {
            headers: {
                ['X-API-KEY']: 'ed1a7bd0-483c-4bbc-8507-1d97271b54c0',
                ['Content-Type']: 'application/json',
            }
        })
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.kinopoiskId).toBe(301);
        expect(responseBody.nameRu).toBe('Матрица');
        expect(responseBody.nameOriginal).toBe('The Matrix');
        expect(responseBody.reviewsCount).toBe(315);
        expect(responseBody.shortDescription).toBe('Хакер Нео узнает, что его мир — виртуальный. Выдающийся экшен, доказавший, что зрелищное кино может быть умным');

    })

    test('2. @film_budget_by_id That the user is able to get the film budget by ID', async ({ request }) => {

        const response = await request.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/301/box_office', {
            headers: {
                ['X-API-KEY']: 'ed1a7bd0-483c-4bbc-8507-1d97271b54c0',
                ['Content-Type']: 'application/json',
            }
        })
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.total).toBe(4);
        expect(responseBody.items[0].type).toBe('BUDGET');
        expect(responseBody.items[0].amount).toBe(63000000);
        expect(responseBody.items[0, 1, 2, 3].symbol).toBe('$');
        expect(responseBody.items[1].type).toBe('MARKETING');
        expect(responseBody.items[2].type).toBe('USA');
        expect(responseBody.items[2].amount).toBe(171479930);
        expect(responseBody.items[3].type).toBe('WORLD');
        expect(responseBody.items[3].amount).toBe(463517383);

    })

    test('3. @film_awards_by_id That the user is able to get the film awards by ID', async ({ request }) => {

        const response = await request.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/301/awards', {
            headers: {
                ['X-API-KEY']: 'ed1a7bd0-483c-4bbc-8507-1d97271b54c0',
                ['Content-Type']: 'application/json',
            }
        })
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.total).toBe(24);
        expect(responseBody.items[0].name).toBe('Оскар');
        expect(responseBody.items[0].win).toBe(true);
        expect(responseBody.items[0].year).toBe(2000);
        expect(responseBody.items[23].name).toBe('Премия канала «MTV»');
        expect(responseBody.items[23].win).toBe(false);
        expect(responseBody.items[23].nominationName).toBe('Лучшая экшн-сцена');
        expect(responseBody.items[23].year).toBe(2000);

    })

    test('4. @actors_search_by_id That the user is able to get the info about actor by ID', async ({ request }) => {

        const response = await request.get('https://kinopoiskapiunofficial.tech/api/v1/staff/356', {
            headers: {
                ['X-API-KEY']: 'ed1a7bd0-483c-4bbc-8507-1d97271b54c0',
                ['Content-Type']: 'application/json',
            },
        })
        const responseBody = JSON.parse(await response.text());

        expect(response.status()).toBe(200);
        expect(responseBody.personId).toBe(356);
        expect(responseBody.nameEn).toBe('Phil Hawn');
        expect(responseBody.sex).toBe('MALE');
        expect(responseBody.age).toBe(66);
        expect(responseBody.films[0].filmId).toBe(554);
        expect(responseBody.films[0].nameEn).toBe("The Man Who Wasn't There"
        );
        expect(responseBody.films[0].rating).toBe("7.6");
        expect(responseBody.films[7].filmId).toBe(435);
        expect(responseBody.films[7].nameEn).toBe('The Green Mile');

    })

    test('5. @negative Test that the 401 status is shown if the token is wrong or empty', async ({ request }) => {

        const response = await request.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/301/videos', {
            headers: {
                ['X-API-KEY']: '',
                ['Content-Type']: 'application/json',
            },
        })
        const responseBody = JSON.parse(await response.text());
        expect(response.status()).toBe(401);
        expect(responseBody).toBeTruthy();
        expect(responseBody.message).toBe("You don't have permissions. See https://kinopoiskapiunofficial.tech")

    })
    test('6. @actors_search_by_name That the user is able to get the info about actor by name', async ({ request }) => {

        const response = await request.get('https://kinopoiskapiunofficial.tech/api/v1/persons', {
            headers: {
                ['X-API-KEY']: 'ed1a7bd0-483c-4bbc-8507-1d97271b54c0',
                ['Content-Type']: 'application/json',
            },
            params: {
                ['name']: 'Phil Hawn'
            },
        })
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.total).toBe(1);
        expect(responseBody.items[0].kinopoiskId).toBe(356);
        expect(responseBody.items[0].nameRu).toBe('Фил Хоун');
        expect(responseBody.items[0].sex).toBe('MALE');

        //console.log(responseBody);
    })
})