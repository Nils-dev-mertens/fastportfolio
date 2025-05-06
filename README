# FastPortfolio

FastPortfolio is a personal portfolio project developed by Nils Mertens. It serves as a showcase of his skills, experience, and projects, while also providing a platform for visitors to interact with features like a web terminal and a contact form.

## Features

- **Portfolio Overview**: Displays information about Nils Mertens, including his skills, work experience, education, and personal interests.
- **Web Terminal**: A simulated terminal interface where users can execute predefined commands like `echo`, `help`, `time`, `add`, and `upper`.
- **Contact Form**: Allows visitors to send messages directly to Nils via email. Includes spam protection and rate limiting.
- **Theme Selector**: Users can switch between different themes (default, white, and colorful) for a personalized viewing experience.

## Technologies Used

- **Frontend**: EJS templates, CSS (with themes and responsive design).
- **Backend**: Node.js with Express.js.
- **Email Handling**: Nodemailer for sending emails, with Mustache and Marked for email templating.
- **Task Scheduling**: Node-Schedule for periodic email queue processing and spam limit resets.
- **Testing**: Jest for unit testing.
- **Environment Management**: dotenv for managing environment variables.

## Developer

Nils Mertens is a motivated programmer with experience in full-stack web development. He is passionate about coding, backend development, and embedded systems. In his free time, he works on personal projects, maintains a home server, and contributes to open-source initiatives. Nils is also an avid gamer and tech enthusiast.

## How to Run

1. Clone the repository from [GitHub](https://github.com/Nils-dev-mertens/fastportfolio).
2. Create a `.env` file in the `portfolio` directory with the following variables:
   ```env
   PORT=wantedport
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   ```
   the EMAIL_PASS is a code you get from google for accesing the GMAIL account. 
3. Start the application(this also download the packages):
   ```bash
   npm run install-start-project
   ```
4. Open your browser and navigate to `http://localhost:yourport`.

## Docker Support

This project includes a `Dockerfile` for containerized deployment. To build and run the Docker container:

1. Build the Docker image:
   ```bash
   docker build -t fastportfolio .
   ```
2. Run the container:
   ```bash
   docker run -p 3000:3000 fastportfolio
   ```

## License

This project is licensed under the ISC License.