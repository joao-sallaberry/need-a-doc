need-a-doc
==========

Medical system for making and managing appointments. Appointments are 30-minute long.

Pages
-----

`/appointment` - make an appointment
`/admin` - see timetable and set available time slots

Run locally
-----------

### Dependencies

[nodeJS](https://nodejs.org/) 8.6 or superior

[yarn](https://yarnpkg.com/) 1.2.1 or superior

[mongoDB](https://www.mongodb.com/)

### Setup

Create a database named `need-a-doc`

Go to project directory and run:

```bash
yarn
```

### Run

```bash
yarn run app
```

TODOs
-----

- Check if start time is before end time on admin/config
- Forbid 2 appointments at the same time when making an appointment
- Confirmation modal when leaving admin/config view with unsaved changes
- Confirmation modal for sensitive actions
- Backend validation before writing to DB
- Frontend time check in admin/config
- Access control on database