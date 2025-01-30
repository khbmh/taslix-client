# Taslix - Full-Stack Marketplace Web Application

## Live Link:
[Taslix Live Site](https://taslix.web.app)

## Features

### 1. **Website Design**
   - A visually appealing website with a unique design.
   - Color contrast is pleasing to the eye.
   - Proper alignment and spacing for better user experience.
   - Customizations made to components from libraries like Daisy UI to ensure a unique look.

### 2. **Navigation and Footer**
   - Persistent navbar on all pages (except 404 page).
   - Footer includes website logo, copyright, contact information, social media links, and address.

### 3. **Navbar Components:**
   - Logo and Website Name.
   - Navigation Links: Home, Add Job, My Posted Jobs, My Bids, Bid Requests, User Profile.
   - Login/Registration Buttons.

### 4. **Authentication System**
   - **Login Page**:
     - Email/Password login.
     - Google Sign-in option.
     - Link to redirect to Registration page.
   - **Registration Page**:
     - Fields: Name, Email, Password, PhotoURL.
     - Email verification is not required.

### 5. **Home Page**
   - **Banner Section**: Carousel of relevant images.
   - **Browse by Category**: Tabs for categories like Web Development, Digital Marketing, and Graphics Design, with at least four cards per category.
   - **Job Cards**: Each card displays Job title, Deadline, Price range, Short description, and a "Bid now" button.
   - **Tabs** implemented using `React-tabs` NPM package.

### 6. **Job Details Page**
   - After clicking a job card, user is redirected to the job details page.
   - Displays information about the job (Name, Deadline, Price Range, Description).
   - **Place a Bid** form section with fields: Price, Deadline, Email (user context), Buyer Email (job poster), and a Bid button.
   - User cannot bid on their own job.
   - Data is saved in MongoDB and user is redirected to My Bids page with a toast notification.

### 7. **Add Job Page**
   - Form to add new jobs with the following fields:
     - Email (read-only).
     - Job Title, Deadline, Description, Category (dropdown), Minimum and Maximum Price.
     - When the 'Add Job' button is clicked, data is stored in MongoDB.

### 8. **My Posted Jobs Page**
   - Users can view their own posted jobs in a tabular format with options to update and delete.
   - **Update**: Update job details, except for email.
   - **Delete**: Confirmation required before deleting a job.
   - Users can only see and edit jobs they've posted, not others'.

### 9. **My Bids Page**
   - Displays all bids the user has made in a tabular format.
   - Columns: Job Title, Email, Deadline, Status, and Complete button (if status is "In Progress").
   - Status can be "Rending", "Rejected", or "In Progress".
   - The "Complete" button is enabled when the status is "In Progress".

### 10. **Bid Requests Page**
   - Job owners can view all bids for their posted jobs in a tabular format.
   - Columns: Job Title, Email (bidder), Deadline, Price, Category, Status.
   - Actions: Accept/Reject buttons.
   - Once accepted, status changes to "In Progress" and the Accept button is disabled.
   - If rejected, status changes to "Rejected" and the Reject button is disabled.

### 11. **404 Page**
   - A fun 404 page with a gif or image.
   - Includes a "Back to Home" button that redirects to the home page.

### 12. **Environment Variables**
   - Firebase and MongoDB credentials are hidden using environment variables for security.

### 13. **Private Routes**
   - Pages that require user authentication:
     - My Bids Page.
     - Add Job Page.
     - My Posted Jobs Page.
     - Bid Requests Page.
     - Job Details Page.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, React-tabs, Daisy UI.
- **Backend**: Node.js, Express.
- **Database**: MongoDB.
- **Authentication**: Firebase Authentication.

