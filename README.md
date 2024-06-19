# Auto-Google-Form

Automate the process of filling out Google Forms using Selenium and JavaScript. This project reads data from a CSV file and fills out a Google Form based on the data.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Code Explanation](#code-explanation)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/auto-google-form.git
    cd auto-google-form
    ```

2. **Install Node.js and npm:**
    Make sure you have Node.js and npm installed. You can download Node.js from [nodejs.org](https://nodejs.org/).

3. **Install project dependencies:**
    ```sh
    npm install
    ```

4. **Download and install ChromeDriver:**
    - Download the ChromeDriver from [here](https://sites.google.com/a/chromium.org/chromedriver/downloads).
    - Make sure ChromeDriver is in your PATH or place it in the same directory as your project.

## Usage

1. **Prepare your CSV file:**
    - Create a CSV file named `data.csv` with the following columns: `name`, `usia`, `jenis_kelamin`, `status_kelompok`, `soal1`, `soal2`, `soal3`.
    - Place the CSV file in the specified path: `d:/Belajar/PROJECT/Auto-Google-Form-main/Auto-Google-Form-main/`.

2. **Run the script:**
    ```sh
    node index.js
    ```

## Project Structure

```
auto-google-form/
│
├── data.csv                 # Your CSV data file
├── index.js                 # Main script to run the automation
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

## Code Explanation

The script `index.js` reads data from a CSV file and uses Selenium WebDriver to automate filling out a Google Form.

### Key Parts of the Code:

1. **Dependencies:**
    ```javascript
    const { Builder, By } = require('selenium-webdriver');
    const chrome = require('selenium-webdriver/chrome');
    const fs = require('fs');
    const csv = require('csv-parser');
    const path = require('path');
    ```

2. **Reading CSV Data:**
    ```javascript
    fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            // Automation logic
        });
    ```

3. **Automating Form Filling:**
    ```javascript
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments('--start-maximized'))
        .build();

    for (let i = 0; i < results.length; i++) {
        let { name, usia, jenis_kelamin, status_kelompok, soal1, soal2, soal3 } = results[i];
        await driver.get('https://docs.google.com/forms/d/e/1FAIpQLSf11qnBsQNgUr0cz4pyxJCMpOgG0MwXzwLQZ7zQWoNhErzRAg/formResponse');
        
        // Fill the form fields
        await driver.findElement(By.xpath('...')).sendKeys(name);
        // Repeat for other fields
    }
    ```

4. **Handling Errors and Cleanup:**
    ```javascript
    try {
        // Automation logic
    } catch (e) {
        console.log(`An error occurred: ${e}`);
    } finally {
        await driver.quit();
    }
    ```

## Dependencies

- [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver)
- [csv-parser](https://www.npmjs.com/package/csv-parser)

Install these dependencies using:
```sh
npm install selenium-webdriver csv-parser
```

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to modify the paths and details according to your specific project setup.
