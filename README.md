# front end of iSkills App

to run frontend and backend concurrently, we will use concurrently library
in package.json we have added scripts

```
"server": "cd server && npm run dev",
"dev": "concurrently -n \"client,server\" -c \"bgBlue,bgYellow\" \"npm start\" \"npm run server\""
```

- we setup initail things like assets data, tailwind
- we setup routing using react router dom

- browserRouter at root (index.js)
- routes at app.js

- created components and pages folder
- created Home.js in pages folder

created complete homepage
created complete signup and login page

- completed navbar(done redux state management fetch categories)
- in signup form connected to backend and otp to user is working
- completed complete authentication flow (created multiple pages like forgot password, verify email etc)

- day 6

- complete about us page

important is form (using useFormHook)
