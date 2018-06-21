# College Access For All - Dashboard App

This dashboard app collects data entered by coaches and returns chart reports containing data visualization. It also contains an Admin's path with complete authorization to create/edit/update/destroy data in the database. The database is created into a RESTful API and is proxy'ed with the front-end page.

Client work was done for the NYC Department of Education

![browser-screenshot](/client/public/landing-page.png)
---
![browser-screenshot](/client/public/dashboard-results.png)
---
![browser-screenshot](/client/public/dashboard-results-2.png)
---
![browser-screenshot](/client/public/React-admin.png)
---
## Features
-Bcrypt v3.1.7

-React-Admin v2.0.0

-Data Visualization

## Technologies Used:

**Front-end**
* react v16.3.2
* Moment v2.22.1
* d3 v4.13
* react-admin v2.0.0
* react-stepzilla v4.7.2

**Back-end**
* Rails v5.1.5
* bcrypt v3.1.7
* foreman v2.0.0

#### Database Schema

![browser-screenshot](/client/public/database_flowchart.png)

## Implementation in Progress
-The admin is missing a logout link
-There is no visual response when someone enters in an incorrect password.
-Even the the admin can have oversite of the database, the authorization of the admin needs to be worked on. For example, the admin cannot create or delete information yet because the authorization code has bugs.
-Design: I went crazy with the layout for the admin, and it does not flow with the coach layout. Still working on finding a good design feel.
-converting everything to a downloadable csv file is still in progress, not available yet.
