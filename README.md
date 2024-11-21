# [WhisperSpace](https://fine-corina-headlessnode-da1eaa6f.koyeb.app/)

WhisperSpace is a web application that lets users anonymously share their thoughts. It includes a membership feature, where members can view the author and timestamp of each post. The app is designed with simplicity in mind, offering an intuitive and easy-to-navigate experience.

## Features

- **User Authentication**: Users can sign up, log in, and securely store their passwords with bcrypt.
- **Membership Access**: Users must solve a riddle to join the club and gain membership status.
- **Create Posts**: Authenticated members can create posts with a title and body text.
- **Post Visibility**: Posts are visible to everyone, but only members can see the author's name and the date posted.
- **User Post Management**: Users can edit and delete their own posts.
- **Post Display**: The homepage displays all posts, with author names and timestamps hidden from non-members.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Passport.js, bcrypt.js
- **Frontend**: Ejs, Tailwind CSS

## How to Use

- **Register**: Create a new user account by filling in the registration form.
- **Login**: Use the login form to authenticate and gain access to the app.
- **Create Posts**: Once logged in, you can create new posts. Title and the content will be visible to everyone, but only members will see the author's name and date.
- **Post Management**: You can edit and delete your own posts.
- **Join the Club**: Solve the riddle to gain membership status.

## Contributing

If you find bugs feel free to create an issue.

## TODOS

- Implement pagination on the homepage to limit the number of posts displayed at once and improve load times.
- Implement the ability to filter posts by date.
- Add user profile page where members can view and update their account information.
- Add unit tests for critical routes and logic (e.g., user sign-up, login, post creation).
