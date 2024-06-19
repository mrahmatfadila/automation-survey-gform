const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Path to your CSV file
const csvFilePath = path.resolve(__dirname, 'd:/Belajar/PROJECT/Auto-Google-Form-main/Auto-Google-Form-main/data.csv');

async function fillForm() {
    let results = [];

    // Read CSV file
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            let driver = await new Builder()
                .forBrowser('chrome')
                .setChromeOptions(new chrome.Options().addArguments('--start-maximized'))
                .build();

            try {
                for (let i = 0; i < results.length; i++) {
                    let { name, usia, jenis_kelamin, status_kelompok, soal1, soal2, soal3 } = results[i];

                    console.log(`Filling form ${i + 1} out of ${results.length}`);
                    await driver.get('https://docs.google.com/forms/d/e/1FAIpQLSf11qnBsQNgUr0cz4pyxJCMpOgG0MwXzwLQZ7zQWoNhErzRAg/formResponse');
                    await sleep(2000);  // Adjust sleep time as needed

                    // Fill the form
                    let inputName = await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[1]/div/div/div[2]/div/div[1]/div/div[1]/input'));
                    await inputName.sendKeys(name);
                    await sleep(500);

                    // Isi Usia
                    if (usia === '<20') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[1]/label')).click();
                    } else if (usia === '21-30') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[2]/label')).click();
                    } else if (usia === '31-40') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[3]/label')).click();
                    } else if (usia === '>40') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[4]/label')).click();
                    }
                    await sleep(500);

                    // Isi Jenis Kelamin
                    if (jenis_kelamin === 'Perempuan') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div/span/div/div[1]/label')).click();
                    } else if (jenis_kelamin === 'Laki-laki') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div/span/div/div[2]/label')).click();
                    }
                    await sleep(500);

                    // Isi Status Kelompok
                    if (status_kelompok === 'Pelajar SMP') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[1]/label')).click();
                    } else if (status_kelompok === 'Pelajar SMA') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[2]/label')).click();
                    } else if (status_kelompok === 'Mahasiswa') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[3]/label')).click();
                    } else if (status_kelompok === 'Guru') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[4]/label')).click();
                    } else if (status_kelompok === 'Masyarakat biasa') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[5]/label')).click();
                    }
                    await sleep(500);

                    // Klik Kirim
                    let nextPage = await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[3]/div[1]/div[1]/div/span/span'));
                    await nextPage.click();
                    await sleep(2000);  // Adjust sleep time as needed

                    // Isi Soal 1
                    if (soal1 === 'Sangat setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[1]/label')).click();
                    } else if (soal1 === 'Setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[2]/label')).click();
                    } else if (soal1 === 'Ragu-ragu') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[3]/label')).click();
                    } else if (soal1 === 'Tidak setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[4]/label')).click();
                    } else if (soal1 === 'Sangat tidak setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[2]/div/div/div[2]/div/div/span/div/div[5]/label')).click();
                    }
                    await sleep(500);

                    // Isi Soal 2
                    if (soal2 === 'Sangat setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div/span/div/div[1]/label')).click();
                    } else if (soal2 === 'Setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div/span/div/div[2]/label')).click();
                    } else if (soal2 === 'Ragu-ragu') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div/span/div/div[3]/label')).click();
                    } else if (soal2 === 'Tidak setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div/span/div/div[4]/label')).click();
                    } else if (soal2 === 'Sangat tidak setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[3]/div/div/div[2]/div/div/span/div/div[5]/label')).click();
                    }
                    await sleep(500);

                    // Isi Soal 3
                    if (soal3 === 'Sangat setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[1]/label')).click();
                    } else if (soal3 === 'Setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[2]/label')).click();
                    } else if (soal3 === 'Ragu-ragu') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[3]/label')).click();
                    } else if (soal3 === 'Tidak setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[4]/label')).click();
                    } else if (soal3 === 'Sangat tidak setuju') {
                        await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[2]/div[4]/div/div/div[2]/div/div/span/div/div[5]/label')).click();
                    }
                    await sleep(500);

                    // Klik Kirim
                    let submitButton = await driver.findElement(By.xpath('//*[@id="mG61Hd"]/div[2]/div/div[3]/div[1]/div[1]/div[2]/span'));
                    await submitButton.click();
                    await sleep(2000);  // Adjust sleep time as needed
                }
            } catch (e) {
                console.log(`An error occurred: ${e}`);
            } finally {
                await driver.quit();
            }
        });
}

fillForm();
