using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuanLyCayXanh.Extensions;
using Persistence;
using Quartz.Spi;
using Quartz.Impl;
using Quartz;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// Connect Database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(connectionString));



// Add services to the container.
//
builder.Services.AddRazorPages();

builder.Services.AddControllers();

builder.Services.AddMvc();

builder.Services.AddControllersWithViews();

//Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddIdentityCore<AppUser>(opt =>
{
    opt.Password.RequireNonAlphanumeric = false;
});

builder.Services.AddIdentity<AppUser, AppRole>(config =>
{

})
    .AddEntityFrameworkStores<DataContext>()
    .AddDefaultTokenProviders();
builder.Services.AddHttpContextAccessor();
builder.Services.ConfigureApplicationCookie(config =>
{
    config.Cookie.Name = "Qlcxbt.Cookie";
    config.LoginPath = "/Identity/Account/Login";
    config.LogoutPath = "/Logout";
    config.AccessDeniedPath = "/AccessDenied";
    config.ExpireTimeSpan = TimeSpan.FromHours(1);
    config.SlidingExpiration = true;
});
builder.Services.AddMediatR(typeof(Add.Handler).Assembly);
#region JWT
builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = builder.Configuration["Tokens:Issuer"],
            ValidAudience = builder.Configuration["Tokens:Audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Tokens:Key"])),
        };
    });
#endregion




var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseCors("CorsPolicy");

app.UseHttpsRedirection();
app.UseStaticFiles();
//app.UseDefaultFiles();

app.UseRouting();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseDeveloperExceptionPage();
/*app.MapAreaControllerRoute(
    name: "AdminTool",
    areaName: "AdminTool",
    pattern: "cms/{controller=Home}/{action=Index}"
);*/
/*app.MapAreaControllerRoute(
    name: "default",
    areaName: "Identity",
    pattern: "{area:exists}/{controller=Account}/{action=Login}/{id?}");*/
// ROUTES
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");

});
app.MapRazorPages();
app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    var mediator = app.Services.GetRequiredService<IMediator>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager, roleManager, mediator);
}
catch (System.Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "chi la ri");
    //throw;
}

app.Run();
