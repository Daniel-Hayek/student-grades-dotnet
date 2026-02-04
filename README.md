# Student Grades MVC Project

### Description

This is a .NET MVC project, created in .NET 10.

The frontend and backend are both part of the repository, and the database is built on SQL Server Express.

Upon building the project using `dotnet build`, provided the database connection is correctly established, the build will create a database called **StudentGradesDB** and populate it with 50 students and 5 grades for each at random.

Using `dotnet run` will show the page.

This project is also used to practice DevExtreme JQuery.

The main page is split into two parts:
- Basic data entry practice for DevExtreme
- A button that fetches and shows information on students and courses

### Prerequisites

- .NET 10 SDK
- SQL Server Express (Running instance needs to be called SQLEXPRESS, or alternatively changed in the project appsettings.json file to match running instance)
- (Optional) Visual Studio 2022 or VS Code

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Daniel-Hayek/student-grades-dotnet

2. Navigate to the project folder:
    ```bash
    cd student-grades-dotnet

3. Restore dependencies and build:
    ```bash
    dotnet restore
    dotnet build

4. Run the project:
    ```bash
    dotnet run

5. Open the browser with the given link in the terminal


### Project Structure ###

Controllers/ → MVC controllers

Models/ → Entity classes

DTOs/ → Data transfer objects

Views/ → Razor views

Services/ → Business logic


### ERD ###

```text
+-----------------+           +----------------------+
|    students     |           |        grades        |
+-----------------+           +----------------------+
| Id (PK)         |<---------<| Student_Id (PK, FK)  |
| Name            |           | Course_Id (PK)       |
+-----------------+           | Course_Name          |
                              | GradeValue           |
                              +----------------------+
