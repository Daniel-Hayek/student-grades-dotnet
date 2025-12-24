using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudentGradesDotnet.Data;
using StudentGradesDotnet.Services;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<StudentGradesContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("StudentGradesContext") ?? throw new InvalidOperationException("Connection string 'StudentGradesContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();

// Registering the service to program to be injectable into controller
builder.Services.AddScoped<IStudentService, StudentService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<StudentGradesContext>();
    DbSeeder.Seed(context);

}


app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();


app.Run();
