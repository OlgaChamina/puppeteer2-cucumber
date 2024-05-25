const { clickElement, putText, getText } = require('./lib/commands.js');
//const { generateName } = require('./lib/util.js');

let page;

beforeEach(async () => {
    page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
    page.close();
});

describe('Lets go to the cinema tests', () => {
    beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('https://qamid.tmweb.ru/client/index.php');
    });

    test('happy path1', async () => {
        await clickElement(page, 'a:nth-child(5)');
        await clickElement(
            page,
            ".movie-seances__time[href='#'][data-seance-id='214']"
        );
        await clickElement(page, 'div:nth-child(10) span:nth-child(10)');
        await clickElement(page, '.acceptin-button');
        const actual = await getText(
            page,
            'body > main:nth-child(2) > section:nth-child(1) > div:nth-child(2) > p:nth-child(8)'
        );
        await expect(actual).toContain('Покажите QR-код');
    });

    test('happy path2', async () => {
        await clickElement(page, 'a:nth-child(7)');
        await clickElement(
            page,
            ".movie-seances__time[href='#'][data-seance-id='190']"
        );
        await clickElement(page, 'div:nth-child(10) span:nth-child(10)');
        await clickElement(page, '.acceptin-button');
        const actual = await getText(page, '.ticket__check-title');
        await expect(actual).toContain('Вы выбрали билеты');
    });
    test('sad path', async () => {
        await clickElement(page, 'a:nth-child(4)');
        await clickElement(
            page,
            ".movie-seances__time[href='#'][data-seance-id='201']"
        );
        await clickElement(page, 'div:nth-child(7) span:nth-child(3)');
        await clickElement(page, '.acceptin-button');
        const actual = await getText(page, '.buying__info-description');
        await expect(actual).toContain('Начало сеанса');
    });
});
