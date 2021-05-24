# Appointment Scheduler
Appointment scheduler is an application for scheduling appointments for future dates. Users were able to select a time slot and can mark the appointment in different colours to distinguish each appointment. Users were restricted to select a slot for the same date and time by showing a warning message. Users can edit and delete the existing appointments.

Application scheduler application is powered by serverless framework for deployment and Frontend developed in Next JS Framework with Typescript, Redux, Jest, integrated with Express JS as the server with Mongoose as middleware and MongoDB for storage.

The application can be accessed through the below URLs

Serverless Deployment: 
https://dhv0nri4as4wa.cloudfront.net/

Vercel (Next JS) auto-deployment using git hook:  
https://schedule-appointment-fnuaty9km-gokultrivandrum.vercel.app/

Application code base maintained in GitHub repository 

Appointment Scheduler Repo: https://github.com/gokultrivandrum/schedule_appointment

Server Repo: https://github.com/gokultrivandrum/schedule_appointment_server

## Prerequisite for running the application
NPM

Node

MongoDB Credentials

Serverless credential (Deployment)

AWS console credential (Deployment)

## For Running a Frontend application follow the below steps

git clone https://github.com/gokultrivandrum/schedule_appointment_server.git

cd schedule_appointment_server

npm install

In the ‘next.config.js’ file configure API_URL

npm run dev // to host the application in the http://localhost:3000/

npm run test // for running test case

npm run build // to take build

setx AWS_ACCESS_KEY_ID XXXXXX

setx AWS_SECRET_ACCESS_KEY XXXXX

serverless // for deployment
 
# Future Road Map

User persona to manage the appointments.

Server migration to Next.js API folder

Test case coverage for all the components, now integrated only