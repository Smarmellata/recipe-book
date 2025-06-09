# Recipe Book

This is a simple Angular application called "Recipe Book" built with Angular 18. The application allows users to manage and view recipes.

## Project Structure

The project consists of the following main files and directories:

- `src/app/app.component.ts`: Defines the main component of the application.
- `src/app/app.component.spec.ts`: Contains unit tests for the AppComponent using Jasmine and Karma.
- `src/app/app.module.ts`: The root module of the application that imports necessary Angular modules and declares the AppComponent.
- `src/main.ts`: The entry point of the application that bootstraps the AppModule.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd recipe-book
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/` in your browser to see the application in action.

## Running Tests

To run the unit tests for the application, use the following command:

```bash
ng test --code-coverage
```

This will launch Karma and execute the tests defined in the `app.component.spec.ts` file.

## Usage Guidelines

- The application is designed to be user-friendly and allows for easy management of recipes.
- You can extend the functionality by adding more components and services as needed.

## License

This project is licensed under the MIT License.
