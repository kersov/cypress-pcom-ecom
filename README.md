# Cypress PCOM E-Commerce

## Overview

Basic Cypress example for testing an e-commerce store using the Page Component Object Model (PCOM) pattern.

This repository is based on [kersov/cypress-pcom-boilerplate](https://github.com/kersov/cypress-pcom-boilerplate) – a modular Cypress boilerplate using a Component-Based Page Object Model (PCOM) structure.

## Getting Started
This section guides you through setting up the project on your local machine.

## How to Install

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/kersov/cypress-pcom-ecom.git
    cd cypress-pcom-ecom
    ```

2.  **Install dependencies:**
    Make sure you have Node.js and npm installed. Then, run the following command in the project root to install the necessary dependencies:
    ```bash
    npm install
    ```

## How to Run

You can run the Cypress tests using one of the following commands:

- Run tests in headless mode:
  ```bash
  npx cypress run
  ```
- Open the Cypress Test Runner UI:
  ```bash
  npx cypress open
  ```
- Or use the npm script:
  ```bash
  npm run test:e2e
  ```

## Updating from Boilerplate

To pull updates from the original boilerplate repository, use the following steps:

```bash
git checkout boilerplate
git merge boilerplate/main    # brings in new boilerplate commits
git checkout main
git merge boilerplate
```

This will update your local `boilerplate` branch with the latest changes from the boilerplate repository and then merge them into your `main` branch.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or enhancements.

## License
This project is licensed under the terms of the LICENSE file included in this repository.
