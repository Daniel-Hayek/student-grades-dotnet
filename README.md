### Description ###

This is a .NET MVC project, created in .NET10.

The frontend and backend are both part of the repository, and the database is built on SQL Server Express.

Upon building the project using dotnet build, provided the database connection is correctly established, the build will create a database called StudentGradesDB and populate it with 50 students and 5 grades for each at random.

Using dotnet run will show the page, with a button that will display course and student data.

### ERD ###

+-----------------+           +----------------------+
|    students     |           |        grades        |
+-----------------+           +----------------------+
| Id (PK)         |<---------<| Student_Id (PK, FK)  |
| Name            |           | Course_Id (PK)       |
+-----------------+           | Course_Name          |
                              | GradeValue           |
                              +----------------------+