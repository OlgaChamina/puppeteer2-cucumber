const puppeteer = require('puppeteer');
const chai = require('chai');
const expect = chai.expect;
const {
    Given,
    When,
    Then,
    Before,
    After,
    setDefaultTimeout
} = require('cucumber');
const { getText, clickElement } = require('../../lib/commands.js');

setDefaultTimeout(60000);
Before(async function () {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1000 });
    const page = await browser.newPage();
    this.browser = browser;
    this.page = page;
});

After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
});

Given('user is on {string} page', { timeout: 50000 }, async function (string) {
    return await this.page.goto(`https://qamid.tmweb.ru${string}`, {
        setTimeout: 20000
    });
});

When(
    'user selected the date, movie and chair and clicked button Acceptin',
    { timeout: 70000 },
    async function () {
        await clickElement(this.page, 'a:nth-child(5)');
        await clickElement(
            this.page,
            ".movie-seances__time[href='#'][data-seance-id='214']"
        );
        await clickElement(this.page, 'div:nth-child(10) span:nth-child(10)');
        return await clickElement(this.page, '.acceptin-button');
    }
);

Then('user sees the line to contain {string}', async function (string) {
    const actual = await getText(
        this.page,
        'body > main:nth-child(2) > section:nth-child(1) > div:nth-child(2) > p:nth-child(8)'
    );
    const expected = await string;
    expect(actual).contains(expected);
});

When(
    'user selected the date, movie and free chair and clicked button Acceptin',
    { timeout: 70000 },
    async function () {
        await clickElement(this.page, 'a:nth-child(7)');
        await clickElement(
            this.page,
            ".movie-seances__time[href='#'][data-seance-id='190']"
        );
        await clickElement(this.page, 'div:nth-child(10) span:nth-child(10)');
        return await clickElement(this.page, '.acceptin-button');
    }
);

Then('user sees the title to contain {string}', async function (string) {
    const actual = await getText(this.page, '.ticket__check-title');
    const expected = await string;
    expect(actual).contains(expected);
});

When(
    'user selected the date, movie and buying chair and trying to click on button Acceptin',
    { timeout: 70000 },
    async function () {
        await clickElement(this.page, 'a:nth-child(2)');
        await clickElement(
            this.page,
            ".movie-seances__time[href='#'][data-seance-id='217']"
        );
        await clickElement(
            this.page,
            '.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken'
        );
        return await clickElement(this.page, '.acceptin-button');
    }
);

Then('user sees that the button {string} is disabled', async function (string) {
    const actual = await this.page.$eval('button.acceptin-button', (link) =>
        link.getAttribute('disabled')
    );
    const actualText = await getText(this.page, 'button.acceptin-button');
    expect(actual).contain('true');
    expect(actualText).contain(string);

    //expect(actual).toEqual('true');
});
